import { Request, Response } from 'express';
import { createLaundry, getLaundryById, updateLaundry, deleteLaundry, getAllLaundries } from '../../models/Laundry.model';

class LaundriesController {
    public async createLaundry(req: Request, res: Response): Promise<void> {
        const { role, userId } = req.user;

        if (role !== 'MASTER_ADMIN' && role !== 'AFFILIATE') {
            res.status(403).json({ error: 'Access denied' });
            return;
        }

        try {
            const laundry = req.body;
            if (role === 'AFFILIATE') {
                laundry.affiliateId = userId;
            }
            const id = await createLaundry(laundry);
            res.status(201).json({ id });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getLaundryById(req: Request, res: Response): Promise<void> {
        const { role, userId } = req.user;

        try {
            const { id } = req.params;
            const laundry = await getLaundryById(id);

            if (!laundry) {
                res.status(404).json({ error: 'Laundry not found' });
                return;
            }

            if (role === 'AFFILIATE' && laundry.affiliateId !== userId) {
                res.status(403).json({ error: 'Access denied' });
                return;
            }

            if ((role === 'ANONYMOUS' || role === 'CUSTOMER') && !laundry.isActive) {
                res.status(403).json({ error: 'Access denied' });
                return;
            }

            if (role === 'ANONYMOUS' || role === 'CUSTOMER') {
                const { payoutInfo, isActive, createdAt, updatedAt, certificateCode, ...filteredLaundry } = laundry;
                res.status(200).json(filteredLaundry);
                return;
            }

            res.status(200).json(laundry);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getAllLaundries(req: Request, res: Response): Promise<void> {
        const { role } = req.user;

        try {
            const laundries = await getAllLaundries();

            if (role === 'ANONYMOUS' || role === 'CUSTOMER') {
                const filteredLaundries = laundries
                    .filter(laundry => laundry.isActive)
                    .map(laundry => {
                        const { payoutInfo, isActive, createdAt, updatedAt, certificateCode, ...filteredLaundry } = laundry;
                        return filteredLaundry;
                    });
                res.status(200).json(filteredLaundries);
                return;
            }

            res.status(200).json(laundries);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async updateLaundry(req: Request, res: Response): Promise<void> {
        const { role, userId } = req.user;

        if (role !== 'MASTER_ADMIN' && role !== 'AFFILIATE') {
            res.status(403).json({ error: 'Access denied' });
            return;
        }

        try {
            const { id } = req.params;
            const laundry = await getLaundryById(id);

            if (!laundry) {
                res.status(404).json({ error: 'Laundry not found' });
                return;
            }

            if (role === 'AFFILIATE' && laundry.affiliateId !== userId) {
                res.status(403).json({ error: 'Access denied' });
                return;
            }

            await updateLaundry(id, req.body);
            res.status(200).json({ message: 'Laundry updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteLaundry(req: Request, res: Response): Promise<void> {
        const { role, userId } = req.user;

        if (role !== 'MASTER_ADMIN' && role !== 'AFFILIATE') {
            res.status(403).json({ error: 'Access denied' });
            return;
        }

        try {
            const { id } = req.params;
            const laundry = await getLaundryById(id);

            if (!laundry) {
                res.status(404).json({ error: 'Laundry not found' });
                return;
            }

            if (role === 'AFFILIATE' && laundry.affiliateId !== userId) {
                res.status(403).json({ error: 'Access denied' });
                return;
            }

            await deleteLaundry(id);
            res.status(200).json({ message: 'Laundry deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new LaundriesController();
