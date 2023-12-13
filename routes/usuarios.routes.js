const express = require("express");
const router = express.Router();

const {
  buscarTodos,
  buscarPorId,
  crearUsuario,
  modificarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios.controller");
const {
  validarCrearUsuario,
  validarModificarUsuario,
} = require("../helpers/usuarios.validator");

router.get("/", async (req, res) => {
  try {
    const usuarios = await buscarTodos();
    res.json(usuarios);
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const usuarioEncontrado = await buscarPorId(req.params.id);
    if (usuarioEncontrado) {
      res.json(usuarioEncontrado);
    } else {
      res.status(404).json({ msg: "error: usuario no encontrado" });
    }
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  const resultadoValidacion = validarCrearUsuario(req.body);

  if (!resultadoValidacion.valido) {
    res.status(400).json({ msg: resultadoValidacion.mensaje });
  } else {
    try {
      await crearUsuario(req.body.email.trim(), req.body.password);
      res.json({ msg: "producto creado" });
    } catch (error) {
      res.status(500).json({ msg: "error interno del servidor" });
    }
  }
});

router.put("/:id", async (req, res) => {
  const resultadoValidacion = validarModificarUsuario(req.body);
  if (!resultadoValidacion.valido) {
    res.status(400).json({ msg: resultadoValidacion.mensaje });
  } else {
    try {
      await modificarUsuario(req.params.id, req.body);
      res.status(400).json({ msg: "usuario modificado" });
    } catch (error) {
      res.status(500).json({ msg: "error interno del servidor" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const usuarioBorrado = await borrarUsuario(req.params.id);
    if (usuarioBorrado) {
      res.json({ msg: "usuario borrado" });
    } else {
      res.json({ msg: "usuario no borrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error interno del servidor" });
  }
});

module.exports = router;
