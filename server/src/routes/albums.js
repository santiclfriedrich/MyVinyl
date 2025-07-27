import express from 'express';
import { createAlbum, getAlbums } from '../controllers/albumController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createAlbum);
router.get('/', authenticateToken, getAlbums);

export default router;
