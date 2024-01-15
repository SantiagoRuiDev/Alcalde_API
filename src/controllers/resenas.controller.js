import * as resenasModel from '../models/resenas.model.js';
import * as calificacionesModel from '../models/calificaciones.model.js';
import * as subforoModel from '../models/subforo.model.js';
import * as config from "../libs/config.js";
import debug from 'debug';
import jwt from 'jsonwebtoken';
const printMessage = debug('app:resenasController');


export const getResenas = async (req, res) => {
    const resenas = await resenasModel.getResenas();
    printMessage("Se intento acceder a las reseñas exitosamente");
    if(resenas.length > 0) return res.status(200).json(resenas);
    return res.status(400).json({"error": "No hay reseñas"});
}

export const getResenaById = async (req, res) => {
    const resena = await resenasModel.getResenaById(req.params.id);
    const calificaciones = await calificacionesModel.getCalificacionByResena(req.params.id);
    const comentarios = await resenasModel.getComentariosResena(req.params.id);
    const motor = await resenasModel.getResenaMotor(req.params.id);
    const chasis = await resenasModel.getResenaChasis(req.params.id);
    const capacidades = await resenasModel.getResenaCapacidades(req.params.id);
    const entretenimiento = await resenasModel.getResenaEntretenimiento(req.params.id);
    const seguridad = await resenasModel.getResenaSeguridad(req.params.id);
    const confort = await resenasModel.getResenaConfort(req.params.id);
    const perfomance = await resenasModel.getResenaPerfomance(req.params.id);
    printMessage("Se intento acceder a una reseña exitosamente");
    if(resena.length > 0) return res.status(200).json({resena: resena, calif: calificaciones, comentarios: comentarios, motor: motor, chasis: chasis, capacidades: capacidades, entretenimiento: entretenimiento, seguridad: seguridad, confort: confort, perfomance: perfomance});
    return res.status(400).json({"error": "No existe la reseña"});
}

export const getResenaInfoById = async (req, res) => {
    const resena = await resenasModel.getResenaInfoById(req.params.id);
    printMessage("Se intento acceder a una reseña exitosamente");
    if(resena.length > 0) return res.status(200).json(resena);
    return res.status(400).json({"error": "No existe la reseña"});
}

export const createResena = async (req, res) => {

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);

    const formData = req.body;

    formData.resena.id_usuario = decoded.id;

    console.log(formData);
    try {
        // Crear reseña
        const newResena = await resenasModel.createResena(formData);
        printMessage("Se intento crear una reseña exitosamente");
        if(newResena.affectedRows > 0) {

            const newSubforoFallos = await subforoModel.createSubforo({resena: newResena.insertId, tipo: 0});
            const newSubforoDudas = await subforoModel.createSubforo({resena: newResena.insertId, tipo: 1});
            const newSubforoImagenes = await subforoModel.createSubforo({resena: newResena.insertId, tipo: 2});
            
            return res.status(201).json({"message": "Reseña creada exitosamente", id: newResena.insertId})
        };
        return res.status(400).json({"error": "No se pudo crear la reseña"});
    } catch (error) {
        printMessage(error);
    }

}


export const createComentarioResena = async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario } = req.body;

        const newComentario = await resenasModel.createComentarioResena({id_resena: id, id_usuario: req.id, mensaje: comentario});

        if(newComentario.affectedRows > 0) return res.status(201).json({"message": "Comentario creado exitosamente"});

        return res.status(400).json({"error": "No se pudo crear el comentario"});

    } catch (error) {
        printMessage(error);
    }
}

export const addImageResena = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await resenasModel.addImageResena(id, req.imageUrl);
        
        if(updated > 0) return res.status(200).json({"message": "Imagen agregada exitosamente"});
        return res.status(400).json({"error": "No se pudo agregar la imagen"});
    } catch (error) {
        printMessage(error);
    }
}


export const addPortadaResena = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await resenasModel.addPortadaResena(id, req.imageUrl);
        
        if(updated > 0) return res.status(200).json({"message": "Imagen agregada exitosamente"});
        return res.status(400).json({"error": "No se pudo agregar la imagen"});
    } catch (error) {
        printMessage(error);
    }
}



export const deleteResena = async (req, res) => {
    try {
        const deleted = await resenasModel.deleteResena(req.params.id);
        printMessage("Se intento eliminar una reseña exitosamente");
        if(deleted > 0) return res.status(200).json({"message": "Reseña eliminada exitosamente"});
        return res.status(400).json({"error": "No se pudo eliminar la reseña"});
    } catch (error) {
        printMessage(error);
    }
}


export const searchResena = async (req, res) => {
    try {
        const { search } = req.params;
        const resena = await resenasModel.searchResena(search);

        if(resena.length > 0) return res.status(200).json(resena);

        return res.status(403).json({"error": "No se encontro una reseña que cumpla esos parametros"});
    } catch (error) {
        printMessage(error);
    }
}