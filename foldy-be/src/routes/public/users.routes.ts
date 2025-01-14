import { Router } from 'express';
import UsersController from '../../controllers/shared/users.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/me', authenticate, UsersController.getUser);
router.get('/:id', authenticate, UsersController.getUserById);
router.put('/me', authenticate, UsersController.updateUser);
router.delete('/me', authenticate, UsersController.deleteUser);

export default router;
