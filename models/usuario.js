//! Esquema y modelo para usuarios

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  login: { type: String, minLength: 5, required: true, unique: true },
  password: { type: String, minLength: 8, required: true },
});

let Usuario = mongoose.model("usuario", UsuarioSchema);

//! Exportamos el modelo Usuario
module.exports = Usuario;
