import * as versusModel from '../models/versus.model.js';
import debug from 'debug';

const printMessage = debug('app:versus-controller');


export const createVersus = async (req, res) => {
    try {
        const formData = req.body;

        // Crear un objeto asociativo a partir de formData
        const formDataObject = {};

        for (const [key, value] of Object.entries(formData)) {
        formDataObject[key] = value;
        }

        const resenas = JSON.parse(formDataObject.resenas);
        const data = {
            imagen: req.imageUrl,
            coche1: resenas[0],
            coche2: resenas[1]
        }

        const newVersus = await versusModel.createVersus(data);
        printMessage('Versus creado correctamente');
        if(newVersus > 0) return res.status(200).json({"message": "Versus creado correctamente"});

        return res.status(403).json({"error": "Error al crear el versus"})
    } catch (error) {
        printMessage(error);
    }
} 


export const getVersus = async (req, res) => {
    try {
        const foundVersus = await versusModel.getVersus();
        printMessage('Versus obtenidos correctamente');
        return res.status(200).json(foundVersus);
    } catch (error) {
        printMessage(error);
    }
}

export const getVersusById = async (req, res) => {
    try {
        const foundVersus = await versusModel.getVersusById(req.params.id);
        printMessage('Versus obtenido correctamente');
        return res.status(200).json(foundVersus);
    } catch (error) {
        printMessage(error);
    }
}

