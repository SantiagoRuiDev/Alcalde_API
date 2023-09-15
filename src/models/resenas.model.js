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

    return [result[0], details[0]];
}

export const createResena = async (data) => {
    const connection = await connectDatabase();

    const newDetalles = await createDetalles(data);
    if(newDetalles > 0) {
        const [result] = await connection.query("INSERT INTO resena(id_usuario, id_detalles, calificaciones, imagen, descripcion, titulo) VALUES (?, ?, 0, ?, ?, ?)", [data.id_usuario, newDetalles, data.imagen, data.descripcion, data.titulo]);
        return result.affectedRows;
    }
    return 0;
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
    
    const [result] = await connection.query(query, [`${search}%`]);
    return result;
}