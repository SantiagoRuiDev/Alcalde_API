import { connectDatabase } from "../database/db.js";


export const createForo = async (data) => {
    const connection = await connectDatabase();
    const [newForo] = await connection.query('INSERT INTO foros(id_usuario, titulo) VALUES (?, ?)', [data.id_usuario, data.titulo]);

    return newForo.affectedRows;
}

export const listarForos = async () => {
    const connection = await connectDatabase();
    const [foros] = await connection.query('SELECT f.id AS foro_id, u.id AS autor_id, u.nombre AS autor_nombre, f.titulo AS foro_titulo FROM foros AS f INNER JOIN usuarios AS u ON u.id = f.id_usuario');

    return foros;
}


export const listarForo = async (id) => {
    const connection = await connectDatabase();
    const [messages] = await connection.query('SELECT m.id,u.nombre,m.mensaje,m.id_usuario FROM mensajes AS m INNER JOIN usuarios AS u ON u.id = m.id_usuario  WHERE id_foro = ?', [id]);

    return messages;
}

export const createMensaje = async (data) => {
    const connection = await connectDatabase();
    const [newMessage] = await connection.query('INSERT INTO mensajes(id_usuario, id_foro, mensaje) VALUES (?, ?, ?)', [data.id_usuario, data.id_foro, data.mensaje]);

    return newMessage.affectedRows;
}


export const eliminarForo = async (id) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM foros WHERE id = ?', [id]);

    return deleted.affectedRows;
}