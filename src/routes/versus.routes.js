import Router from 'express';
import { createVersus, getVersus, getVersusById } from '../controllers/versus.controller.js';
import { uploadImage } from '../libs/image.js';

const router = Router();

router.get('/', getVersus);
router.get('/:id', getVersusById);
router.post('/crear/', uploadImage('image'), createVersus);

export {
    router
}
