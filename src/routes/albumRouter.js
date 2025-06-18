import express from 'express';
import { albumSchema, validar } from "../middlewares/validationMiddleware.js";
import * as albumController from "../controllers/albumController.js";
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/crear', verificarToken, validar(albumSchema), albumController.crearAlbum);
router.get('/feed', verificarToken, albumController.obtenerFeedAlbumes);
router.get('/mis-albums', verificarToken, albumController.mostrarMisAlbumes);

export default router;
