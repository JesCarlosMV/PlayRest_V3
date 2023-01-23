//! Servidor Express + Conexion BBDD "playrest_v3" + Enrutadores + Middlewares
//! Plantillas con nunjucks + Bootstrap + Express-session + Method-override

// librerias
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routerPublico = require('./routes/publico');
const routerJuegosAdmin = require('./routes/juegos');
const routerAuthLogin = require('./routes/auth_login');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

// conexion BBDD
mongoose
  .connect('mongodb://mongodb:27017/playrest_v3', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.error(err));

// Servidor Express
const servidor = express();

// Asignación del motor de plantillas
servidor.set('view engine', 'njk');

// Configuramos motor Nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: servidor,
});

// Middleware body-parser para peticiones POST y PUT
// Middleware para estilos Bootstrap
// Middleware para sesiones
servidor.use(
  session({
    secret: '1234',
    resave: true,
    saveUninitialized: false,
  })
);
servidor.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
servidor.use(bodyParser.urlencoded({ extended: false }));
servidor.use(express.json());
servidor.use(express.static('./node_modules/bootstrap/dist'));
servidor.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
servidor.use(express.static('./public/uploads'));

// routes
servidor.use('/admin', routerJuegosAdmin);
servidor.use('/', routerPublico);
servidor.use('/auth', routerAuthLogin);

// puesta en marcha del servidor
servidor.listen(8080, () => {
  console.log('Servidor Express escuchando en el puerto 8080..');
});
