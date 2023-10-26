import * as forosModel from '../models/foros.model.js';
import debug from 'debug';

const printMessage = debug('app:foros-controller');


export const createForo = async (req, res) => {
    try {
        const { titulo } = req.body;
        const data = { titulo: titulo, id_usuario: req.id };
        const foro = await forosModel.createForo(data);
    
        if(foro > 0) return res.status(201).json({"message": "Creaste un nuevo foro"});

        res.status(201).json({"message": "No se pudo crear un nuevo foro"});
    } catch (error) {
        printMessage(error);
    }
}


export const listarForos = async (req, res) => {
    try {
        const foros = await forosModel.listarForos();
    
        return res.status(200).json(foros);
    } catch (error) {
        printMessage(error);
    }
}

export const listarForo = async (req, res) => {
    try {
        const foros = await forosModel.listarForo(req.params.id);
    
        return res.status(200).json(foros);
    } catch (error) {
        printMessage(error);
    }
}


export const createMensaje = async (req, res) => {
    try {
        let data;
        if(Array.isArray(req.body.mensaje)) {
            req.body.mensaje.reverse();
            data = { id_usuario: req.id, id_foro: req.params.id, mensaje: req.body.mensaje[0], imagen: req.imageUrl };
        }else {
            data = { id_usuario: req.id, id_foro: req.params.id, mensaje: req.body.mensaje, imagen: req.imageUrl };
        }
        const newMensaje = await forosModel.createMensaje(data);
    
        if(newMensaje > 0) return res.status(200).json({"message": "Mensaje creado correctamente"});

        return res.status(400).json({"message": "No se pudo crear el mensaje"});
    } catch (error) {
        printMessage(error);
    }
}


export const deleteMensaje = async (req, res) => {
    try {
        const data = { id: req.params.id };
        const deleted = await forosModel.deleteMensaje(data);
    
        if(deleted > 0) return res.status(200).json({"message": "Mensaje eliminado correctamente"});

        return res.status(400).json({"message": "No se pudo crear el mensaje"});
    } catch (error) {
        printMessage(error);
    }
}


export const eliminarForo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedForo = await forosModel.eliminarForo(id);
    
        if(deletedForo > 0) return res.status(200).json({"message": "Foro eliminado correctamente"});

        return res.status(400).json({"message": "No se pudo eliminar el foro"});
    } catch (error) {
        printMessage(error);
    }
}


export const createRegla = async (req, res) => {
    try {
        const { nombre, contenido } = req.body;

        const data = { nombre, contenido };
        const newRegla = await forosModel.crearRegla(data);

        return (newRegla > 0) ? res.status(200).json({"message": "Regla creada correctamente"}) 
                              : res.status(400).json({"message": "No se pudo crear la regla"});
    } catch (error) {
        printMessage(error);
    }
}


export const deleteRegla = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await forosModel.eliminarRegla(id);

        return (deleted > 0) ? res.status(200).json({"message": "Regla eliminada correctamente"}) 
                              : res.status(400).json({"message": "No se pudo eliminada la regla"});
    } catch (error) {
        printMessage(error);
    }
}


export const getReglas = async (req, res) => {
    try {
        console.log(1)
        const reglas = await forosModel.getReglas();
        return res.status(200).json(reglas)
    } catch (error) {
        printMessage(error);
    }
}