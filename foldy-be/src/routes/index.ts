import { Router } from 'express';
import adminAuthRoutes from './admin/adminAuth.routes';
import affiliateAuthRoutes from './affiliate/affiliateAuth.routes';
import userRoutes from './public/users.routes';
import masterAdminRoutes from './admin/masterAdmins.routes';

const router = Router();

router.use('/affiliates/auth', affiliateAuthRoutes);
router.use('/admin/auth', adminAuthRoutes);
router.use('/users', userRoutes);
router.use('/admin', masterAdminRoutes);

export default router; // Esporta il router
