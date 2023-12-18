const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
  comprador: {
    type: mongoose.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  producto: {
    type: mongoose.Types.ObjectId,
    ref: "productos",
    requiered: true,
  },
  unidades: {
    type: Number,
    requiered: true,
  },
});

const Pedido = mongoose.model("pedidos", pedidoSchema);

module.exports = Pedido;
