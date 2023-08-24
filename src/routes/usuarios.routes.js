import Router from 'express';
import { getUsuarios, createUsuario, loginUsuario, banUsuario, pardonUsuario, deleteUsuario, ascenderUsuario, degradarUsuario, getUsuarioByID} from '../controllers/usuarios.controller.js';
import { validarLogin, validarAdmin, validarModerador, usuarioAdministrador } from '../middlewares/usuarios.middlewares.js';


const router = Router();

router.get('/', [validarLogin, validarModerador], getUsuarios);
router.get('/:id', [validarLogin, validarModerador], getUsuarioByID);
router.post('/admin', validarLogin, usuarioAdministrador);
router.post('/create', createUsuario);
router.post('/login', loginUsuario);
router.post('/ban/:id', [validarLogin, validarModerador], banUsuario);
router.post('/pardon/:id', [validarLogin, validarModerador], pardonUsuario);
router.post('/delete/:id', [validarLogin, validarAdmin], deleteUsuario);
router.post('/ascender/:id', [validarLogin, validarAdmin], ascenderUsuario);
router.post('/degradar/:id', [validarLogin, validarAdmin], degradarUsuario);



export {
    router
}
