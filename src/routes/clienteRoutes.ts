import { Router } from 'express';
import { getPerfil, updatePerfil, getFavoritos, addFavorito, removeFavorito,updateSenha } from '../controllers/clienteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/perfil', authMiddleware, getPerfil);
router.put('/perfil', authMiddleware, updatePerfil);
router.get('/favoritos', authMiddleware, getFavoritos);
router.post('/favoritos', authMiddleware, addFavorito);
router.delete('/favoritos/:id', authMiddleware, removeFavorito);
router.put('/senha', authMiddleware, updateSenha);

export default router;