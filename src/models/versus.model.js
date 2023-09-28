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
    const [versus] = await connection.query("SELECT v.id AS versus_id, r1.id AS coche1_id, r2.id AS coche2_id, r1.calificaciones AS coche1_calificaciones, r2.calificaciones AS coche2_calificaciones, r1.imagen AS coche1_imagen, r2.imagen AS coche2_imagen, r1.titulo AS coche1_titulo, r2.titulo AS coche2_titulo FROM versus AS v INNER JOIN resena AS r1 ON v.coche1_id = r1.id INNER JOIN resena AS r2 ON v.coche2_id = r2.id WHERE v.id = ?;", [id]);

    return versus;
}

export const getVotoById = async (versus, id) => {
    const connection = await connectDatabase();
    const [voto] = await connection.query("SELECT * FROM versus_votos WHERE id_usuario = ? AND id_versus = ?;", [id, versus]);

    return voto;
}


export const updateVotoById = async (id, data) => {
    const connection = await connectDatabase();
    const [deleted] = await connection.query("DELETE FROM versus_votos WHERE id_versus = ?;", [id]);

    if(deleted.affectedRows > 0){
    const [newVoto] = await connection.query("INSERT INTO versus_votos (id_versus,id_coche,id_usuario) VALUES (?,?,?)", [id, data.id_coche, data.id_usuario]);
    return newVoto.affectedRows;
    }
}   

export const voteVersus = async (data) => {
    const connection = await connectDatabase();
    const [versus]  = await connection.query("INSERT INTO versus_votos (id_versus,id_coche,id_usuario) VALUES (?,?,?)", [data.id_versus, data.id_coche, data.id_usuario]);

    return versus.affectedRows;
}