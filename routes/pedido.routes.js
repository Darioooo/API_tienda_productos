const express = require("express");
const router = express.Router();

const {
  obtenerTodosLosPedidos,
  crearPedido,
  eliminarPedido,
} = require("../controllers/pedido.controller");

/* Ruta mediante la cual obtendremos todos los pedidos existentes */
router.get("/", async (req, res) => {
  const pedidos = await obtenerTodosLosPedidos();
  res.json(pedidos);
});

/* Ruta de creación de pedidos */
router.post("/", async (req, res) => {
  await crearPedido(req.body.usuario, req.body.producto, req.body.cantidad);
  res.json({ msg: "pedido creado con éxito" });
});

/* Ruta para borrar los pedidos de la tienda ya realizados o que se desean eliminar por otro motivo */
router.delete("/:id", async (req, res) => {
  const pedidoBorrado = await eliminarPedido(req.params.id);
  try {
    if (pedidoBorrado) {
      res.json({ msg: "pedido borrado con éxito" });
    } else {
      res.status(404).json({ msg: "pedido no borrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error del servidor" });
  }
});

module.exports = router;
