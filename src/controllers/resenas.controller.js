import * as resenasModel from '../models/resenas.model.js';
import * as calificacionesModel from '../models/calificaciones.model.js';
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
    printMessage("Se intento acceder a una reseña exitosamente");
    if(resena.length > 0) return res.status(200).json({resena: resena, calif: calificaciones});
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

    // Crear un objeto asociativo a partir de formData
    const formDataObject = {};

    for (const [key, value] of Object.entries(formData)) {
    formDataObject[key] = value;
    }

    const data = {
        id_usuario: decoded.id,
        modelo: formDataObject.modelo,
        titulo: formDataObject.titulo,
        descripcion: formDataObject.descripcion,
        marca: formDataObject.marca,
        ano: formDataObject.ano,
        hp: formDataObject.hp,
        puertas: formDataObject.puertas,
        combustible: formDataObject.combustible,
        transmision: formDataObject.transmision,
        motor: formDataObject.motor,
        imagen: req.imageUrl
    }

    try {
        const newResena = await resenasModel.createResena(data);
        printMessage("Se intento crear una reseña exitosamente");
        if(newResena > 0) return res.status(201).json({"message": "Reseña creada exitosamente"});
        return res.status(400).json({"error": "No se pudo crear la reseña"});
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