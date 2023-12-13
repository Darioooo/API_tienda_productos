const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  grupo: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    requiered: true,
  },
  marca: {
    type: String,
    requiered: true,
  },
});

const Productos = mongoose.model("productos", productoSchema);

module.exports = Productos;
