import bcrypt from 'bcrypt';
import Usuario from '../models/usuario.js';
import Amistad from "../models/amistades.js";


export const registrarUsuario = async (req, res) => {
  try {
    const { email, password, nombre, apellido } = req.body; //validar parametros 
    const passwordHasheada = await bcrypt.hash(password, 10);
    const fechaRegistro = (new Date 
      ((new Date
        ((new Date
          (new Date())).toISOString() )).getTime() - 
          ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');

    await Usuario.create({   
      email,
      password: passwordHasheada,
      nombre,
      apellido,
      URL_avatar: 'kkk', // opcional
      fechaRegistro,
    });

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).send('Error al registrar usuario');
  }
};

export const buscarUsuarios = async (req, res) => {
    const { nombre } = req.query;

    try {
        if (!nombre || nombre.trim() === '') {
            return res.render('usuario_buscar', { nombre: '', usuarios: [] });
        }

        const usuarios = await Usuario.buscarPorNombre(nombre);
        res.render('usuario_buscar', { nombre, usuarios });
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ message: 'Error interno' });
    }
};

export const mostrarPerfil = async (req, res) => {
  const { id } = req.params;

  try {
    // Supongamos que hay un método para buscar usuario por id
    const usuario = await Usuario.buscarPorId(id);

    if (!usuario) {
      return res.status(404).render('error', { mensaje: 'Usuario no encontrado' });
    }

    // Renderizamos la vista perfil con datos del usuario
    res.render('usuario_perfil', { usuario });
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error);
    res.status(500).render('error', { mensaje: 'Error interno del servidor' });
  }
};
export const perfilUsuario = async (req, res) => {
  try {
    const idSesion = req.usuario?.id || null;
     // id usuario logueado, si hay

    const idPerfil = parseInt(req.params.id, 10);

    if (isNaN(idPerfil)) {
      return res.status(400).send('ID inválido');
    }
    // Obtener info del usuario del perfil
    const usuario = await Usuario.buscarPorId(idPerfil);
    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Consultar si son amigos (ejemplo con función que deberías tener)
    let sonAmigos = false;
    console.log(idSesion)
    if (idSesion) {
      sonAmigos = await Amistad.sonAmigos(idSesion, idPerfil);
    }

    console.log(sonAmigos);

    res.render("usuario_perfil", { usuario, sonAmigos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno");
  }
};
