import { connectDatabase } from "../database/db.js";


export const createSubforo = async (data) => {
    const connection = await connectDatabase();

    const [newSubforo] = await connection.query('INSERT INTO subforo(id_resena, tipo) VALUES (?, ?)', [data.resena, data.tipo]);
    return newSubforo.affectedRows;
}

export const getSubforo = async (resena, tipo) => {
    const connection = await connectDatabase();

    const [subforo] = await connection.query('SELECT * FROM subforo WHERE id_resena = ? AND tipo = ?', [resena, tipo]);
    return subforo;
}

export const getComentarios = async (subforo) => {
    const connection = await connectDatabase();

    const [comentarios] = await connection.query('SELECT s.id, s.id_usuario, s.texto, s.imagen, u.nombre, s.id_subforo FROM subforo_comentario AS s INNER JOIN usuarios AS u ON u.id = s.id_usuario WHERE id_subforo = ?', [subforo]);
    const [likes] = await connection.query('SELECT * FROM subforo_likes WHERE id_subforo = ?', [subforo]);
    const [replies] = await connection.query('SELECT s.id, s.id_usuario, s.id_comentario, s.texto, s.imagen, u.nombre, s.id_subforo FROM subforo_replicas AS s INNER JOIN usuarios AS u ON u.id = s.id_usuario WHERE id_subforo = ?', [subforo]);
    return [comentarios, likes, replies];
}

export const createComentario = async (data) => {
    const connection = await connectDatabase();

    const [newComentario] = await connection.query('INSERT INTO subforo_comentario(id_subforo, texto, imagen, id_usuario) VALUES (?, ?, ?, ?)', [data.subforo, data.comentario, data.imagen, data.usuario]);
    return newComentario.affectedRows;
}


export const deleteComentario = async(id) => {
    const connection = await connectDatabase();

    const [deleted] = await connection.query('DELETE FROM subforo_comentario WHERE id = ?', [id]);
    return deleted.affectedRows;
}

export const silenciarForo = async (id, tipo) => {
    const connection = await connectDatabase();

    const [silence] = await connection.query('UPDATE subforo SET silenciado = 1 WHERE id_resena = ? AND tipo = ?', [id, tipo]);
    
    return silence.affectedRows;
}

export const habilitarForo = async (id, tipo) => {
    const connection = await connectDatabase();

    const [silence] = await connection.query('UPDATE subforo SET silenciado = 0 WHERE id_resena = ? AND tipo = ?', [id, tipo]);
    
    return silence.affectedRows;
}

export const likeComentario = async (id, usuario, subforo) => {
    const connection = await connectDatabase();

    const [userLiked] = await connection.query('SELECT * FROM subforo_likes WHERE id_usuario = ? AND id_comentario = ?', [usuario, id]);

    if(userLiked.length > 0) {
        const [deleted] = await connection.query('DELETE FROM subforo_likes WHERE id_usuario = ? AND id_comentario = ?', [usuario, id]);
        return deleted.affectedRows;
    } else {
        const [liked] = await connection.query('INSERT INTO subforo_likes(id_usuario, id_comentario, id_subforo) VALUES (?, ?, ?)', [usuario, id, subforo]);
        return liked.affectedRows;
    }
}

export const replyComentario = async (data) => {
    const connection = await connectDatabase();

    const [reply] = await connection.query('INSERT INTO subforo_replicas(id_comentario, id_usuario, id_subforo, texto, imagen) VALUES (?, ?, ?, ?, ?)', [data.comentario, data.usuario, data.subforo, data.texto, data.imagen]);
    return reply.affectedRows;
}

export const deleteReply = async (id) => {
    const connection = await connectDatabase();

    const [deleted] = await connection.query('DELETE FROM subforo_replicas WHERE id = ?', [id]);
    return deleted.affectedRows;
}