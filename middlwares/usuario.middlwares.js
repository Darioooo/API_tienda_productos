const {
  validarCrearUsuario,
  validarModificarUsuario,
  validarCambioContrasenia,
} = require("../helpers/usuarios.validator");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  buscarPorId,
  buscarPorMail,
} = require("../controllers/usuarios.controller");

/* Se confirma la validación de creación de usuario */
function middlwareCrearUsuario(req, res, next) {
  const resultadoValidacion = validarCrearUsuario(req.body);
  try {
    if (resultadoValidacion.valido) {
      next();
    } else {
      res.status(400).json({ msg: resultadoValidacion.mensaje });
    }
  } catch (error) {
    res.status(500).json({ msg: "problema interno del servidor" });
  }
}

/* Se confirma la validación de modificación de usuario */
function middlwareModificarUsuario(req, res, next) {
  const resultadoValidacion = validarModificarUsuario(req.body);
  try {
    if (resultadoValidacion.valido) {
      next();
    } else {
      res.status(400).json({ msg: resultadoValidacion.mensaje });
    }
  } catch (error) {
    res.status(500).json({ msg: "problema interno del servidor" });
  }
}

/* Se confirma que el email al menos tiene un "@" (habría que completar con una expresión regular) */
function middlewareEmailValido(req, res, next) {
  try{
    if (req.body.email.includes("@")) {
      next();
    } else {
      res.status(400).json({ msg: "el formato de email no es valido" });
    };
  }catch (error){
    res.status(500).json({msg: "problema interno del servidor"});
  }
}

/* Se confirma que esta loggeado (al usuario le corresponde el token aportado)*/
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

/* Se confirma que esta loggeado (al usuario le corresponde el token aportado) y tiene rol "admin" */
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

/* Mandamos al controlador el email que se intenta registrar para confirmar si existe ya o no, pues no se puede repetir */
async function esEmailDuplicado(req, res, next) {
  const usuarioMismoMail = await buscarPorMail(req.body.email);
  if (usuarioMismoMail) {
    res.status(400).json({ msg: "email duplicado" });
  } else {
    next();
  }
}

/* 
* Busqueda del usuario por id, asi obtenemos el hash de pwd (contraseña encriptada) de la base de datos.
* Mandamos ese dato 'hash' al validador.
* Si resultadoValidacion.valido = true, aceptamos el cambio de contraseña.
*/
async function middleWareContraseniaVerificadaYCambioContrasenia(req, res, next){
  const usuarioEncontrado = await buscarPorId(req.params.id);
  console.log(usuarioEncontrado.password);                             
  const resultadoValidacion = await validarCambioContrasenia(req.body, usuarioEncontrado.password);   
  if (resultadoValidacion.valido) {
    next();
  } else {
    res.status(400).json({ msg: resultadoValidacion.mensaje });
  }
}  


module.exports = {
  middlwareCrearUsuario,
  middlwareModificarUsuario,
  middlewareEmailValido,
  estaLoggeado,
  esAdmin,
  esEmailDuplicado,
  middleWareContraseniaVerificadaYCambioContrasenia,
};
