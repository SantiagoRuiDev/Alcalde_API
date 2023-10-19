import Router from 'express';
import { getComunicados, createComunicado } from "../controllers/comunicados.controller.js";
import { validarLogin, validarModerador } from "../middlewares/usuarios.middlewares.js";

const router = Router();

router.get('/', validarLogin, getComunicados);
router.post('/create', validarLogin, validarModerador, createComunicado);

export {
    router
}