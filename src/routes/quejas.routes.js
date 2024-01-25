import Router from 'express';
import { validarLogin, validarModerador } from '../middlewares/usuarios.middlewares.js';
import { listarQuejas, createQueja, deleteQueja } from '../controllers/quejas.controller.js';

const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


router.get('/', [validarLogin, validarModerador], listarQuejas);
router.post('/crear', [validarLogin], createQueja);
router.post('/eliminar/:id', [validarLogin, validarModerador], deleteQueja);


export {
    router
}