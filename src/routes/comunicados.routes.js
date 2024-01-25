import Router from 'express';
import { getComunicados, createComunicado } from "../controllers/comunicados.controller.js";
import { validarLogin, validarModerador, validarBan } from "../middlewares/usuarios.middlewares.js";

const router = Router();
router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


router.get('/', validarLogin, getComunicados);
router.post('/create', validarLogin, validarModerador, validarBan, createComunicado);

export {
    router
}