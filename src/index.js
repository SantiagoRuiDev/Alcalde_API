// Dependencias.

import express from 'express'; // NodeJS framework.
import debug from 'debug'; // Para enviar mensajes detallados en consola.
import cors from 'cors';

import * as config from './libs/config.js';
import './libs/superadmin.js'; // Esto es para crear al superadmin.

// Importamos las rutas
import { router as usuariosRouter } from './routes/usuarios.routes.js';
import { router as reportesRouter } from './routes/reportes.routes.js';
import { router as versusRouter } from './routes/versus.routes.js';
import { router as strikesRouter } from './routes/strikes.routes.js';
import { router as quejasRouter } from './routes/quejas.routes.js';
import { router as articulosRouter } from './routes/articulos.routes.js';
import { router as resenasRouter } from './routes/resenas.routes.js';
import { router as calificacionesRouter } from './routes/calificaciones.routes.js';
import { router as listasRouter } from './routes/listas.routes.js';

// Llamamos dependencias aqui arriba.

// Declaramos y llamamos a funciones de las dependencias.
const printMessage = debug('app:servidor');
const app = express();

// Usamos el express json para poder transformar los datos que nos llegan a json.
app.use(express.json());
app.use(cors()); // Cors para evitar que se bloquee el acceso a la api.
app.use('/images', express.static('images')); // Con este ruteo podemos acceder a las imagenes alojadas en el server.

// Creamos redirecciones.
app.use('/api/usuario', usuariosRouter);
app.use('/api/reportes', reportesRouter);
app.use('/api/calificaciones', calificacionesRouter);
app.use('/api/strikes', strikesRouter);
app.use('/api/quejas', quejasRouter);
app.use('/api/articulos', articulosRouter);
app.use('/api/resenas', resenasRouter);
app.use('/api/listas', listasRouter);
app.use('/api/versus', versusRouter);


// Listamos el servidor. En el puerto 3000 de nuestro http://localhost:{puerto}
app.listen(config.puerto, () => {
    printMessage("El servidor fue levantado correctamennte");
})