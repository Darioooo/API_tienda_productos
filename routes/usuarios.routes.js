const express = require("express");
const router = express.Router();

const {
  buscarTodos,
  buscarPorId,
  buscarPorMail,
  crearUsuario,
  modificarUsuario,
  borrarUsuario,
  login,
} = require("../controllers/usuarios.controller");

const {
  middlwareCrearUsuario,
  middlwareModificarUsuario,
  middlewareEmailValido,
  estaLoggeado,
  esAdmin,
  esEmailDuplicado,
} = require("../middlwares/usuario.middlwares");

router.get("/", async (req, res) => {
  try {
    if (req.query.email) {
      usuario = await buscarPorMail(req.query.email);
    } else {
      usuario = await buscarTodos();
    }
    res.json(usuario);
  } catch (error) {
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

router.post(
  "/",
  middlwareCrearUsuario,
  middlewareEmailValido,
  esEmailDuplicado,
  async (req, res) => {
    try {
      await crearUsuario(req.body.email.trim(), req.body.password, req.body.rol);
      res.json({ msg: "usuario creado" });
    } catch (error) {
      res.status(500).json({ msg: "error interno del servidor" });
    }
  }
);

router.put(
  "/:id",
  middlwareModificarUsuario,
  middlewareEmailValido,
  async (req, res) => {
    try {
      await modificarUsuario(req.params.id, req.body);
      res.status(400).json({ msg: "usuario modificado" });
    } catch (error) {
      res.status(500).json({ msg: "error interno del servidor" });
    }
  }
);

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

router.post("/login", async (req, res) => {
  try {
    const resultado = await login(req.body.email, req.body.password);
    res.json({ token: resultado.token, msg: resultado.msg });
  } catch {
    res.status(500).json({ msg: "error interno del servidor" });
  }
});

router.get("/zona-privada/perfil/:id", estaLoggeado, async (req, res) => {
  const usuarioEncontrado = await buscarPorId(req.params.id);
  res.json({
    msg:
      "estas dentro de tu perfil, token verificado" + usuarioEncontrado.email,
  });
});

/*
 *zona-admin/home es una ruta común para todos los administradores, le damos esa funcionalidad, al igual que podríamos hacer cuna zona privada como con los user.
 */
router.get("/zona-admin/home", esAdmin, async (req, res) => {
  res.json({
    msg: "hola admin, estas dentro de tu perfil, token verificado",
  });
});

module.exports = router;
