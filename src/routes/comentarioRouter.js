import express from 'express';
import * as comentarioController from '../controllers/comentarioController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { comentarioSchema, validar } from '../middlewares/validationMiddleware.js';

const router = express.Router();


router.post('/', verificarToken, validar(comentarioSchema), comentarioController.comentarImagen);
router.get('/comentarios/:ID_imagen', comentarioController.recuperarComentarios);

export default router;