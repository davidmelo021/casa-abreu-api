import { Router } from 'express';
import { getRelatorio } from '../controllers/relatorioController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.get('/', authMiddleware, getRelatorio);

export default router;