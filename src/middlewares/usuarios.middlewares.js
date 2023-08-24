import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import { connectDatabase } from '../database/db.js';

import * as config from '../libs/config.js';

const secret_key = config.secret;

export const validarLogin = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token) return res.status(401).json({error: 'No se ha encontrado un token'});

    const decoded = jwt.verify(token, secret_key);
    
    const isExpired = decoded.exp < Math.trunc((Date.now() / 1000));

    if(isExpired) return res.status(404).json({error: 'El token ya ha expirado'});

    next();
}   

export const validarModerador = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, secret_key);

    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT rol FROM usuarios WHERE id = ?', [decoded.id]);

    if(result[0].rol == 'moderador' || result[0].rol == 'admin' || result[0].rol == 'superadmin')  return next();

    return res.json({error: 'No tienes permisos para realizar esta acción'});
};

export const validarAdmin = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, secret_key);

    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT rol FROM usuarios WHERE id = ?', [decoded.id]);

    if(result[0].rol == 'superadmin' || result[0].rol == 'admin')  return next();

    return res.json({error: 'No tienes permisos para realizar esta acción'});
};


export const validarSuperAdmin = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, secret_key);

    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT rol FROM usuarios WHERE id = ?', [decoded.id]);

    if(result[0].rol == 'superadmin')  return next();

    return res.json({error: 'No tienes permisos para realizar esta acción'});
};


export const validarBan = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, secret_key);

    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT ban FROM usuarios WHERE id = ?', [decoded.id]);

    if(result[0].ban == 0) return next();

    return res.json({error: 'Tu cuenta ha sido baneada'});
}

export const usuarioAdministrador = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, secret_key);

    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT rol FROM usuarios WHERE id = ?', [decoded.id]);

    if(result[0].rol=='admin' || result[0].rol=='superadmin') return res.json({admin: true});

    return res.json({admin: false});
}