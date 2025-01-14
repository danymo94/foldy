import { Request, Response } from 'express';
import {
  createAffiliate,
  getAffiliateById,
  updateAffiliateByUserId,
  deleteAffiliate,
  getAllAffiliates,
} from '../../models/Affiliate.model';
import { createUser } from '../../models/User.model';
import bcrypt from 'bcryptjs';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

class AffiliatesController {
  public async createAffiliate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'MASTER_ADMIN') {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }
      const { user, affiliate } = req.body;
      const timestamp = new Date().toISOString();
      const passwordHash = await bcrypt.hash(user.password, 10);
      delete user.password;
      user.password = passwordHash;
      user.createdAt = timestamp;
      user.updatedAt = timestamp;
      affiliate.createdAt = timestamp;
      affiliate.updatedAt = timestamp;
      const newUser = await createUser({ ...user, role: 'AFFILIATE' });
      const newAffiliate = await createAffiliate({ userId: newUser, ...affiliate });

      res.status(201).json({ message: 'Affiliate created successfully', affiliate: newAffiliate });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error });
    }
  }

  public async getAffiliateByUserId(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { userId } = req.user!;
      const affiliate = await getAffiliateById(userId);

      if (!affiliate) {
        res.status(404).json({ error: 'Affiliate not found' });
        return;
      }

      res.status(200).json(affiliate);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error });
    }
  }

  public async getAllAffiliates(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'MASTER_ADMIN') {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }

      const affiliates = await getAllAffiliates();
      res.status(200).json(affiliates);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error });
    }
  }

  public async updateAffiliate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.params.id!;
      const affiliateData = req.body;

      if (req.user?.role !== 'MASTER_ADMIN' && req.user?.userId !== userId) {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }

      affiliateData.updatedAt = new Date().toISOString();
      await updateAffiliateByUserId(userId, affiliateData);
      res.status(200).json({ message: 'Affiliate updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error });
    }
  }

  public async deleteAffiliate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'MASTER_ADMIN') {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }

      const { id } = req.params;
      await deleteAffiliate(id);
      res.status(200).json({ message: 'Affiliate deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error });
    }
  }
}

export default new AffiliatesController();
