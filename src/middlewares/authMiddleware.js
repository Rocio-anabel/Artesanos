import jwt from 'jsonwebtoken';
const JWT_SECRET = 'sniffsniff77';

export const verificarToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });
   try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.clearCookie('token');
    res.status(403).redirect('/auth/login');
  }
};
