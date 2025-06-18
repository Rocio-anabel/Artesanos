import db from './db.js';

class Notificacion{
    static async crear({ID_Receptor, ID_Emisor, tipo, mensaje, fecha_enviada}){
        try {
            const sql = 'INSERT INTO notificacion (ID_Receptor, ID_Emisor, tipo_notificacion, mensaje, fecha_enviada) ' +
                        'VALUES ($1, $2, $3, $4, $5) RETURNING ID_Notificacion'; 
            const result = await db.query(sql, [ID_Receptor, ID_Emisor, tipo, mensaje, fecha_enviada]); 
                return result.rows[0].ID_Notificacion;
        } catch (error) {
            console.error('Error al crear notificacion:', error);
            throw error;
        }
    }

    static async leerNotificacion(ID_notificacion){
        try {
            const sql = 'UPDATE notificacion SET leido = 1 WHERE ID_Notificacion = $1'; 
            const result = await db.query(sql, [ID_notificacion]); 
                return result.rowCount;
        } catch (error) {
            console.error('Error al leer notificacion:', error);
            throw error;
        }
    }

    static async listarNotificaciones(ID_Receptor){
        try {
            const sql = 'SELECT * FROM notificacion WHERE ID_Receptor = $1';
            const result = await db.query(sql, [ID_Receptor]); 
                return result.rows;
        } catch (error) {
            console.error('Error al listar notificaciones:', error);
            throw error;
        }
    }
}

export default Notificacion;