import mysql from 'mysql2/promise';
import { connectDatabase } from '../database/db.js';
import debug from 'debug';
import { encryptPassword } from './password.js';

import * as config from '../libs/config.js';

const printMessage = debug('app:super-admin')

const account = {
    nombre: config.nombre,
    correo: config.correo,
    ciudad: config.ciudad,
    rol: config.rol,
    contraseña: config.contraseña
} // Estos son los detalles para crear una cuenta super administradora.

const crearSuperAdmin = async() => {
    const connection = await connectDatabase();

    const [result] = await connection.execute('SELECT * FROM usuarios WHERE rol = ?', [account.rol]);

    if(result.length > 0) return;

    const hash = await encryptPassword(account.contraseña);
    const query = 'INSERT INTO usuarios (nombre, correo, ciudad, rol, contraseña) VALUES(?, ?, ?, ?, ?)';
    const [newSuperAdmin] = await connection.execute(query, [account.nombre, account.correo, account.ciudad, account.rol, hash]);

    return printMessage('Super Admin nuevo creado con éxito');
} // Esta funcion crea una cuenta super administradora si no registra cuentas super administradoras.

crearSuperAdmin();