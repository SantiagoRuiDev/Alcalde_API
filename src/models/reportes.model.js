import mysql from 'mysql2/promise';
import { connectDatabase } from '../database/db.js';

export const getReportes = async () => {
    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT * FROM reportes');
    return result;
}


export const createReporte = async (data) => {
    const connection = await connectDatabase();
    const query = 'INSERT INTO reportes(id_usuario, id_foro, id_articulo, id_resena, id_reportante) VALUES (?, ?, ?, ?, ?)';
    const [result] = await connection.execute(query, [data.id_usuario, data.id_foro, data.id_articulo, data.id_resena, data.id_reportante]);

    return result;
}


export const deleteReporte = async (id) => {
    const connection = await connectDatabase();
    const query = 'DELETE FROM reportes WHERE id = ?';
    const [result] = await connection.execute(query, [id]);

    return result.affectedRows;
}