const { comprobar } = require("../helpers/encriptacion");

/* Validación de lo escrito en los campos para crear el usuario */
function validarCrearUsuario(body) {
  if (
    body.name !== undefined &&
    body.name !== "" &&
    body.lastname !== undefined &&
    body.lastname !== "" &&
    body.email !== undefined &&
    body.email.trim() !== "" &&
    body.password !== undefined &&
    body.password !== "" &&
    (body.rol === "user" || body.rol === "admin") &&
    body.phone !== undefined &&
    body.state !== undefined &&
    body.city !== undefined &&
    body.street !== undefined &&
    body.number !== undefined
  ) {
    return {
      valido: true,
      mensaje: "usuario creado con éxito",
    };
  } else {
    return {
      valido: false,
      mensaje: "faltan datos o son incorrectos",
    };
  }
}
/* Validación de lo escrito en los campos para modificar el usuario */
function validarModificarUsuario(body) {
  if (
    body.name !== undefined &&
    body.name.trim() !== "" &&
    body.lastname !== undefined &&
    body.lastname !== "" &&
    body.email !== undefined &&
    body.email.trim() !== "" &&
    body.password !== undefined &&
    body.password !== "" &&
    (body.rol === "user" || body.rol === "admin") &&
    body.phone !== undefined &&
    body.state !== undefined &&
    body.city !== undefined &&
    body.street !== undefined &&
    body.number !== undefined
  ) {
    return {
      valido: true,
      mensaje: "usuario modificado con éxito",
    };
  } else {
    return {
      valido: false,
      mensaje: "faltan datos o son incorrectos",
    };
  }
}

/* En el body, para cambiar la contraseña, tendrá que rellenarse el objeto con los atributos: password, nuevaPassword y repetirNuevaPassword. El atributo password, se comprobará con el hash(contraseña encriptada) de la base de datos, y la nueva contraseña se repite dos veces para verificar que deseamos esa contraseña y está bien escrita */
async function validarCambioContrasenia(body, hashPwd) {
  if (
    body.nuevaPassword !== undefined &&
    body.nuevaPassword !== "" &&
    (await comprobar(hashPwd, body.password)) === true &&
    body.nuevaPassword === body.repetirNuevaPassword
  ) {
    return {
      valido: true,
      mensaje: "la contraseña ha sido modificada con éxito",
    };
  } else if (
    (await comprobar(hashPwd, body.password)) === true &&
    body.nuevaPassword !== undefined &&
    body.nuevaPassword !== "" &&
    body.nuevaPassword !== body.repetirNuevaPassword
  ) {
    return {
      valido: false,
      mensaje:
        "error al modificar la contraseña, la nueva contraseña no coincide en los dos campos",
    };
  } else {
    return {
      valido: false,
      mensaje: "error al modificar la contraseña",
    };
  }
}

module.exports = {
  validarCrearUsuario,
  validarModificarUsuario,
  validarCambioContrasenia,
};
