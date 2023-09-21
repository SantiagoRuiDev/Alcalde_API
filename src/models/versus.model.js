import { connectDatabase } from '../database/db.js';


export const createVersus = async (data) => {
    const connection = await connectDatabase();
    const [newVersus] = await connection.query("INSERT INTO versus(coche1_id,coche2_id,imagen) VALUES(?,?,?)", [data.coche1, data.coche2, data.imagen]);

    return newVersus.affectedRows;
}

export const getVersus = async () => {
    const connection = await connectDatabase();
    const [versus] = await connection.query("SELECT v.imagen, v.id AS versus_id, r1.titulo AS coche1_titulo, r2.titulo AS coche2_titulo FROM versus AS v INNER JOIN resena AS r1 ON v.coche1_id = r1.id INNER JOIN resena AS r2 ON v.coche2_id = r2.id;");

    return versus;
}

export const getVersusById = async (id) => {
    const connection = await connectDatabase();
    const [versus] = await connection.query("SELECT * FROM resena as r INNER JOIN versus as v ON ? = v.coche1_id OR ? = v.coche2_id;", [id, id]);

    return versus;
}