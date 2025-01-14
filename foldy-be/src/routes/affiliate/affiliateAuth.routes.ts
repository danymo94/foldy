import { Router } from 'express';
import { registerUser, loginUser } from '../../controllers/shared/auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

// Route for affiliate registration
router.post('/register', authenticate, registerUser);

// Route for affiliate login
router.post('/login', loginUser);

export default router;
