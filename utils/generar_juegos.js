//! HELPER -> genera unos juegos en la base de datos para trastear

const express = require('express');
const mongoose = require('mongoose');
const Juego = require('../models/juego');

mongoose.connect('mongodb://mongodb:27017/playrest_v3');

let juego1 = new Juego({
  nombre: 'Call of duty',
  descripcion: 'descripcion CoD',
  edad: 18,
  jugadores: 10,
  tipo: 'rol',
  imagen: 'Call of duty.jpg',
  precio: 0,
});

let juego2 = new Juego({
  nombre: 'Fortnite',
  descripcion: 'descripcion fornite',
  edad: 18,
  jugadores: 10,
  tipo: 'rol',
  imagen: 'fornite.jpg',
  precio: 0,
});
let juego3 = new Juego({
  nombre: 'gta san andreas',
  descripcion: 'descripcion GTA',
  edad: 18,
  jugadores: 10,
  tipo: 'rol',
  imagen: 'GTA.jpg',
  precio: 0,
});

let juego4 = new Juego({
  nombre: 'Minecraft',
  descripcion: 'descripcion minecraft',
  edad: 18,
  jugadores: 10,
  tipo: 'rol',
  imagen: 'minecraft.jpg',
  precio: 0,
});

juego1.save();
juego2.save();
juego3.save();
juego4.save();
