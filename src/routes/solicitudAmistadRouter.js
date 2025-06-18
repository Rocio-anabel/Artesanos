import express from 'express';
import {
  enviarSolicitud,
  aceptarSolicitud,
  rechazarSolicitud
} from '../controllers/solicitudAmistadController.js';
import { solicitudAmistadSchema, responderSolicitudSchema, validar } from '../middlewares/validationMiddleware.js';

import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST - Enviar una solicitud de amistad
router.post('/', verificarToken,validar(solicitudAmistadSchema),  enviarSolicitud);

// PUT - Aceptar una solicitud de amistad
router.put('/aceptar', verificarToken, validar(responderSolicitudSchema), aceptarSolicitud);

// PUT - Rechazar una solicitud de amistad
router.put('/rechazar', verificarToken, validar(responderSolicitudSchema), rechazarSolicitud);

// GET - Listar solicitudes pendientes recibidas
//router.get('/pendientes', verificarToken, listarSolicitudesPendientes);

export default router;