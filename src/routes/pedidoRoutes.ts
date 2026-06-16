import { Router } from 'express';
import { criarPedido, listarPedidos } from '../controllers/pedidoController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/', authMiddleware, criarPedido);
router.get('/', authMiddleware, listarPedidos);

export default router;