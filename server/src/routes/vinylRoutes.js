import express from 'express';
import {
  getAllVinyls,
  getVinylById,
  createVinyl,
  updateVinyl,
  deleteVinyl,
  searchVinyls
} from '../controllers/vinylController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// Rutas públicas
router.get('/vinilos', getAllVinyls);
router.get('/vinilos/:id', getVinylById);
router.get('/search', searchVinyls)

// Rutas protegidas (solo admin)
router.post('/vinilos', authenticateToken, isAdmin, createVinyl);
router.put('/vinilos/:id', authenticateToken, isAdmin, updateVinyl);
router.delete('/vinilos/:id', authenticateToken, isAdmin, deleteVinyl);

export default router;
