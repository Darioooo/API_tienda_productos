const Producto = require("../models/productos.model");

async function buscarTodos() {
  const productos = await Producto.find();
  return productos;
}
async function buscarPorId(id) {
  const productoEncontrado = await Producto.findById(id);
  return productoEncontrado;
}
async function crearProducto(grup, nom, marc) {
  const nuevoProducto = new Producto({
    grupo: grup,
    nombre: nom,
    marca: marc,
  });
  await nuevoProducto.save();
  return nuevoProducto;
}
async function eliminarProducto(id) {
  const productoBorrado = await Producto.findByIdAndDelete(id);
  return productoBorrado;
}
async function modificarProducto(id, producto) {
  const productoAModificar = await Producto.findByIdAndUpdate(id, producto);
  return productoAModificar;
}

module.exports = {
  buscarTodos,
  buscarPorId,
  crearProducto,
  eliminarProducto,
  modificarProducto,
};
