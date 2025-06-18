import express from 'express';
import { listarAmigos, establecerAmistad } from '../controllers/amistadesController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { crearAmistadSchema, validar } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// GET amigos del usuario autenticado
router.get('/', verificarToken, listarAmigos);

// POST para crear amistad
router.post('/', verificarToken, validar(crearAmistadSchema), establecerAmistad);

export default router;