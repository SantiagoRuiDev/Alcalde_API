import * as calificacionesModel from '../models/calificaciones.model.js';
import Debug from 'debug';
const printMessage = Debug('app:calificaciones-controller');


export const getCalificaciones = async (req, res) => {
    try {
        const calificaciones = await calificacionesModel.getCalificaciones();
        printMessage('Se accedio a las calificaciones');
        return res.status(200).json(calificaciones);
    } catch (error) {
        printMessage(error);
    }
};

export const getCalificacionById = async (req, res) => {
    try {
        const calificacion = await calificacionesModel.getCalificacionById(req.params.id);
        printMessage('Se accedio a una calificacion');
        return res.status(200).json(calificacion);
    } catch (error) {
        printMessage(error);
    }
};



export const createCalificacion = async (req, res) => {
    try {
        const data = {
            id_usuario: req.id,
            id_resena: req.body.id_resena,
            calificacion: req.body.calificacion
        }

        const newCalificacion = await calificacionesModel.createCalificacion(data);
        printMessage('Se accedio a una calificacion');

        if(newCalificacion > 0) return res.status(201).json({message: 'Calificacion creada correctamente'});

        return res.status(400).json({error: 'Sucedio un error al crear la calificacion'});
    } catch (error) {
        printMessage(error);
    }
};