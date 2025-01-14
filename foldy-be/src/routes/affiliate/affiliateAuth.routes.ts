import { Router } from 'express';
import AuthController from '../../controllers/shared/auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

// Route for affiliate registration
router.post('/register', authenticate, AuthController.registerUser);

// Route for affiliate login
router.post('/login', AuthController.loginUser);

export default router;
