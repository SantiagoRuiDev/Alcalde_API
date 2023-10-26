import Router from 'express';
import { uploadImage } from '../libs/image.js';
import { listarArticulos, verArticulo, crearArticulo, eliminarArticulo } from '../controllers/articulos.controller.js';
import { validarLogin, validarBan, validarAdmin, validarEscritor } from '../middlewares/usuarios.middlewares.js';

const router = Router();


// Definimos rutuas y middles.
router.get('/', listarArticulos);
router.get('/:id', validarLogin, verArticulo);
router.post('/crear', [validarBan, validarLogin, validarEscritor], uploadImage('image'), crearArticulo);
router.post('/eliminar/:id', [validarBan, validarLogin, validarAdmin], eliminarArticulo);

export {
    router
}