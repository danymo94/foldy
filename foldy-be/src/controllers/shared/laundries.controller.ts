import { Request, Response } from 'express';
import { createLaundry, getLaundryById, updateLaundry, deleteLaundry, getAllLaundries } from '../../models/Laundry.model';

// Create a new laundry
export const createLaundryController = async (req: Request, res: Response) => {
  const { role, userId } = req.user;

  if (role !== 'MASTER_ADMIN' && role !== 'AFFILIATE') {
    return res.status(403).json({ error: 'Access denied' });
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
};

// Get a laundry by ID
export const getLaundryByIdController = async (req: Request, res: Response) => {
  const { role, userId } = req.user;

  try {
    const { id } = req.params;
    const laundry = await getLaundryById(id);

    if (!laundry) {
      return res.status(404).json({ error: 'Laundry not found' });
    }

    if (role === 'AFFILIATE' && laundry.affiliateId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if ((role === 'ANONYMOUS' || role === 'CUSTOMER') && !laundry.isActive) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (role === 'ANONYMOUS' || role === 'CUSTOMER') {
      const { payoutInfo, isActive, createdAt, updatedAt, certificateCode, ...filteredLaundry } = laundry;
      return res.status(200).json(filteredLaundry);
    }

    res.status(200).json(laundry);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all laundries
export const getAllLaundriesController = async (req: Request, res: Response) => {
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
      return res.status(200).json(filteredLaundries);
    }

    res.status(200).json(laundries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a laundry
export const updateLaundryController = async (req: Request, res: Response) => {
  const { role, userId } = req.user;

  if (role !== 'MASTER_ADMIN' && role !== 'AFFILIATE') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { id } = req.params;
    const laundry = await getLaundryById(id);

    if (!laundry) {
      return res.status(404).json({ error: 'Laundry not found' });
    }

    if (role === 'AFFILIATE' && laundry.affiliateId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await updateLaundry(id, req.body);
    res.status(200).json({ message: 'Laundry updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a laundry
export const deleteLaundryController = async (req: Request, res: Response) => {
  const { role, userId } = req.user;

  if (role !== 'MASTER_ADMIN' && role !== 'AFFILIATE') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { id } = req.params;
    const laundry = await getLaundryById(id);

    if (!laundry) {
      return res.status(404).json({ error: 'Laundry not found' });
    }

    if (role === 'AFFILIATE' && laundry.affiliateId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await deleteLaundry(id);
    res.status(200).json({ message: 'Laundry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
