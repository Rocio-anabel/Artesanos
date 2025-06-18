import db from './db.js';

class Imagen{
    static async create({URL_img, caption, fechaSubida, ID_album}){
        const sql = 'INSERT INTO imagen (URL_img, caption, fecha_subida, ID_album) ' +
                    'VALUES ($1, $2, $3, $4) RETURNING ID_Imagen';
        try {
            const result = await db.query(sql, [URL_img, caption, fechaSubida, ID_album]); 
               return result.rows[0].ID_Imagen;
        } catch (error) {
            console.error('Error al subir imagen:', error);
            throw error;
        }
    }
    static async countByAlbum(ID_album) {
    const sql = "SELECT COUNT(*) AS total FROM imagen WHERE ID_album = $1"; 
    try {
      const result = await db.query(sql, [ID_album]);
        return result.rows[0].total;
    } catch (error) {
      console.error('Error al contar imágenes del álbum:', error);
      throw error;
    }
  }
  static async getImagenesByAlbum(ID_album){
    
    const sql = 'SELECT * FROM imagen WHERE ID_album = $1';
    try {
      const result = await db.query(sql, [ID_album]);
        return result.rows;
    } catch (error) {
      console.error('Error al obtener imagenes por album: ', error);
      throw error;
    }
  }
}

export default Imagen;

