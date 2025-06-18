import express from 'express';
/*import {
  obtenerNotificaciones,
  marcarComoLeida
} from '../controllers/notificacionController.js';*/
import { verificarToken } from '../middlewares/authMiddleware.js';
import { traerNotificaciones } from '../controllers/notificacionController.js';
const router = express.Router();
/*
router.get('/', verificarToken, obtenerNotificaciones);
router.put('/:id', verificarToken, marcarComoLeida);
*/
router.get('/', verificarToken, traerNotificaciones);
export default router;