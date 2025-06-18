import { notificarSolicitudAmistad, notificarSolicitudEstado } from "./notificacionController.js";
import SolicitudAmistad from "../models/solicitudAmistad.js";

export const enviarSolicitud = async (req, res) => {
    try {
        const ID_Emisor = req.usuario.id; // desde el token
        const { ID_Receptor } = req.body;
        const fecha_envio = (new Date 
                            ((new Date
                            ((new Date
                            (new Date())).toISOString() )).getTime() - 
                            ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');

    // Aquí iría la lógica para guardar la solicitud en la base de datos
        await SolicitudAmistad.crear(ID_Emisor, ID_Receptor, fecha_envio);

    // Notificar al usuario destinatario (guardar y emitir)
        await notificarSolicitudAmistad(ID_Emisor, ID_Receptor, req.io);

    res.status(200).json({ message: 'Solicitud enviada y notificada' });
    } catch (error) {
        console.error('Error al enviar solicitud:', error);
        res.status(500).json({ message: 'Error interno' });
    }
}

export const aceptarSolicitud = async (req, res) => {
    try {
        const ID_Receptor = req.usuario.id;
        const {ID_Emisor} = req.body;
        const solicitudDeAmistad = await SolicitudAmistad.getSolicitud(ID_Emisor, ID_Receptor, 'pendiente');

        if (!solicitudDeAmistad) {
            return res.status(404).json({ message: 'Solicitud no encontrada o ya respondida' });
        }

        const {ID_SolicitudDeAmistad} = solicitudDeAmistad;
        console.log(ID_SolicitudDeAmistad);
        await SolicitudAmistad.updateEstado(ID_SolicitudDeAmistad, 'aceptada');

        await Amistades.crearAmistad({ ID_Usuario: ID_Receptor, ID_Amigo: ID_Emisor });

        await notificarSolicitudEstado(ID_Receptor, ID_Emisor, 'aceptada', req.io);

        res.status(200).json({ message: 'Solicitud aceptada y notificada correctamente' });


    } catch (error) {
        console.error('Error al aceptar solicitud:', error);
        res.status(500).json({ message: 'Error interno' });
    }
};

export const rechazarSolicitud = async (req, res) => {
    try {
        const ID_Receptor = req.usuario.id;
        const {ID_Emisor} = req.body;
        const solicitudDeAmistad = await SolicitudAmistad.getSolicitud(ID_Emisor, ID_Receptor, 'pendiente');

        if (!solicitudDeAmistad) {
            return res.status(404).json({ message: 'Solicitud no encontrada o ya respondida' });
        }

        const {ID_SolicitudDeAmistad} = solicitudDeAmistad;
        await SolicitudAmistad.updateEstado(ID_SolicitudDeAmistad, 'rechazada');

        await notificarSolicitudEstado(ID_Receptor, ID_Emisor, 'rechazada', req.io);

        res.status(200).json({ message: 'Solicitud rechazada y notificada correctamente' });


    } catch (error) {
        console.error('Error al rechazar solicitud:', error);
        res.status(500).json({ message: 'Error interno' });
    }
};