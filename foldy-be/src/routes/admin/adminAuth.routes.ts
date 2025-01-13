import { Router } from 'express';
import { registerUser, loginUser } from '../../controllers/auth.controller';

const router = Router();

// Route for admin registration
router.post('/register', registerUser);

// Route for admin login
router.post('/login', loginUser);

export default router;