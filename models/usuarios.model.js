const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  email: {
    type: String,
    requiered: true,
  },
  password: {
    type: String,
    requiered: true,
  },
});

const Usuarios = mongoose.model("usuarios", usuarioSchema);

module.exports = Usuarios;
