import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cartController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getCart);
router.post('/add', authenticateToken, addToCart);
router.post('/remove', authenticateToken, removeFromCart);
router.post('/clear', authenticateToken, clearCart);

export default router;
