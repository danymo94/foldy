import { Router } from 'express';
import MasterAdminController from '../../controllers/admin/masterAdmins.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/me', authenticate, MasterAdminController.getMe);
router.put('/me', authenticate, MasterAdminController.updateMe);

export default router;
