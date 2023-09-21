import Router from 'express';
import { uploadImage } from '../libs/image.js';
import { getResenas, getResenaById, createResena, deleteResena, searchResena, getResenaInfoById } from '../controllers/resenas.controller.js';
import { validarLogin, validarAdmin } from '../middlewares/usuarios.middlewares.js';


const router = Router();

router.get('/', validarLogin, getResenas);
router.get('/:id', validarLogin, getResenaById);
router.get('/info/:id', validarLogin, getResenaInfoById);
router.get('/buscar/:search', validarLogin, searchResena);
router.post('/crear', validarLogin, uploadImage('image'), createResena);
router.post('/eliminar/:id', [validarLogin, validarAdmin], deleteResena);

export {
    router
};