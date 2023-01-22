//! Enrutador de la parte pública de la aplicación (sin autenticación)

const express = require('express');
let Juego = require('../models/juego');
let routerPublico = express.Router();

//  PARTE PUBLICA

//?  GETS <==========
/*  raiz de la app , renderiza vista publico_index */
routerPublico.get('/', (req, res) => {
  try {
    res.status(200).render('publico_index');
  } catch (error) {
    res.status(500).render('publico_error');
  }
});

/*  buscará todos los juegos cuyo nombre contenga el texto que se le pasará en el cuerpo de
    la petición, y renderizará la vista publico_index  pasándole como parámetro los resultados obtenidos,
    o el mensaje "No se encontraron juegos" si no hay resultados */
routerPublico.get('/buscar', async (req, res) => {
  try {
    const juegoEncontrado = await Juego.find({
      nombre: { $regex: req.query.busqueda, $options: 'i' },
    });

    if (juegoEncontrado.length == 0) {
      res.status(404).render('publico_index', {
        mensaje: 'No se encontraron juegos',
      });
    } else {
      res.status(200).render('publico_index', { juegos: juegoEncontrado });
    }
  } catch (error) {
    res.status(500).render('publico_error', { mensaje: 'Juego no encontrado' });
  }
});

/*  renderizará la vista publico_juegos, pasándole como parámetro los datos del juego cuyo id le llegue
    como parámetro en la ruta.
    Si no se encuentra el juego, se renderizará la vista publico_error con el mensaje "Juego no encontrado*/
routerPublico.get('/juegos/:id', async (req, res) => {
  try {
    const juegoEncontrado = await Juego.findById({ _id: req.params.id });

    if (juegoEncontrado) {
      res.status(200).render('publico_juego', { resultado: juegoEncontrado });
    } else {
      res.status(404).render('publico_error', { mensaje: 'Juego no encontrado' });
    }
  } catch (error) {
    res.status(500).render('publico_error', { mensaje: 'Error en la aplicacion' });
  }
});

module.exports = routerPublico;
