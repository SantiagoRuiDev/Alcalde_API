import Router from 'express';
import { uploadImage } from '../libs/image.js';
import { listarArticulos, verArticulo, crearArticulo, eliminarArticulo } from '../controllers/articulos.controller.js';
import { validarLogin, validarBan, validarAdmin } from '../middlewares/usuarios.middlewares.js';

const router = Router();


// Definimos rutuas y middles.
router.get('/', validarLogin, listarArticulos);
router.get('/:id', validarLogin, verArticulo);
router.post('/crear', [validarBan, validarLogin], uploadImage('image'), crearArticulo);
router.post('/eliminar/:id', [validarBan, validarLogin, validarAdmin], eliminarArticulo);

export {
    router
}