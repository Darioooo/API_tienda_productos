const express = require("express");
const bodyParser = require("body-parser");
const usuariosRouter = require("./routes/usuarios.routes");
const productosRouter = require("./routes/productos.routes");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://darionietosastre:8y6z2I3EetEI8Y2x@cluster0.1gpdnet.mongodb.net/tienda_productos_leon"
  )
  .then(() => console.log("Conectado a la base de datos!"))
  .catch(() => console.log(error));

app.use("/usuarios", usuariosRouter);
app.use("/productos", productosRouter);

app.listen(3000);
