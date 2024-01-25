import Router from 'express';
import { getNotificaciones, deleteNotificacion } from '../controllers/notificaciones.controller.js';
import { validarAdmin, validarLogin, validarModerador } from "../middlewares/usuarios.middlewares.js";

const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


router.get('/', validarLogin, getNotificaciones);
router.post('/eliminar/:id', validarLogin, deleteNotificacion);



export {
    router
}