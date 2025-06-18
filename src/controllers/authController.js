import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/usuario.js';

const JWT_SECRET = 'sniffsniff77';
const JWT_EXPIRES_IN = '24h';

export const login = async(req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.getByEmail(email);

    if(!usuario){
        return res.status(401).json({mensaje: 'Email incorrecto'});
    }

    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }
    
    const token = jwt.sign( {
      id: usuario.ID_Usuario,
      nombre: usuario.nombre
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // para pruebas locales
      maxAge: 1000 * 60 * 60 * 24,
    });
    
    res.redirect('/album/feed');

}