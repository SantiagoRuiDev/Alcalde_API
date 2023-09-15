import { connectDatabase } from "../database/db.js";

export const listarQuejas = async () => {
    const connection = await connectDatabase();
    const [result] = await connection.execute('SELECT * FROM quejas');
    return result;
}

export const createQueja = async (data) => {
    const connection = await connectDatabase();
    const query = 'INSERT INTO quejas (usuario_id, mensaje) VALUES (?, ?)'; 
    const [result] = await connection.execute(query, [data.usuario_id, data.mensaje]);

    return result;
}

export const deleteQueja = async (id) => {
    const connection = await connectDatabase();
    const query = 'DELETE FROM quejas WHERE id = ?';
    const [result] = await connection.execute(query, [id]);

    return result.affectedRows;
}