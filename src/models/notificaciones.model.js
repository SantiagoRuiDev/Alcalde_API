import { connectDatabase } from "../database/db.js";

export const getNotificaciones = async (id) => {
    const connection = await connectDatabase();
    const [notificaciones] = await connection.execute('SELECT * FROM notificaciones WHERE id_usuario = ?', [id]);

    connection.end();
    return notificaciones;
};

export const deleteNotificacion = async (id) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query('DELETE FROM notificaciones WHERE id = ?', [id]);

    connection.end();
    return deleted.affectedRows;
}

export const createNotificacion = async (id, mensaje) => {
    const connection = await connectDatabase();
    // crear fecha YYYY-MM-DD
    const fecha = new Date().toISOString().slice(0, 10);
    const [created] = await connection.query('INSERT INTO notificaciones (id_usuario, mensaje, fecha) VALUES (?, ?, ?)', [id, mensaje, fecha]);

    connection.end();
    return created.affectedRows;
}