import db from './db.js';

class SolicitudAmistad {
    static async crear(ID_Emisor, ID_Receptor, fecha_envio){
        try {
            const sql = "INSERT INTO solicitud_de_amistad(ID_Emisor, ID_Receptor, fecha_envio) " +
                    "VALUES($1, $2, $3) RETURNING ID_SolicitudDeAmistad"; 
            const result = await db.query(sql, [ID_Emisor, ID_Receptor, fecha_envio]); 
                return result.rows[0].ID_SolicitudDeAmistad;
        } catch (error) {
            console.error('Error al crear solicitud de amistad:', error);
            throw error;
        }
    }

    static async updateEstado(ID_SolicitudDeAmistad, estado_solicitud){
        try {
            const sql = 'UPDATE solicitud_de_amistad SET estado_solicitud = $1 WHERE ID_SolicitudDeAmistad = $2'; 
            const result = await db.query(sql, [estado_solicitud, ID_SolicitudDeAmistad]); 
                return result.rowCount;
            
        } catch (error) {
            console.error('Error al actualizar estado de solicitud de amistad', error);
            throw error;
        }
    }
    static async getSolicitud(ID_Emisor, ID_Receptor, estado_solicitud){
        try {
            const sql = 'SELECT * FROM solicitud_de_amistad WHERE ID_Emisor = $1 AND ID_Receptor = $2 AND estado_solicitud = $3 '; 
            const result = await db.query(sql, [ID_Emisor, ID_Receptor, estado_solicitud]); 
                return result.rows[0];
        } catch (error) {
            console.error('Error al recuperar la solicitud de amistad', error);
            throw error;
        }
    }


}

export default SolicitudAmistad;