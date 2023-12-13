function validarCrearUsuario(body) {
  if (
    body.email === undefined ||
    body.email.trim() === "" ||
    body.password === undefined ||
    body.password.trim() === ""
  ) {
    return {
      valido: false,
      mensaje: "faltan datos",
    };
  } else {
    return {
      valido: true,
      mensaje: "usuario creado con éxito",
    };
  }
}

function validarModificarUsuario(body) {
  if (
    body.email === undefined ||
    body.email.trim() === "" ||
    body.password === undefined ||
    body.password === ""
  ) {
    return {
      valido: false,
      mensaje: "faltan datos",
    };
  } else {
    return {
      valido: true,
      mensaje: "usuario modificado con éxito",
    };
  }
}

module.exports = {
  validarCrearUsuario,
  validarModificarUsuario,
};
