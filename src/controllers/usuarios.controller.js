import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
const printMessage = debug('app:usuarios-controller');

import * as config from '../libs/config.js';

const secret_key = config.secret;

import * as usuarioModel from '../models/usuarios.model.js';
// Definimos funciones.

// Con esta funcion vemos todos los usuarios existentes.
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.getUsuarios();
        printMessage('Accedio a la ruta de usuarios');
        return res.json(usuarios);
    } catch (error) {
        printMessage(error);
    }
}

export const getUsuarioByID = async (req, res) => {
    try{
        const { id } = req.params;
        const usuario = await usuarioModel.getUsuarioByID(id);
        printMessage('Accedio a los datos de un usuario');
        return res.json(usuario);
    } catch(error){
        printMessage(error);
    }
}

// Esta funcion crea el usuario nuevo
export const createUsuario = async (req,res) => {
    try {
        const { nombre, correo, ciudad, contraseña } = req.body;

        const usuario = {nombre, correo, ciudad, contraseña}; // Destructuramos los datos que enviamos desde el frontend
    
        const result = await usuarioModel.createUsuario(usuario); // Llamamos el modelo a crear
    
        if(result.affectedRows != 0) { // Si el resultado es indiferente a falso, devolvemos un token para autentificar.
            const firstLogin = await usuarioModel.loginUsuario(usuario); // Llamamos el modelo para logear.

            if(firstLogin[0].id === undefined) return res.status(404).json({error: 'Usuario no encontrado o credenciales incorrectas'}); // Si el resultado es indefinido, devolvemos error.

            const token = jwt.sign({id: firstLogin[0].id}, secret_key, {expiresIn: 86400});
                printMessage('Un usuario accedio correctamente a su cuenta');
                return res.json(token);// Si no, creamos un token  y lo retornamos
        };
        
        printMessage('Un usuario intento crear una cuenta que ya existe');
        return res.status(409).json({error: 'El usuario ya existe'}); // Si el resultado es falso devolvemos un error.    
    } catch (error) {
        printMessage(error);
    }
}

export const loginUsuario = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        const usuario = {correo, contraseña}; // Destructuramos correo y contraseña y lo guardamos en un objeto.
        
        const result = await usuarioModel.loginUsuario(usuario); // Llamamos el modelo para logear.

        if(result[0].id === undefined) return res.status(404).json({error: 'Usuario no encontrado o credenciales incorrectas'}); // Si el resultado es indefinido, devolvemos error.

        const token = jwt.sign({id: result[0].id}, secret_key, {expiresIn: 86400});
            printMessage('Un usuario accedio correctamente a su cuenta');
            return res.json(token);// Si no, creamos un token  y lo retornamos
    } catch (error) {
        printMessage(error);
    }
}


// Esta funcion banea al usuario.
export const banUsuario = async (req, res) => {
    try {
        const { id } = req.params; // Conseguimos la id desde los parametros.
        const result = await usuarioModel.banUsuario(id); // Llamamos al modelo que banea.
    
        if(result > 0) return res.status(200).json({success: 'Usuario baneado correctamente'});
    
        return res.status(404).json({error: 'Usuario no encontrado o baneado anteriormente'});
    } catch (error) {
        printMessage(error);
    }
}


// Esta funcion sirve para perdonar al usuario.
export const pardonUsuario = async (req, res) => {
    try {
        const { id } = req.params; // Destructuramos el id, a travez de los parametros en la url.
        const result = await usuarioModel.pardonUsuario(id);
    
        if(result > 0) return res.status(200).json({success: 'Usuario perdonado correctamente'}); // Si encuentra lineas afectadas, retorna success.
    
        return res.status(404).json({error: 'Usuario no encontrado o no baneado'}); // Si no, retorna un error.
    } catch (error) {
        printMessage(error);
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usuarioModel.deleteUsuario(id);
    
        if(result > 0) return res.status(200).json({success: 'Usuario eliminado correctamente'});
    
        return res.status(404).json({error: 'Usuario no encontrado'});
    } catch (error) {
        printMessage(error);
    }
}


export const ascenderUsuario = async(req, res) => {
    try{
        const { id } = req.params;
        const result = await usuarioModel.ascenderUsuario(id);

        if(result > 0) return res.status(200).json({success: 'Usuario ascendido correctamente'});

        return res.status(404).json({error: 'No se pudo ascender al usuario'});
    } catch (error){
        printMessage(error);
    }
}

export const degradarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usuarioModel.degradarUsuario(id);

        if(result > 0) return res.status(200).json({success: 'Usuario degradado correctamente'});

        return res.status(404).json({error: 'No se pudo degradar al usuario'});
    } catch (error) {
        printMessage(error);
    }
}