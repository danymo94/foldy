import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../../models/User.model';
import { signToken } from '../../config/jwt';
import { auth } from '../../config/firebase';
import bcrypt from 'bcryptjs';
import { createMasterAdmin } from '../../models/MasterAdmin.model';

// Estendi il tipo Request per includere la proprietà user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

class AuthController {
  public async registerUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { email, password, role, fullName, phoneNumber, secretCode, GoogleOAuth, idToken } = req.body;

      // Validate role
      if (!['MASTER_ADMIN', 'AFFILIATE', 'CUSTOMER'].includes(role)) {
        res.status(400).json({ error: 'Invalid role.' });
        return;
      }

      // For admin creation, verify the secret code
      if (role === 'MASTER_ADMIN') {
        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
          res.status(400).json({ error: 'User already exists.' });
          return;
        }
        if (secretCode !== process.env.ADMIN_SECRET_CODE) {
          res.status(403).json({ error: 'Invalid secret code for admin creation.' });
          return;
        }

        // Hash the password for non-OAuth users
        const passwordHash = await bcrypt.hash(password, 10);

        // Create the user
        const userId = await createUser({
          email,
          passwordHash,
          role,
          fullName,
          phoneNumber,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        // Create MasterAdmin instance
        await createMasterAdmin({ userId });

        // Generate a JWT token
        const token = signToken({ id: userId, role });

        // Save the payload in the response
        res.status(201).json({ token, role });
        return;
      }

      // For affiliate creation, verify that the user is an admin
      if (role === 'AFFILIATE') {
        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
          res.status(400).json({ error: 'User already exists.' });
          return;
        }
        if (!req.user || req.user.role !== 'MASTER_ADMIN') {
          res.status(403).json({ error: 'Only admins can create affiliates.' });
          return;
        }
      }

      // For customer creation with Google OAuth
      if (role === 'CUSTOMER' && idToken) {
        const decodedToken = await auth.verifyIdToken(idToken);
        const firebaseUser = await auth.getUser(decodedToken.uid);

        const userId = await createUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          passwordHash: '', // No password hash for OAuth users
          role,
          fullName: firebaseUser.displayName || fullName,
          phoneNumber: firebaseUser.phoneNumber || phoneNumber,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        const token = signToken({ id: userId, role });
        res.status(201).json({ token, role });
        return;
      }

      // Hash the password for non-OAuth users
      const passwordHash = await bcrypt.hash(password, 10);

      // Create the user
      const userId = await createUser({
        email,
        passwordHash,
        role,
        fullName,
        phoneNumber,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Generate a JWT token
      const token = signToken({ id: userId, role });

      // Save the payload in the response
      res.status(201).json({ token, role });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await getUserByEmail(email);
      if (!user) {
        res.status(400).json({ error: 'Invalid email or password.' });
        return;
      }

      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        res.status(400).json({ error: 'Invalid email or password.' });
        return;
      }

      // Generate a JWT token
      console.log(user);
      const token = signToken({ id: user.id, role: user.role });

      // Save the payload in the response
      res.status(200).json({ token, role: user.role });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new AuthController();
