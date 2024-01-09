const express = require("express");
const router = express.Router();

const {
  buscarTodos,
  buscarPorId,
  buscarPorGrupo,
  crearProducto,
  eliminarProducto,
  modificarProducto,
  
} = require("../controllers/productos.controller");
const {
  validarCrearProducto,
  validarModificarProducto,
} = require("../helpers/productos.validator");

/* Podemos buscar todos los productos, o filtrado mediante query de grupo, donde pondremos --> ?grupo="embutidos","quesos" o "legumbres" */
router.get("/", async (req, res) => {
  try {
    if(req.query.grupo){
      productos = await buscarPorGrupo(req.query.grupo)
    } else {
      productos = await buscarTodos();
    }
    res.json(productos);
    
  } catch (error) {
    res.status(500).json({ msg: "error interno" + String(error) });
  }
});

/* Busqueda de producto por id */
router.get("/:id", async (req, res) => {
  try {
    const productoEncontrado = await buscarPorId(req.params.id);
    if (productoEncontrado) {
      res.json(productoEncontrado);
    } else {
      res.status(404).json({ msg: "producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error interno" + String(error) });
  }
});

/* Creamos producto en caso de validación de los campos a rellenar */
router.post("/", async (req, res) => {
  const resultadoValidacion = validarCrearProducto(req.body);
  if (!resultadoValidacion.valido) {
    res.status(400).json({ msg: resultadoValidacion.mensaje });
  } else {
    try {
      await crearProducto(
        req.body.grupo.trim(),
        req.body.nombre.trim(),
        req.body.marca.trim()
      );
      res.json({ msg: resultadoValidacion.mensaje });
    } catch (error) {
      res.status(500).json({ msg: "error del servidor" });
    }
  }
});

/* Eliminar producto */
router.delete("/:id", async (req, res) => {
  const productoBorrado = await eliminarProducto(req.params.id);
  try {
    if (productoBorrado) {
      res.json({ msg: "producto borrado" });
    } else {
      res.status(404).json({ msg: "producto no borrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error del servidor" });
  }
});

/* Modificación de producto en caso de validación del nuevo, tendremos que rellenar todos los campos para ejecutarlo */
router.put("/:id", async (req, res) => {
  const resultadoValidacion = validarModificarProducto(req.body);
  if (!resultadoValidacion.valido) {
    res.status(404).json({ msg: resultadoValidacion.mensaje });
  } else {
    try {
      await modificarProducto(req.params.id, req.body);
      res.json({ msg: resultadoValidacion.mensaje });
    } catch (error) {
      res.status(500).json({ msg: "error del servidor" });
    }
  }
});

module.exports = router;
