const Producto = require("../models/productos.model");

/* Controlador para buscar todos los productos de la base de datos */
async function buscarTodos() {
  const productos = await Producto.find();
  return productos;
}

/* Controlador para buscar por id el producto deseado de la base de datos */
async function buscarPorId(id) {
  const productoEncontrado = await Producto.findById(id);
  return productoEncontrado;
}

/* Controlador para buscar todos los productos pertenecientes a un mismo grupo */
async function buscarPorGrupo(tipo) {
  const productosDelGrupoEncontrados = await Producto.find({ grupo: tipo });
  return productosDelGrupoEncontrados;
}

/* Controlador que guarda en "nuevoProducto" los datos proporcionados y que exige el schema producto, y lo guarda en la base de datos */
async function crearProducto(grup, nom, marc) {
  const nuevoProducto = new Producto({
    grupo: grup,
    nombre: nom,
    marca: marc,
  });
  await nuevoProducto.save();
  return nuevoProducto;
}

/* Controlador que busca por id un producto, y lo borra de la base de datos */
async function eliminarProducto(id) {
  const productoBorrado = await Producto.findByIdAndDelete(id);
  return productoBorrado;
}

/* Controlador que busca por id un producto, y lo modifica en la base de datos */
async function modificarProducto(id, producto) {
  const productoAModificar = await Producto.findByIdAndUpdate(id, producto);
  return productoAModificar;
}

module.exports = {
  buscarTodos,
  buscarPorId,
  buscarPorGrupo,
  crearProducto,
  eliminarProducto,
  modificarProducto,
};
