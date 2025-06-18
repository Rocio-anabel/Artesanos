import db from './db.js'

class Amistades{
    static async crearAmistad({ID_Usuario, ID_amigo}){
        try {
            const sql = 'INSERT INTO amistades (ID_Usuario, ID_Amigo) ' + 
                    'VALUES ($1, $2)'; 
            const result = await db.query(sql, [ID_Usuario, ID_amigo]); 
              return result.rowCount;
        } catch (error) {
            console.error('Error al establecer la amistad', error);
            throw error;
        }
    }

    static async getAmigos(ID_Usuario){
        try {
            const sql = 'SELECT u.* FROM amistades a JOIN usuario u ON (u.ID_Usuario = a.ID_Usuario AND a.ID_Amigo = $1) ' + 
                      'OR (u.ID_Usuario = a.ID_Amigo AND a.ID_Usuario = $2)'; 
            const result = await db.query(sql, [ID_Usuario, ID_Usuario]); 
                return result.rows; 
        } catch (error) {
            console.error('Error al obtener amigos: ', error);
            throw error;
        }
    }
    static async sonAmigos(id1, id2) {
        try {
          const sql = `
            SELECT 1 
            FROM amistades 
            WHERE (ID_Usuario = $1 AND ID_Amigo = $2) OR (ID_Usuario = $3 AND ID_Amigo = $4)`; 
          const result = await db.query(sql, [id1, id2, id2, id1]);
            return result.rows.length > 0;
        } catch (error) {
          console.error('Error al verificar amistad:', error);
          throw error;
        }
  }
}

export default Amistades;