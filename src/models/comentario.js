import db from './db.js';

class Comentario{
    static async crearComentario({ID_Imagen, ID_Usuario, contenido, fecha_creacion}){
        try {
           const sql = 'INSERT INTO comentario (ID_Imagen, ID_Usuario, contenido, fecha_creacion) ' +
                       'VALUES ($1, $2, $3, $4) RETURNING ID_Comentario'; 
           const result = await db.query(sql, [ID_Imagen, ID_Usuario, contenido, fecha_creacion]); 

                return result.rows[0].ID_Comentario;

        } catch (error) {
            console.error(`Error al crear el comentario para imagen ${ID_imagen}`, error);
            throw error;
        }
        
    };
    static async listarComentarios(ID_imagen){
        try {
            const sql = 'SELECT c.*, u.nombre, u.URL_avatar FROM comentario c JOIN usuario u ON c.ID_Usuario = u.ID_Usuario WHERE c.ID_Imagen = $1 ORDER BY c.fecha_creacion ASC'; 
            const result = await db.query(sql, [ID_imagen]); 
                return result.rows;
        } catch (error) {
            console.error('Error al listar comentarios: ', error);
            throw error;
        }
    };
}

export default Comentario;