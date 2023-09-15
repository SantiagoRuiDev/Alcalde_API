import * as listasModel from '../models/listas.model.js';


export const createLista = async (req, res) => {
    const formData = req.body;

    // Crear un objeto asociativo a partir de formData
    const formDataObject = {};

    for (const [key, value] of Object.entries(formData)) {
    formDataObject[key] = value;
    }

    const data = {
        titulo: formDataObject.titulo,
        subtitulo: formDataObject.subtitulo,
        imagen: req.imageUrl,
        resenas: JSON.parse(formDataObject.resenas)
    }

    const newLista = await listasModel.createLista(data);

    if(newLista > 0) return res.status(200).json({"message": "Lista creada correctamente"});

    return res.status(403).json({"error": "Error al crear la lista"})
} 


export const getListaById = async (req, res) => {
    const {id} = req.params;
    const lista = await listasModel.getListaById(id);

    return res.status(200).json(lista);
}

export const getListas = async (req, res) => {
    const listas = await listasModel.getListas();

    return res.status(200).json(listas);
}

export const deleteListaById = async (req, res) => {
    const {id} = req.params;
    const deleted = await listasModel.deleteListaById(id);

    if(deleted > 0) return res.status(200).json({"message": "Lista eliminada correctamente"});
}