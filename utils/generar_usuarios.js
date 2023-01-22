//! HELPER -> para GENERAR USUARIOS , encryptando la pass con bcrypt

const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/playrest_v3');

// let passUsu1 = "1234";
// let passUsu2 = "0000";

// let usu1 = new Usuario({
//   login: "JesusCarlos",
//   password: bcrypt.hashSync(passUsu1, 10),
// });
// usu1.save();

// let usu2 = new Usuario({
//   login: "Martita",
//   password: bcrypt.hashSync(passUsu2, 10),
// });
// usu2.save();

// para eliminar la colección usuarios
// Usuario.collection.drop();
