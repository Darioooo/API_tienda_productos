const Usuario = require("../models/usuarios.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { encriptar, comprobar } = require("../helpers/encriptacion");

/* Controlador para buscar en la base de datos todos los usuarios */
async function buscarTodos() {
  const usuarios = await Usuario.find();
  return usuarios;
}

/* Controlador para buscar en la base de datos un usuario por su email */
async function buscarPorMail(mail) {
  const usuarioEncontrado = await Usuario.findOne({ email: mail });
  return usuarioEncontrado;
}

/* Controlador para buscar en la base de datos un usuario por su id */
async function buscarPorId(id) {
  const usuarioEncontrado = await Usuario.findById(id);
  return usuarioEncontrado;
}

/* Controlador que guarda en "nuevoUsuario" los datos proporcionados y que exige el schema usuario, encripta la contraseña, y lo guarda en la base de datos */
async function crearUsuario(
  name,
  lastname,
  email,
  pwd,
  rol,
  phone,
  state,
  city,
  street,
  number
) {
  const nuevoUsuario = new Usuario({
    name: name,
    lastname: lastname,
    email: email,
    password: await encriptar(pwd),
    rol: rol,
    phone: phone,
    state: state,
    city: city,
    street: street,
    number: number,
  });
  await nuevoUsuario.save(); //mongoose ya comprueba que el email no está duplicado.
  return nuevoUsuario;
}

/* Controlador que recoge en "modificarUsuario" todos los datos a modificar y necesarios para schema Usuario, encripta la contraseña, y sobreescribe los datos del usuario con dicho id */
async function modificarUsuario(id, usuario) {
  const modificacionUsuario = {
    name: usuario.name,
    lastname: usuario.lastname,
    email: usuario.email,
    password: await encriptar(usuario.password),
    rol: usuario.rol,
    phone: usuario.phone,
    state: usuario.state,
    city: usuario.city,
    street: usuario.street,
    number: usuario.number,
  };
  const usuarioModificado = await Usuario.findByIdAndUpdate(
    id,
    modificacionUsuario
  );
  return usuarioModificado;
}

/* Encriptamos la nueva contraseña, la cual irá dentro de un objeto cuyo atributo de llame de nuevo "password" para que se sobreescriba dicho dato del usuario en la base de datos */
async function modificarContrasenia(id, nuevaPassword) {
  const nuevaPasswordEncriptada = await encriptar(nuevaPassword);
  const objetoPassword = {
    password: nuevaPasswordEncriptada,
  };
  const usuarioAModificarContrasenia = await Usuario.findByIdAndUpdate(
    id,
    objetoPassword
  );
  return usuarioAModificarContrasenia;
}

/* Controlador que recoge en "nuevaDireccionYTlf" los datos de teléfono y dirección a modificar del usuario buscado por id. En caso de que hubiera más datos en el body, no se cambiarían */
async function modificarDireccionYTlf(id, body) {
  const nuevaDireccionTlf = {
    phone: body.phone,
    state: body.state,
    city: body.city,
    street: body.street,
    number: body.number,
  };
  const usuarioModificado = await Usuario.findByIdAndUpdate(
    id,
    nuevaDireccionTlf
  );
  return usuarioModificado;
}

/* Controlador para localizar un usuario por id y borrarlo de la base de datos */
async function borrarUsuario(id) {
  const usuarioBorrado = await Usuario.findByIdAndDelete(id);
  return usuarioBorrado;
}

/*
 * Controlador que comprueba que "email" y "password" con los que se intenta acceder a una area privada de usuario, existen en la base       de datos.
 * Después de la confirmación, a dicho usuario le asigna un token por un tiempo determinado
 */
async function login(mail, pwd) {
  const usuarioEncontrado = await Usuario.findOne({ email: mail });

  if (usuarioEncontrado) {
    const resultadoComparacion = await comprobar(
      usuarioEncontrado.password,
      pwd
    );
    if (resultadoComparacion) {
      const token = jwt.sign(
        { id: usuarioEncontrado._id, name: usuarioEncontrado.email },
        process.env.JWTSECRET,
        { expiresIn: "1h" }
      );
      return {
        usuario: usuarioEncontrado,
        token: token,
        msg: "bienvenido a su cuenta de usuario",
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
  modificarContrasenia,
  modificarDireccionYTlf,
  borrarUsuario,
  login,
};
