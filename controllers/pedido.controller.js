const Pedido = require("../models/pedido.model");

async function obtenerTodosLosPedidos() {
  const pedidos = Pedido.find()
    .populate("producto", "-__v")
    .populate("comprador", "-password, -__v, -_id"); //se puede poner los que se quitan, o si quitamos el (-), los que se dan.
  return pedidos;
}

async function crearPedido(usuario, producto, cantidad) {
  const nuevoPedido = new Pedido({
    comprador: usuario,
    producto: producto,
    unidades: cantidad,
  });
  await nuevoPedido.save();
  return nuevoPedido;
}

module.exports = {
  obtenerTodosLosPedidos,
  crearPedido,
};
