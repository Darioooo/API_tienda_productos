const Usuario = require("../models/usuarios.model");

async function buscarTodos() {
  const usuarios = await Usuario.find();
  return usuarios;
}
async function buscarPorId(id) {
  const usuarioEncontrado = await Usuario.findById(id);
  return usuarioEncontrado;
}
async function crearUsuario(email, pass) {
  const nuevoUsuario = new Usuario({
    email: email,
    password: pass,
  });
  await nuevoUsuario.save();
  return nuevoUsuario;
}

async function modificarUsuario(id, usuario) {
  const usuarioAModificar = await Usuario.findByIdAndUpdate(id, usuario);
  return usuarioAModificar;
}

async function borrarUsuario(id) {
  const usuarioBorrado = await Usuario.findByIdAndDelete(id);
  return usuarioBorrado;
}

module.exports = {
  buscarTodos,
  buscarPorId,
  crearUsuario,
  modificarUsuario,
  borrarUsuario,
};
