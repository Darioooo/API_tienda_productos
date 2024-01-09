/* Validación de lo escrito en ls campos para crear usuario */
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

/* Validación de lo escrito en ls campos para modificar usuario */
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
