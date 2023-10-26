import Router from 'express';
import { uploadImageChat } from '../libs/imageMessages.js';
import { createForo, createMensaje, listarForo, listarForos, eliminarForo, deleteMensaje, createRegla, deleteRegla, getReglas } from "../controllers/foros.controller.js";
import { validarAdmin, validarLogin, validarModerador } from "../middlewares/usuarios.middlewares.js";

const router = Router();

router.get('/', validarLogin, listarForos);
router.get('/regla', validarLogin, getReglas);
router.get('/:id', validarLogin, listarForo);
router.post('/crear', validarLogin, createForo);
router.post('/crear/mensaje/:id', validarLogin, uploadImageChat('imagen'), createMensaje);
router.post('/delete/mensaje/:id', validarLogin, validarModerador, deleteMensaje);
router.post('/eliminar/:id', validarLogin, validarModerador, eliminarForo);
router.post('/regla/crear', validarLogin, validarAdmin, createRegla);
router.post('/regla/eliminar/:id', validarLogin, validarAdmin, deleteRegla);



export {
    router
}