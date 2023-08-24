// Dependencias.

import express from 'express'; // NodeJS framework.
import debug from 'debug'; // Para enviar mensajes detallados en consola.
import cors from 'cors';

import * as config from './libs/config.js';
import './libs/superadmin.js'; // Esto es para crear al superadmin.

// Importamos las rutas
import { router as usuariosRouter } from './routes/usuarios.routes.js';
import { router as reportesRouter } from './routes/reportes.routes.js';
import { router as strikesRouter } from './routes/strikes.routes.js';

// Llamamos dependencias aqui arriba.

// Declaramos y llamamos a funciones de las dependencias.
const printMessage = debug('app:servidor');
const app = express();

// Usamos el express json para poder transformar los datos que nos llegan a json.
app.use(express.json());
app.use(cors()); // Cors para evitar que se bloquee el acceso a la api.


// Creamos redirecciones.
app.use('/api/usuario', usuariosRouter);
app.use('/api/reportes', reportesRouter);
app.use('/api/strikes', strikesRouter);


// Listamos el servidor. En el puerto 3000 de nuestro http://localhost:{puerto}
app.listen(config.puerto, () => {
    printMessage("El servidor fue levantado correctamennte");
})