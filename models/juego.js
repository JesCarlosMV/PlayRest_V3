//! Esquema y modelo para juegos y sus ediciones.

const mongoose = require("mongoose");
const { Schema } = mongoose;

const EdicionSchema = new Schema({
  edicion: { type: String, required: true },
  anyo: { type: Number, min: 2000, max: 2023 },
});

const JuegoSchema = new Schema({
  nombre: { type: String, minLength: 6, required: true },
  descripcion: { type: String, required: true },
  edad: { type: Number, required: true, min: 0, max: 100 },
  jugadores: { type: Number, required: true },
  tipo: {
    type: String,
    enum: ["rol", "escape", "dados", "fichas", "cartas", "tablero"],
  },
  precio: { type: Number, min: 0, required: true },
  imagen: { type: String },
  ediciones: { type: [EdicionSchema] },
});

let Juego = mongoose.model("juego", JuegoSchema);

//! Exportamos el modelo Juego
module.exports = Juego;
