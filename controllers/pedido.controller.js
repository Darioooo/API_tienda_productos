const Pedido = require("../models/pedido.model");
const { findByIdAndDelete } = require("../models/productos.model");

/* 
 * Controlador para buscar todos los pedidos.
 * La función populate, sirve para traer los demás datos del objectID, y eliminar los que no sean necearios
 */
async function obtenerTodosLosPedidos() {
  const pedidos = Pedido.find()
    .populate("articulo", "-__v")
    .populate("comprador", "-password -__v -_id -rol"); 
  return pedidos;
}

/* Controlador que guarda en "nuevoPedido" los datos proporcionados y que exige el schema pedido, y lo guarda en la base de datos */
async function crearPedido(usuario, producto, cantidad) {
  const nuevoPedido = new Pedido({
    comprador: usuario,
    articulo: producto,
    unidades: cantidad
  });
  await nuevoPedido.save();
  return nuevoPedido;
}

/* Controlador que busca en la base de datos un pedido por id, y lo borra */
async function eliminarPedido(id){
  const pedidoAEliminar = await Pedido.findByIdAndDelete(id);
  return pedidoAEliminar;
}

module.exports = {
  obtenerTodosLosPedidos,
  crearPedido,
  eliminarPedido,
};
