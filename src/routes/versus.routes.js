import Router from 'express';
import { createVersus, getVersus, getVersusById, getVotoById, votarVersus, actualizarVoto } from '../controllers/versus.controller.js';
import { validarAdmin, validarLogin, validarSesion } from '../middlewares/usuarios.middlewares.js';
import { uploadImage } from '../libs/image.js';

const router = Router();

router.get('/', validarLogin, getVersus);
router.get('/:id', validarLogin, getVersusById);
router.post('/crear/', validarLogin, uploadImage('image'), createVersus);
router.post('/votar/:id', validarLogin, votarVersus);
router.get('/voto/:id', validarLogin, getVotoById);
router.post('/actualizar/:id', validarLogin, actualizarVoto);

export {
    router
}
