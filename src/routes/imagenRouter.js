import express from 'express';
import upload from "../middlewares/upload.js";
import { verificarToken } from '../middlewares/authMiddleware.js';
import { validar, imagenSchema } from '../middlewares/validationMiddleware.js';
import * as imagenController from '../controllers/imagenController.js'

const router = express.Router();

router.post('/subir', verificarToken, upload.single('imagen'), validar(imagenSchema), imagenController.subirImg);

export default router;