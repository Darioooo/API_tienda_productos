const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Modelo de usuario. Es el formato y atributos que tiene un usuario para ser aceptado y registrado en la colección de la base de datos */ 
const usuarioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requiered: true,
    unique: true,
  },
  password: {
    type: String,
    requiered: true,
  },
  rol: {
    type: String,
    requiered: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

/* Relacionamos la coleccion "usuarios" con "usuarioSchema", y la guardamos como "Usuario" para exportar y utilizar en nuestro código */
const Usuario = mongoose.model("usuarios", usuarioSchema);

module.exports = Usuario;
