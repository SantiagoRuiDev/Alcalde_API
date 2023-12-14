import Router from 'express';
import { uploadImage } from '../libs/image.js';
import { getResenas, getResenaById, createResena, deleteResena, searchResena, getResenaInfoById, addImageResena, createComentarioResena } from '../controllers/resenas.controller.js';
import { validarLogin, validarAdmin, validarBan } from '../middlewares/usuarios.middlewares.js';


const router = Router();

router.get('/', getResenas);
router.get('/:id', getResenaById);
router.get('/info/:id', getResenaInfoById);
router.get('/buscar/:search', searchResena);
router.post('/comentario/:id', validarLogin, validarBan, createComentarioResena);
router.post('/crear', validarLogin, validarBan, uploadImage('image'), createResena);
router.post('/add/image/:id', validarLogin, validarBan,  uploadImage('image'), addImageResena);
router.post('/eliminar/:id', [validarLogin, validarAdmin], deleteResena);

export {
    router
};