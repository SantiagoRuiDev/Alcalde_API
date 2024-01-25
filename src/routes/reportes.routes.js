import Router from 'express';
import { createReporte, getReportes, deleteReporte } from '../controllers/reportes.controller.js';

import { validarModerador, validarLogin } from '../middlewares/usuarios.middlewares.js';

const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


router.get('/', validarModerador, getReportes);
router.post('/crear', validarLogin, createReporte);
router.post('/eliminar/:id', validarModerador, deleteReporte);


export {
    router
}