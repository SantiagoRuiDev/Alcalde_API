import { connectDatabase } from '../database/db.js';


export const getCalificaciones = async (req, res) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones");

    return result;
}


export const getCalificacionById = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones WHERE id_usuario = ?", [id]);

    return result;
}

export const getCalificacionByResena = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones WHERE id_resena = ?", [id]);

    return result;
}

export const createCalificacion = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones WHERE id_usuario = ? && id_resena = ?", [data.id_usuario, data.id_resena]);
    let update = [];

    if(result.length > 0){
        [update] = await connection.query("UPDATE calificaciones SET calificacion = ? WHERE id_usuario = ? && id_resena = ?", [data.calificacion,data.id_usuario, data.id_resena]);
    } else {
        [update] = await connection.query("INSERT INTO calificaciones (id_usuario, id_resena, calificacion) VALUES (?, ?, ?)", [data.id_usuario, data.id_resena, data.calificacion]);
    }

    if (update.affectedRows > 0){
        [update] = await connection.query("UPDATE resena SET calificaciones = (SELECT SUM(calificacion) as suma_calificacion FROM calificaciones GROUP BY id_resena HAVING id_resena = ?) WHERE id = ?", [data.id_resena, data.id_resena]);
    }

    return update.affectedRows;
}