import { connectDatabase } from '../database/db.js';


export const listarArticulos = async () => {
    const connection = await connectDatabase();
    const [result] = await connection.query('SELECT a.*, ai.image1,ai.image2,ai.image3,ai.image4,ai.portada FROM articulos AS a INNER JOIN articulos_images AS ai ON ai.id_articulo = a.id');

    return result;
}

export const verArticulo = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query('SELECT a.*, ai.image1,ai.image2,ai.image3,ai.image4,ai.portada FROM articulos AS a INNER JOIN articulos_images AS ai ON ai.id_articulo = a.id WHERE ai.id_articulo = ?', [id]);

    return result;
}


export const crearArticulo = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query('INSERT INTO articulos(id_usuario, titulo, subtitulo, descripcion) VALUES  (?, ?, ?, ?)', [data.id_usuario, data.titulo, data.subtitulo, data.descripcion]);

    const [images] = await connection.query('INSERT INTO articulos_images(id_articulo, portada, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?)', [result.insertId, data.images.portada, data.images.image1, data.images.image2, data.images.image3, data.images.image4]);


    return images.affectedRows;
}


export const eliminarArticulo = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query('DELETE FROM articulos WHERE id = ?', [id]);

    return result.affectedRows;
}