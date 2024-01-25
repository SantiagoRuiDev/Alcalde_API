import Router from 'express';
import { getCalificacionById, getCalificaciones, createCalificacion } from "../controllers/calificaciones.controller.js";
import { validarLogin, validarBan } from "../middlewares/usuarios.middlewares.js";

const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


router.get('/', validarLogin, getCalificaciones);
router.get('/:id', validarLogin, getCalificacionById);
router.post('/', validarLogin, validarBan, createCalificacion);

export {
    router
}