import { z } from "zod/v4";

export const usuarioSchema = z.object({
    email: z.email({error: 'Email inválido'}),
    password: z.string({invalid_type_error: 'Contraseña debe ser una cadena'}).min(8, {error: 'Contraseña menor a 8 caracteres'}),
    nombre: z.string({invalid_type_error: 'Nombre debe ser una cadena'}),
    apellido: z.string({invalid_type_error: 'Apellido debe ser una cadena'})
});

export const albumSchema = z.object({
    titulo: z.string({invalid_type_error: 'El título debe ser una cadena'})
});

export const imagenSchema = z.object({
    //caption: z.string().transform(val => val === "" ? null : val).nullable(),
    ID_album: z.coerce.number().int().min(1)
});
export const solicitudAmistadSchema = z.object({
  ID_Receptor: z.coerce.number().int().positive(),
});
export const responderSolicitudSchema = z.object({
  ID_Emisor: z.number().int().positive(),
});
export const comentarioSchema = z.object({
  ID_Imagen: z.coerce.number().int().positive(),
  contenido: z.string().min(1, 'El comentario no puede estar vacío').max(500),
});
export const visibilidadSchema = z.object({
  
  ID_amigos: z.array(z.number().int().positive()),
  ID_album: z.number().int().positive()
});
export const notificacionSchema = z.object({
  ID_usuario: z.number().int().positive(),
  tipo: z.enum(['solicitud', 'comentario', 'amistad', 'respuesta']),
  mensaje: z.string().max(255),
  leido: z.boolean().optional()
});

export const crearAmistadSchema = z.object({
  ID_amigo: z.number().int().positive()
});
export const validar = (schema) => (req, res, next) => {
  console.log('BODY:', req.body);
  
    const resultado = schema.safeParse(req.body);
 
  if (!resultado.success) {
    const errores = resultado.error?.errors ?? [];
    
    return res.status(400).json({
      message: 'Error de validación de datos',
      errors: errores.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    });

   
  }

  req.body = resultado.data;
  next();
};



