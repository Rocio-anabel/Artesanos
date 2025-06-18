import Imagen from "../models/imagen.js";
import sharp from "sharp";
import path from "path";
import fs from 'fs'

export const subirImg = async (req, res) => {
    try {
        const {caption, ID_album} = req.body;
        const cantidad = await Imagen.countByAlbum(ID_album);

        if (cantidad >= 20) {
            return res.status(400).json({ message: 'El álbum ya tiene 20 imágenes, no se pueden agregar más.' });
        }
        const fechaSubida = (new Date 
                            ((new Date
                            ((new Date
                            (new Date())).toISOString() )).getTime() - 
                            ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');

        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No se envió ninguna imagen' });
        }

        const filename = `${file.originalname}-${Date.now()}.webp`;
        const carpetaSalida = path.join(process.cwd(), 'public', 'uploads');

        if (!fs.existsSync(carpetaSalida)) {
            fs.mkdirSync(carpetaSalida, { recursive: true });
        }

        const rutaSalida = path.join(carpetaSalida, filename); 

        await sharp(file.buffer)
        .resize(300, 300)
        .toFormat('webp')
        .toFile(rutaSalida);
        
        await Imagen.create({
                            URL_img: `/uploads/${filename}`,
                            caption: caption === '' ? null : caption,
                            fechaSubida: fechaSubida,
                            ID_album: Number(ID_album)
        });
        res.status(200).json({ message: 'Imagen subida exitosamente', URL_img: `/uploads/${filename}` });
        
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ message: 'Error al subir la imagen' });
    }
}
