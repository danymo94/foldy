import { Request, Response } from 'express';
import {
  createMasterAdmin,
  getMasterAdminById,
  updateMasterAdmin,
  deleteMasterAdmin,
  getMasterAdminByUserId,
  updateMasterAdminByUserId
} from '../../models/MasterAdmin.model';
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

class MasterAdminController {
  public async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized.' });
        return;
      }
      console.log(req.user);
      console.log("aaaaa");
      const masterAdmin = await getMasterAdminByUserId(req.user.userId);
      if (!masterAdmin) {
        res.status(404).json({ error: 'MasterAdmin not found.' });
        return;
      }
      res.status(200).json(masterAdmin);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  public async updateMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized.' });
        return;
      }
      const masterAdminData = req.body;
      await updateMasterAdminByUserId(req.user.userId, masterAdminData);
      res.status(200).json({ message: 'MasterAdmin updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new MasterAdminController();
