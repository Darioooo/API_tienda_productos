const {
  validarCrearUsuario,
  validarModificarUsuario,
} = require("../helpers/usuarios.validator");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  buscarPorId,
  buscarPorMail,
} = require("../controllers/usuarios.controller");

function middlwareCrearUsuario(req, res, next) {
  const resultadoValidacion = validarCrearUsuario(req.body);
  if (resultadoValidacion.valido) {
    next();
  } else {
    res.status(400).json({ msg: resultadoValidacion.mensaje });
  }
}

function middlwareModificarUsuario(req, res, next) {
  const resultadoValidacion = validarModificarUsuario(req.body);
  if (resultadoValidacion.valido) {
    next();
  } else {
    res.status(400).json({ msg: resultadoValidacion.mensaje });
  }
}

function middlewareEmailValido(req, res, next) {
  if (req.body.email.includes("@")) {
    next();
  } else {
    res.status(400).json({ msg: "el formato de email no es valido" });
  }
}

function estaLoggeado(req, res, next) {
  if (req.query.token) {
    try {
      const resultado = jwt.verify(req.query.token, process.env.JWTSECRET);
      if (resultado.id === req.params.id) {
        next();
      } else {
        res
          .status(403)
          .res.json({ msg: "no tienes permiso para acceder a este recurso" });
      }
    } catch {
      res.status(401).json({ msg: "token de loggeo no valido" });
    }
  } else {
    res.status(400).json({ msg: "no has proporcionado tokken" });
  }
}

async function esAdmin(req, res, next) {
  if (req.query.token) {
    try {
      const resultado = jwt.verify(req.query.token, process.env.JWTSECRET);
      const usuarioEncontrado = await buscarPorId(resultado.id);
      if (usuarioEncontrado.rol === "admin") {
        next();
      } else {
        res
          .status(403)
          .res.json({ msg: "no tienes permiso para acceder a este recurso" });
      }
    } catch {
      res.status(401).json({ msg: "token de admin no valido" });
    }
  } else {
    res.status(400).json({ msg: "admin, no has proporcionado tokken" });
  }
}

async function esEmailDuplicado(req, res, next) {
  const usuarioMismoMail = await buscarPorMail(req.body.email);
  if (usuarioMismoMail) {
    res.status(400).json({ msg: "email duplicado" });
  } else {
    next();
  }
}

module.exports = {
  middlwareCrearUsuario,
  middlwareModificarUsuario,
  middlewareEmailValido,
  estaLoggeado,
  esAdmin,
  esEmailDuplicado,
};
