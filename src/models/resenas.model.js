import { connectDatabase } from "../database/db.js";

export const getResenas = async () => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena");
    return result;
}

export const getResenaById = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena WHERE id = ?", [id]);
    const [details] = await connection.query("SELECT * FROM detalles WHERE id = ?", [result[0].id_detalles]);
    const [carrete] = await connection.query("SELECT * FROM carrete WHERE id_resena = ?", [id]);

    return [result[0], details[0], carrete];
}

export const getComentariosResena = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT r.id, r.id_usuario, r.mensaje, u.nombre FROM resena_comentarios AS r INNER JOIN usuarios AS u ON u.id = r.id_usuario WHERE id_resena = ?", [id]);

    return result;

}

export const getResenaInfoById = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena WHERE id = ?", [id]);

    return [result[0]];
}


export const addImageResena = async (id, imageUrl) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("INSERT INTO carrete(imagen, id_resena) VALUES(?, ?)", [imageUrl, id]);

    return result.affectedRows;
}

export const createResena = async (data) => {
    const connection = await connectDatabase();

    const newDetalles = await createDetalles(data);
    if(newDetalles > 0) {
        const [result] = await connection.query("INSERT INTO resena(id_usuario, id_detalles, calificaciones, imagen, descripcion, titulo, video) VALUES (?, ?, 0, ?, ?, ?, ?)", [data.id_usuario, newDetalles, data.imagen, data.descripcion, data.titulo, data.video]);
        return result;
    }
    return 0;
}

export const createComentarioResena = async(data) => {
    const connection = await connectDatabase();

    const [result] = await connection.query("INSERT INTO resena_comentarios(id_resena, id_usuario, mensaje) VALUES (?, ?, ?)", [data.id_resena, data.id_usuario, data.mensaje]);
    return result;
}

const createDetalles = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("INSERT INTO detalles(modelo, marca, ano, hp, puertas, combustible, transmision, motor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                                            [data.modelo, data.marca, data.ano, data.hp, data.puertas, data.combustible, data.transmision, data.motor]);

    return result.insertId;
}


export const deleteResena = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("DELETE FROM resena WHERE id = ?", [id]);

    return result.affectedRows;
}

export const searchResena = async (search) => {
    const connection = await connectDatabase();
    const query = 'SELECT * FROM resena WHERE titulo LIKE ?';
    
    const [result] = await connection.query(query, [`%${search}%`]);
    return result;
}