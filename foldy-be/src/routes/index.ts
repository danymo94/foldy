import { Router } from 'express';
import adminAuthRoutes from './admin/adminAuth.routes';
import affiliateAuthRoutes from './affiliate/affiliateAuth.routes';

const router = Router();

router.use('/affiliates/auth', affiliateAuthRoutes);
router.use('/admin/auth', adminAuthRoutes);

export default router; // Esporta il router
