//! Enrutador de la parte ADMINISTRADOR de la aplicación
//! subida de imagenes con multer y alert de avisos con npm alert

const express = require('express');
const routerJuegosAdmin = express.Router();
const Juego = require('../models/juego');
let alert = require('alert');
const auth = require('../utils/auth');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

let upload = multer({ storage: storage });

//   ------------------ PARTE PRIVADA ------------------

//? GETS <==========
//  renderizará la vista admin_juegos pasándole como parámetro el listado de juegos que se encuentren en la base de datos
//  .find() devuelve un ARRAY DE OBJETOS con los juegos
routerJuegosAdmin.get('/juegos', auth, (req, res) => {
  try {
    Juego.find().then((resultado) => {
      res.status(200).render('admin_juegos', { juegos: resultado });
    });
  } catch (error) {
    res.status(500).render('admin_error', { mensaje: 'Error en el servidor' });
  }
});

/*  renderizará la vista admin_juegos_form , pasándole como parámetro el texto "Añadir" para el botón , el método POST
    y el color del boton para que admin_juegos_form SEPA QUE ESTAMOS EN MODO POST */
routerJuegosAdmin.get('/juegos/nuevo', auth, (req, res) => {
  try {
    res.status(200).render('admin_juegos_form', {
      boton: 'Añadir',
      metodo: 'post',
      color: 'outline-primary',
    });
  } catch (error) {
    res.status(500).render('admin_error', { mensaje: 'Error en el servidor' });
  }
});

/*  renderizará la vista admin_juegos_form pasándole como
    parámetro el juego con el id indicado ,el texto "Editar" para el botón , el método PUT
    y el color del boton para que admin_juegos_form SEPA QUE ESTAMOS EN MODO PUT. Si no se encuentra el juego, se renderizará la vista
    admin_error con el mensaje "Juego no encontrado */
routerJuegosAdmin.get('/juegos/editar/:id', auth, (req, res) => {
  try {
    Juego.findById(req.params.id).then((resultado) => {
      if (resultado) {
        res.status(200).render('admin_juegos_form', {
          resultado: resultado,
          boton: 'Editar',
          metodo: 'put',
          color: 'outline-warning',
        });
      } else {
        res.status(400).render('admin_error', { mensaje: 'Juego no encontrado' });
      }
    });
  } catch (error) {
    res.status(500).render('Error en el servidor');
  }
});

//?  POST <=============
/*  recogerá de la petición los datos del juego, hará la inserción y, si todo ha sido
    correcto, redirigirá a la ruta base de este enrutado */
routerJuegosAdmin.post('/juegos', upload.single('imagen'), auth, (req, res) => {
  try {
    let nuevoJuego = new Juego({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      edad: req.body.edad,
      jugadores: req.body.jugadores,
      tipo: req.body.tipo,
      imagen: req.file.filename,
      precio: req.body.precio,
    });

    nuevoJuego.save().then((resultado) => {
      res.status(200).redirect('/admin/juegos');
    });

    alert('Juego añadido correctamente, redirigiendo al listado de juegos ');
    console.log('Juego añadido correctamente');
  } catch (error) {
    res.status(500).send({ ok: false, error: 'Error en el servidor' });
  }
});

//?  PUTS <=============
/*  recogerá de la petición los datos del juego cuyo id se pasa en la URL, y hará la
    modificación de sus campos. Si todo ha sido correcto, redirigirá a la ruta base de este enrutador */
routerJuegosAdmin.put('/juegos/:id', auth, (req, res) => {
  try {
    console.log('ha entrado en el put');
    Juego.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          edad: req.body.edad,
          jugadores: req.body.jugadores,
          tipo: req.body.tipo,
          imagen: req.body.imagen,
          precio: req.body.precio,
        },
      },
      { new: true }
    ).then((resultado) => {
      if (resultado) {
        alert('juego modificado correctamente, redirigiendo al listado de juegos ');
        res.status(200).redirect('/admin/juegos');
      } else {
        alert('juego no encontrado, redirigiendo al listado de juegos ');
        res.status(400).redirect('/admin/juegos');
      }
    });
  } catch (error) {
    res.status(500).render('admin_error', { mensaje: 'Error en el servidor' });
  }
});

//?  DELETE <============
/*  eliminará el juego cuyo id se pasa en la URL, redirigiendo si todo es
    correcto a la ruta base de este enrutador */
routerJuegosAdmin.delete('/juegos/:id', auth, (req, res) => {
  try {
    Juego.findByIdAndDelete(req.params.id).then((resultado) => {
      if (resultado) {
        alert('juego borrado correctamente! , redirigiendo al listado de juegos');

        res.status(200).redirect('/admin/juegos');
      } else {
        alert('juego NO encontrado.. redirigiendo al listado de juegos');

        res.status(400).redirect('/admin/juegos');
      }
    });
  } catch (error) {
    res.status(500).render('admin_error', { mensaje: 'Error en el servidor' });
  }
});

module.exports = routerJuegosAdmin;
