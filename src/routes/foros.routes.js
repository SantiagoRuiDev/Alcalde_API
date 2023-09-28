import Router from 'express';
import { createForo, createMensaje, listarForo, listarForos, eliminarForo } from "../controllers/foros.controller.js";
import { validarLogin, validarAdmin } from "../middlewares/usuarios.middlewares.js";

const router = Router();

router.get('/', validarLogin, listarForos);
router.get('/:id', validarLogin, listarForo);
router.post('/crear', validarLogin, createForo);
router.post('/crear/mensaje/:id', validarLogin, createMensaje);
router.post('/eliminar/:id', validarLogin, validarAdmin, eliminarForo);

export {
    router
}