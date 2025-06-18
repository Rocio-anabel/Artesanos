import db from './db.js'

class Visibilidad{
    static async setAmigos([ID_amigos], ID_album){
        try {
            let placeholders;
            let values;
            let paramCounter = 1;

            if (Array.isArray(ID_amigos) && ID_amigos.length > 1) { 
                placeholders = ID_amigos.map(() => `($${paramCounter++}, $${paramCounter++})`).join(', ');
                values = ID_amigos.flatMap(id => [id, ID_album]);
            } else {
                
                const singleID_amigo = Array.isArray(ID_amigos) ? ID_amigos[0] : ID_amigos;
                placeholders = `($${paramCounter++}, $${paramCounter++})`;
                values = [singleID_amigo, ID_album];

            }
            const sql = `INSERT INTO visibilidad (ID_Amigo, ID_album) VALUES ${placeholders}`;

            const result = await db.query(sql, values);
                return result.rowCount; 

        } catch (error) {
            console.error('Error al configurar visibilidad', error);
            throw error;
        }
    }

}

export default Visibilidad;