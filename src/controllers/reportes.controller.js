import * as reportesModel from '../models/reportes.model.js';
import debug from 'debug';

const printMessage = debug('app:reportes-controller');


export const getReportes = async (req, res) => {
    try {
        const reportes = await reportesModel.getReportes();
        printMessage("Se accedio a los reportes");
        return res.json(reportes);
    } catch (error) {
        printMessage(error.message);
    }
}

export const createReporte = async (req, res) => {
    try {
        const {id_usuario, id_foro, id_articulo, id_resena, id_reportante} = req.body;
        const data = {id_usuario, id_foro, id_articulo, id_resena, id_reportante};
        const reporte = await reportesModel.createReporte(data);
        
        if(reporte.affectedRows === 0) return res.json({error: "No se pudo ingresar un nuevo reporte"});

        printMessage("Se ingreso un nuevo reporte");
        return res.json({message: "Se ingreso un nuevo reporte"});
        
    } catch(error) {
        printMessage(error);
    }
}


export const deleteReporte = async (req, res) => {
    try {
        const {id} = req.params;
        const reporteEliminado = await reportesModel.deleteReporte(id);

        if(reporteEliminado === 0) return res.json({error: "No se pudo eliminar el reporte"});

        printMessage(`Se elimino el reporte: ${id}`);
        return res.json({message: "Se elimino el reporte"});
    } catch(error) {
        printMessage(error);
    }
}