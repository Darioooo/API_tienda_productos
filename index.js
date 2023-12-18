const express = require("express");
const bodyParser = require("body-parser");

const usuariosRouter = require("./routes/usuarios.routes");
const productosRouter = require("./routes/productos.routes");
const pedidosRouter = require("./routes/pedido.routes");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("secretKey", process.env.JWTSECRET)

mongoose
  .connect(
    process.env.conectStream
  )
  .then(() => console.log("Conectado a la base de datos!"))
  .catch((error) => console.log("error"));

app.use("/usuarios", usuariosRouter);
app.use("/productos", productosRouter);
app.use("/pedidos", pedidosRouter);

app.listen(process.env.PORT);
