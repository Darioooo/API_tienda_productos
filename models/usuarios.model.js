const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
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
});

/* si necesitaramos que el atrubuto unique, afectase a dos datos en conjunto, la funcion en mongoose seria: ({email:1, rol:1}, {unique:true}) */

const Usuarios = mongoose.model("usuarios", usuarioSchema);

module.exports = Usuarios;
