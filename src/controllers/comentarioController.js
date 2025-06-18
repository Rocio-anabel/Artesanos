import Comentario from "../models/comentario.js";

export const comentarImagen = async (req, res) =>{
    const {ID_Imagen, contenido} = req.body;
    const ID_Usuario = req.usuario.id;
    const fecha_creacion = (new Date 
                            ((new Date
                            ((new Date
                            (new Date())).toISOString() )).getTime() - 
                            ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
    try {
        const ID_nuevoComentario = await Comentario.crearComentario({ID_Imagen, ID_Usuario, contenido, fecha_creacion});
        res.redirect('/album/feed');
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).send('Error al crear comentario');
    }
};

export const recuperarComentarios = async (req, res) => {
    const { ID_imagen } = req.params;
    try {
        const comentarios = await Comentario.listarComentarios(ID_imagen);
        res.status(200).json({ comentarios });
    } catch (error) {
        console.error('Error al recuperar comentarios: ', error);
        res.status(500).json({ message: 'Error interno' });
    }
};