const express = require("express");
const router = express.Router();

const {
  buscarTodos,
  buscarPorId,
  buscarPorMail,
  crearUsuario,
  modificarUsuario,
  modificarContrasenia,
  modificarDireccionYTlf,
  borrarUsuario,
  login,
} = require("../controllers/usuarios.controller");

const {
  middlwareCrearUsuario,
  middlwareModificarUsuario,
  middleWareContraseniaVerificadaYCambioContrasenia,
  middlWareCambioDireccionYTlf,
  middlewareEmailValido,
  estaLoggeado,
  esAdmin,
  esEmailDuplicado,
} = require("../middlwares/usuario.middlwares");

/* Podemos buscar todos los usuarios, o buscar un usuario en concreto mediante query cuando añadimos ?email:....@.... */
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

/* Ruta de busqueda de usuario por id */
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

/* Ruta de creación de usuario */
router.post(
  "/",
  middlwareCrearUsuario,
  middlewareEmailValido,
  esEmailDuplicado,
  async (req, res) => {
    try {
      await crearUsuario(
        req.body.name,
        req.body.lastname,
        req.body.email.trim(),
        req.body.password,
        req.body.rol,
        req.body.phone,
        req.body.state,
        req.body.city,
        req.body.street,
        req.body.number
      );
      res.json({ msg: "usuario creado" });
    } catch (error) {
      res.status(500).json({ msg: "error interno del servidor, route" });
    }
  }
);

/* Ruta de modificación de usuario. Será necesario rellenar todos los campos para hacerlo efectivo */
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

/* La ruta patch, en este caso, la utilizaremos para un supuesto caso de cambio de contraseña, en el que para modificar la contraseña, hay que escribir la anterior (password), y a mayores poner la misma contraseña dos veces en el body (body.nuevaPassword, repetirNuevaPassword).  */
router.patch(
  "/:id",
  middleWareContraseniaVerificadaYCambioContrasenia,
  async (req, res) => {
    try {
      await modificarContrasenia(req.params.id, req.body.nuevaPassword);
      res
        .status(400)
        .json({ msg: "la contraseña ha sido modificada con éxito" });
    } catch (error) {
      res.status(500).json({ msg: "error interno del servidor" });
      console.error(error);
    }
  }
);

/* Realizamos otro PATCH para el caso de que se quieran modificar alguno de los datos de envio como dirección y teléfono de contacto */
router.patch(
  "/datos_envio/:id",
  middlWareCambioDireccionYTlf,
  async (req, res) => {
    try {
      await modificarDireccionYTlf(req.params.id, req.body);
      res
        .status(400)
        .json({
          msg: "la dirección o teléfono han sido modificados con éxito",
        });
    } catch (error) {
      res.status(500).json({ msg: "error interno del servidor" });
      console.error(error);
    }
  }
);

/* Ruta de borrado de usuario por id */
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

/* Ruta con la que el usuario de loggea, se comprueba email y contraseña, y se le asigna un token temporal al usuario para ingresar sin necesidad de loggearse de nuevo */
router.post("/login", async (req, res) => {
  try {
    const resultado = await login(req.body.email, req.body.password);
    res.json({ token: resultado.token, msg: resultado.msg });
  } catch {
    res.status(500).json({ msg: "error interno del servidor" });
  }
});

/* Ruta de acceso a la zona privada del perfil de usuario, se comprueba que la cuenta tiene asignado token y éste es el que le corresponde */
router.get("/zona-privada/perfil/:id", estaLoggeado, async (req, res) => {
  const usuarioEncontrado = await buscarPorId(req.params.id);
  res.json({
    msg:
      "estas dentro de tu perfil, token verificado" + usuarioEncontrado.email,
  });
});

/* zona-admin/home es una ruta a una zona común para los que comparten el rol de administrador */
router.get("/zona-admin/home", esAdmin, async (req, res) => {
  res.json({
    msg: "hola admin, estas dentro de tu perfil, token verificado",
  });
});

module.exports = router;
