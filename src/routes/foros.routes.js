import Router from 'express';
import { uploadImageChat } from '../libs/imageMessages.js';
import { createForo, createMensaje, listarForo, listarForos, eliminarForo, deleteMensaje, createRegla, buscarForo, deleteRegla, getReglas, silenciarForo, agregarPalabra } from "../controllers/foros.controller.js";
import { validarAdmin, validarLogin, validarModerador } from "../middlewares/usuarios.middlewares.js";

const router = Router();

router.get('/', listarForos);
router.get('/regla', getReglas);
router.get('/:id', listarForo);
router.post('/crear', validarLogin, createForo);
router.post('/crear/mensaje/:id', validarLogin, uploadImageChat('imagen'), createMensaje);
router.post('/delete/mensaje/:id', validarLogin, validarModerador, deleteMensaje);
router.post('/eliminar/:id', validarLogin, validarModerador, eliminarForo);
router.post('/silenciar/:id', validarLogin, validarModerador, silenciarForo);
router.post('/regla/crear', validarLogin, validarAdmin, createRegla);
router.post('/regla/eliminar/:id', validarLogin, validarAdmin, deleteRegla);
router.post('/palabras', validarLogin, validarAdmin, agregarPalabra)
router.get('/buscar/:cc', validarLogin, buscarForo)



export {
    router
}