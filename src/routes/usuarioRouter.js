import express from 'express';
import { usuarioSchema, validar } from '../middlewares/validationMiddleware.js';
import * as usuarioController from '../controllers/usuarioController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/registro', validar(usuarioSchema), usuarioController.registrarUsuario);
router.get('/buscar', usuarioController.buscarUsuarios);
router.get('/perfil/:id', verificarToken, usuarioController.perfilUsuario);

export default router;