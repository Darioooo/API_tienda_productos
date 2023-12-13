function validarCrearProducto(body) {
  if (
    body.grupo === undefined ||
    body.grupo.trim() === "" ||
    body.nombre === undefined ||
    body.nombre.trim() === "" ||
    body.marca === undefined ||
    body.marca.trim() === ""
  ) {
    return {
      valido: false,
      mensaje: "faltan datos",
    };
  } else {
    return {
      valido: true,
      mensaje: "producto creado con éxito",
    };
  }
}

function validarModificarProducto(body) {
  if (
    body.grupo === undefined ||
    body.grupo.trim() === "" ||
    body.nombre === undefined ||
    body.nombre.trim() === "" ||
    body.marca === undefined ||
    body.marca.trim() === ""
  ) {
    return {
      valido: false,
      mensaje: "faltan datos",
    };
  } else {
    return {
      valido: true,
      mensaje: "producto modificado con éxito",
    };
  }
}

module.exports = {
  validarCrearProducto,
  validarModificarProducto,
};
