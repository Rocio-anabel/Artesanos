import Visibilidad from "../models/visibilidad.js";

export const establecerVisibilidad = async (req, res) => {
    try {
        const {ID_amigos, ID_album} = req.body;
        const inserted = await Visibilidad.setAmigos(ID_amigos, ID_album);
        res.status(200).json({ message: 'Visibilidad establecida', filas: inserted });
    } catch (error) {
        console.error('Error al establecer visibilidad:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
    



}
