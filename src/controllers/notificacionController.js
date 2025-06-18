import Usuario from "../models/usuario.js";
import Notificacion from "../models/notificacion.js";

export const notificarSolicitudAmistad = async (ID_Emisor, ID_Receptor, io) => {
    const fecha_enviada = (new Date 
                            ((new Date
                            ((new Date
                            (new Date())).toISOString() )).getTime() - 
                            ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
    const tipo = 'solicitud_amistad';
    try {
        const nombreEmisor = await Usuario.getNameByID(ID_Emisor);
        const mensaje = `${nombreEmisor} te ha enviado una solicitud de amistad`;


        await Notificacion.crear({
                                ID_Receptor,
                                ID_Emisor,
                                tipo,
                                mensaje,
                                fecha_enviada
                            });
        io.to(`usuario_${ID_Receptor}`).emit('nueva_notificacion', {
            tipo,
            mensaje,
            fecha_enviada,
            de: ID_Emisor
        });
    } catch (error) {
        console.error('Error al notificar', error);
        throw error;
    }
}

export const notificarSolicitudEstado = async (ID_Emisor, ID_Receptor, estado_solicitud, io) => {
    try {
        const fecha_enviada = (new Date 
                            ((new Date
                            ((new Date
                            (new Date())).toISOString() )).getTime() - 
                            ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
        const tipo = `solicitud_${estado_solicitud}`;
        const nombreEmisor = await Usuario.getNameByID(ID_Emisor);
        const mensaje = `${nombreEmisor} ha aceptado tu solicitud de amistad`;


        await Notificacion.crear({
                                ID_Receptor,
                                ID_Emisor,
                                tipo,
                                mensaje,
                                fecha_enviada
                            });
        io.to(`usuario_${ID_Receptor}`).emit('nueva_notificacion', {
            tipo,
            mensaje,
            fecha_enviada,
            de: ID_Emisor
        });
    } catch (error) {
        console.error('Error al notificar', error);
        throw error;
    }
}

export const traerNotificaciones = async (req, res) => {
    const ID_Receptor = req.usuario.id;
    try {
        const notificaciones = await Notificacion.listarNotificaciones(ID_Receptor);
        res.render('notificaciones', { notificaciones });
    } catch (error) {
        console.error('Error al listar notificaciones', error);
        res.status(500).send('Error interno');
    } 
};