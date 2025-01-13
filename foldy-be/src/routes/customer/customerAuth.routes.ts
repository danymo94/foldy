import { Router } from 'express';
import { registerUser, loginUser } from '../../controllers/auth.controller';

const router = Router();

// Route for customer registration
router.post('/register', registerUser);

// Route for customer login
router.post('/login', loginUser);

export default router;