import { Router } from 'express';
import AffiliatesController from '../../controllers/admin/affiliates.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/affiliates', authenticate, AffiliatesController.createAffiliate);
router.put('/affiliates/:id', authenticate, AffiliatesController.updateAffiliate);
router.delete('/affiliates/:id', authenticate, AffiliatesController.deleteAffiliate);
router.get('/affiliates', authenticate, AffiliatesController.getAllAffiliates);

export default router;
