import { Router } from 'express';
import AuthController from '../../controllers/shared/auth.controller';

const router = Router();

// Route for admin registration
router.post('/register', AuthController.registerUser);

// Route for admin login
router.post('/login', AuthController.loginUser);

export default router;