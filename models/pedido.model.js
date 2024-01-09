const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Modelo de pedido. Es el formato y atributos que tiene un pedido para ser aceptado y registrado en la colección de la base de datos */
const pedidoSchema = new Schema({
  comprador: {
    type: mongoose.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  articulo: {
    type: mongoose.Types.ObjectId,
    ref: "productos",
    required: true,
  },
  unidades: {
    type: Number,
    required: true,
  },
});

/* Relacionamos la coleccion "pedidos" con "pedidoSchema", y la guardamos como "Pedido" para exportar y utilizar en nuestro código */
const Pedido = mongoose.model("pedidos", pedidoSchema);

module.exports = Pedido;
