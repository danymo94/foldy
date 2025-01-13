import { Router } from 'express';
import { registerUser, loginUser } from '../../controllers/auth.controller';
import authenticate from '../../middleware/authenticate';

const router = Router();

// Route for affiliate registration
router.post('/register', authenticate, registerUser);

// Route for affiliate login
router.post('/login', loginUser);

export default router;