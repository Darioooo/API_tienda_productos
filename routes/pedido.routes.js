const express = require("express");
const router = express.Router();

const {
  obtenerTodosLosPedidos,
  crearPedido,
} = require("../controllers/pedido.controller");

router.get("/", async (req,res)=>{
    const pedidos = await obtenerTodosLosPedidos();
    res.json(pedidos)
})

router.post("/", async (req,res)=>{
    await crearPedido(
        req.body.usuario,
        req.body.producto,
        req.body.cantidad,
    )
    res.json({msg: "pedido creado con éxito"})
})

router.put("/:id", async (req,res)=>{
    
})



module.exports = router
