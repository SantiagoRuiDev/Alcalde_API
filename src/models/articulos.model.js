import { connectDatabase } from '../database/db.js';


export const listarArticulos = async () => {
    const connection = await connectDatabase();
    const [result] = await connection.query('SELECT * FROM articulos');

    connection.end();
    return result;
}

export const verArticulo = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query('SELECT * FROM articulos WHERE id = ?', [id]);

    connection.end();
    return result;
}

export const buscarArticulo = async (cc) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM articulos WHERE titulo LIKE ?" ,[`%${cc}%`]);

    connection.end();
    return result;
}


export const crearArticulo = async (data) => {
    const connection = await connectDatabase();
    // crear fecha YYYY-MM-DD
    const fecha = new Date().toISOString().slice(0, 10);
    const [result] = await connection.query('INSERT INTO articulos(id_usuario, titulo, subtitulo, contenido, fecha, portada) VALUES  (?, ?, ?, ?, ?, ?)', [data.id_usuario, data.titulo, data.subtitulo, data.contenido, fecha, data.portada]);

    connection.end();
    return result.affectedRows;
}


export const eliminarArticulo = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query('DELETE FROM articulos WHERE id = ?', [id]);

    connection.end();
    return result.affectedRows;
}