import Album from "../models/album.js";
import Imagen from "../models/imagen.js";
import Comentario from '../models/comentario.js';
import Amistades from "../models/amistades.js";
import Visibilidad from "../models/visibilidad.js";

export const crearAlbum = async (req, res) => {
    try {
        const { titulo, visibilidad } = req.body;
        const ID_Usuario = req.usuario.id;
        const fechaCreacion = (new Date 
      ((new Date
        ((new Date
          (new Date())).toISOString() )).getTime() - 
          ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');

        const ID_album = await Album.create({
            ID_Usuario,
            titulo,
            fechaCreacion
        });

        if (visibilidad === 'amigos') {
            // Obtener amigos del usuario (ejemplo: consulta a tabla amistad)
            const amigos = await Amistades.getAmigos(ID_Usuario); // esta función debe devolver un array con los ID_amigo
            if (amigos.length > 0) {
                await Visibilidad.setAmigos(amigos, ID_album);
            }
        }
        res.render('mis-albums', {ID_album: ID_album});


    } catch (error) {
        res.status(500).send('Error al crear álbum');
        
    }   
};


export const obtenerFeedAlbumes = async (req, res) => {
    try {
        const ID_Usuario = req.usuario.id;
        const albumes = await Album.getAlbumesVisibles(ID_Usuario);
        
        const albumesConContenido = await Promise.all(albumes.map(async (album) => {
            const imagenes = await Imagen.getImagenesByAlbum(album.ID_album);

            const imagenesConComentarios = await Promise.all(imagenes.map(async (imagen) => {
                const comentarios = await Comentario.listarComentarios(imagen.ID_Imagen); 
                return { ...imagen, comentarios };
            }));
            console.log(imagenesConComentarios);
            return { ...album, imagenes: imagenesConComentarios };
        }));

        res.render('feed', { albumes: albumesConContenido, usuarioId: ID_Usuario });
    } catch (error) {
        console.error('Error al obtener el feed:', error);
        res.status(500).json({ message: 'Error al obtener el feed de álbumes' });
    }
};

export const mostrarMisAlbumes = async (req, res) => {
    try {
        const ID_Usuario = req.usuario.id;
        const misAlbumes = await Album.getAlbumesPorUsuario(ID_Usuario);
        res.render('mis-albums', { albumes: misAlbumes }); // nombre de la vista Pug
    } catch (error) {
        console.error('Error al obtener álbumes:', error);
        res.status(500).send('Error al obtener tus álbumes');
    }
};
