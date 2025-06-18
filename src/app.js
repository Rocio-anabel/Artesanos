import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';




const app = express();
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})


app.use(express.static(path.join(process.cwd(), 'public')));
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cookieParser());

/*Rutas */
import usuarioRouter from './routes/usuarioRouter.js'
import authRouter from './routes/authRouter.js';
import albumRouter from './routes/albumRouter.js'
import imagenRouter from './routes/imagenRouter.js';
import amistadesRouter from './routes/amistadesRouter.js';
import comentarioRouter from './routes/comentarioRouter.js';
import notificacionRouter from './routes/notificacionRouter.js';
import solicitudAmistadRouter from './routes/solicitudAmistadRouter.js';
import visibilidadRouter from './routes/visibilidadRouter.js';

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  
  socket.on('registrar_usuario', (userId) => {
    socket.join(`usuario_${userId}`);
  });
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

/* Rutas
app.use('/', mainRoutes);*/
app.use('/usuario', usuarioRouter);
app.use('/auth', authRouter);
app.use('/album', albumRouter);
app.use('/imagen', imagenRouter);
app.use('/amistades', amistadesRouter);
app.use('/comentario',comentarioRouter);
app.use('/solicitud',solicitudAmistadRouter);
app.use('/visibilidad',visibilidadRouter);
app.use('/notificacion', notificacionRouter);

app.get('/home', (req, res) => {
  res.redirect('/album/feed');
});
app.get('/', (req, res) => {
  res.render('inicio', { error: null });
});
app.get('/notificaciones', (req, res) => {
  res.render('notificaciones');
});
// Puerto
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});