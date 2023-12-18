const Usuario = require("../models/usuarios.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {encriptar, comprobar} = require('../helpers/encriptacion')

async function buscarTodos() {
  const usuarios = await Usuario.find();
  return usuarios;
}

async function buscarPorMail(mail) {
  const usuarioEncontrado = await Usuario.findOne({ email: mail });
  return usuarioEncontrado;
}
async function buscarPorId(id) {
  const usuarioEncontrado = await Usuario.findById(id);
  return usuarioEncontrado;
}
async function crearUsuario(email, pwd, rol) { 
  const nuevoUsuario = new Usuario({
    email: email,
    password: (await encriptar(pwd)), 
    rol: rol,
  });
  await nuevoUsuario.save(); //mongoose ya comprueba que el email no está duplicado.
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

async function login(mail, pwd) {
  const usuarioEncontrado = await Usuario.findOne({ email: mail });

  if (usuarioEncontrado) {
    const resultadoComparacion = await comprobar(usuarioEncontrado.password, pwd)
    if (resultadoComparacion) {
      const token = jwt.sign(
        { id: usuarioEncontrado._id, name: usuarioEncontrado.email },
        process.env.JWTSECRET,
        { expiresIn: "1h" }
      );
      return {
        usuario: usuarioEncontrado,
        token: token,
        msg: null,
      };
    } else {
      return {
        usuario: null,
        token: null,
        msg: "credenciales incorrectas(password)",
      };
    }
  } else {
    return {
      usuario: null,
      token: null,
      msg: "credenciales incorrectas(usuario)",
    };
  }
}

module.exports = {
  buscarTodos,
  buscarPorMail,
  buscarPorId,
  crearUsuario,
  modificarUsuario,
  borrarUsuario,
  login,
};
