import express from 'express';
import { establecerVisibilidad } from '../controllers/visibilidadController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { visibilidadSchema, validar } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// POST para establecer visibilidad a amigos
router.post('/', verificarToken, validar(visibilidadSchema) ,establecerVisibilidad);

export default router;