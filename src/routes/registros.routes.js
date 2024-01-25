import Router from 'express';
import { getRegistros } from '../controllers/registros.controller.js';
import { validarLogin, validarModerador } from '../middlewares/usuarios.middlewares.js';

const router = Router();

// Definimos endpoints.

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


router.get('/', [validarLogin, validarModerador], getRegistros)

export {
    router
}