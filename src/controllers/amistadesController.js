import Amistades from "../models/amistades.js";

export const listarAmigos = async (req, res) => {
    const ID_Usuario = req.usuario.id;
    try {
       const amigos = await Amistades.getAmigos(ID_Usuario);
        res.status(200).json({
            message: 'Amigos recuperados correctamente',
            Amigos: amigos
        });
    } catch (error) {
        console.error('Error al listar amigos:', error);
        res.status(500).json({ message: 'Error al listar amigos' });
    }
}

export const establecerAmistad = async (req, res) => {
    try {
        const ID_Usuario = req.usuario.id;
        const {ID_amigo} = req.body;
        if (ID_Usuario === ID_amigo) {
            return res.status(400).json({ message: 'No puedes agregarte como amigo a ti mismo' });
        }
        await Amistades.crearAmistad({ID_Usuario, ID_amigo});

        res.status(201).json({message: 'Amistad establecidad correctamente'});
    } catch (error) {
        console.error('Error al establecer amistad: ', error);
        res.status(500).json({message: 'Error al establecer amistad'});
    }
}