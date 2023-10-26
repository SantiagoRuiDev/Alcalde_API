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

export const deleteMensaje = async (data) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM mensajes WHERE id = ?', [data.id]);

    return deleted.affectedRows;
}


export const listarForo = async (id) => {
    const connection = await connectDatabase();
    const [messages] = await connection.query('SELECT m.id,u.nombre,m.mensaje,m.id_usuario,m.imagen FROM mensajes AS m INNER JOIN usuarios AS u ON u.id = m.id_usuario  WHERE id_foro = ?', [id]);

    return messages;
}

export const createMensaje = async (data) => {
    const connection = await connectDatabase();
    const [newMessage] = await connection.query('INSERT INTO mensajes(id_usuario, id_foro, mensaje, imagen) VALUES (?, ?, ?, ?)', [data.id_usuario, data.id_foro, data.mensaje, data.imagen]);

    return newMessage.affectedRows;
}


export const eliminarForo = async (id) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM foros WHERE id = ?', [id]);

    return deleted.affectedRows;
}


export const crearRegla = async (data) => {
    const connection = await connectDatabase();
    const [newRegla] = await connection.query('INSERT INTO reglas(nombre, contenido) VALUES (?, ?)', [data.nombre, data.contenido]);

    return newRegla.affectedRows;
}


export const eliminarRegla = async (id) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM reglas WHERE id = ?', [id]);

    return deleted.affectedRows;
}

export const getReglas = async () => {
    const connection = await connectDatabase();
    const [rows] = await connection.query('SELECT * FROM reglas');
    return rows;
}