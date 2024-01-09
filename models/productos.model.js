const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Modelo de producto. Es el formato y atributos que tiene un producto para ser aceptado y registrado en la colección de la base de datos */ 
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

/* Relacionamos la coleccion "productos" con "productoSchema", y la guardamos como "Producto" para exportar y utilizar en nuestro código */
const Producto = mongoose.model("productos", productoSchema);

module.exports = Producto;
