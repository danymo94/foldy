// src/middleware/authenticate.ts
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    userId?: string;
    role?: string;
  };
}
import { verifyToken } from '../config/jwt';
import { auth } from '../config/firebase';

// Middleware to authenticate requests using JWT or Firebase Auth token
const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // No token provided, set role to 'anonymous'
    req.user = { role: 'ANONYMOUS' };
    return next();
  }

  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
      const decoded = verifyToken(token) as { id: string; role: string };
      req.user = { userId: decoded.id, role: decoded.role };
      console.log(decoded);
      return next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired JWT token' });
      return;
    }
  }

  if (authHeader.startsWith('Firebase ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await auth.verifyIdToken(token);
      req.user = { userId: decodedToken.uid, role: 'CUSTOMER' };
      return next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired Firebase token' });
      return;
    }
  }

  res.status(401).json({ error: 'Unauthorized' });
};

export { authenticate };
