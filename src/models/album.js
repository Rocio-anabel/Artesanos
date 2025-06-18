import db from './db.js';

class Album{

    static async create({ID_Usuario, titulo, fechaCreacion}){
        const sql = "INSERT INTO album (ID_Usuario, titulo, fecha_creación) " +
                     "VALUES ($1, $2, $3) RETURNING ID_album";
        try {
            const result = await db.query(sql, [ID_Usuario, titulo, fechaCreacion]);
                return result.rows[0].ID_album;
        } catch (error) {
            console.error('Error al crear album:', error);
            throw error;
        }
    }
    static async getAlbumesVisibles(ID_Usuario) {
    try {
        const sql = 'SELECT a.*, u.nombre AS nombre_usuario, u.ID_Usuario FROM album a JOIN usuario u ON a.ID_Usuario = u.ID_Usuario ' +
                    'WHERE a.ID_Usuario = $1 OR a.ID_album IN ( ' + 
                    'SELECT v.ID_album FROM visibilidad v WHERE v.ID_Amigo = $2)'; 
        const result = await db.query(sql, [ID_Usuario, ID_Usuario]); 
            return result.rows;
    } catch (error) {
        console.error('Error al obtener albumes visibles: ', error);
        throw error;
    }
}
static async getAlbumesPorUsuario(ID_Usuario) {
    try {
        const sql = 'SELECT ID_album, titulo FROM album WHERE ID_Usuario = $1'; 
        const result = await db.query(sql, [ID_Usuario]); 
            return result.rows; 
    } catch (error) {
        console.error('Error al obtener los albumes: ', error);
        throw error;
    }
}

}

export default Album;