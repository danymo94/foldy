import { Request, Response } from 'express';
import { getUserById, updateUser, deleteUser } from '../../models/User.model';

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

class UsersController {
    public async getUser(req: AuthenticatedRequest, res: Response): Promise<void> {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'User ID not found in request' });
            return;
        }

        try {
            const user = await getUserById(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    public async getUserById(req: AuthenticatedRequest, res: Response): Promise<void> {
        const userId = req.user?.userId;
        const targetUserId = req.params.id;

        if (!userId) {
            res.status(400).json({ message: 'User ID not found in request' });
            return;
        }

        try {
            const user = await getUserById(targetUserId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            if (userId !== targetUserId && req.user?.role !== 'MASTER_ADMIN') {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    public async updateUser(req: AuthenticatedRequest, res: Response): Promise<void> {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'User ID not found in request' });
            return;
        }

        try {
            await updateUser(userId, req.body);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    public async deleteUser(req: AuthenticatedRequest, res: Response): Promise<void> {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'User ID not found in request' });
            return;
        }

        try {
            await deleteUser(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
}

export default new UsersController();