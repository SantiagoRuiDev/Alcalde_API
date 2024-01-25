import Router from 'express';
import { strikeUsuario, quitarStrikeUsuario } from '../controllers/strikes.controller.js';
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


router.post('/sancionar/:id', [validarLogin, validarModerador], strikeUsuario)
router.post('/quitar/:id', [validarLogin, validarModerador], quitarStrikeUsuario)

export {
    router
}