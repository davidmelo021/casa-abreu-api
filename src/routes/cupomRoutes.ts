import {Router} from 'express';
import {validarCupom} from '../controllers/cupomController';

const router = Router();

router.post('/validar', validarCupom);

export default router;