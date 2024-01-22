import { connectDatabase } from '../database/db.js';


export const getCalificaciones = async (req, res) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones");

    connection.end();
    return result;
}


export const getCalificacionById = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones WHERE id_usuario = ?", [id]);

    connection.end();
    return result;
}

export const getCalificacionByResena = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones WHERE id_resena = ?", [id]);

    
    const calificacionMap = result.map((calificacion) => {
        return {
          id_resena: calificacion.id_resena,
          id_usuario: calificacion.id_usuario,
          gasolina: calificacion.gasolina,
          confiabilidad: calificacion.confiabilidad,
          confort: calificacion.confort,
          diseno: calificacion.diseno,
          manejo: calificacion.manejo,
        };
      });

      connection.end();
    return calificacionMap;
}

export const createCalificacion = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM calificaciones WHERE id_usuario = ? && id_resena = ?", [data.id_usuario, data.id_resena]);
    let update = [];

    if(result.length == 0){
        [update] = await connection.query("INSERT INTO calificaciones (id_usuario, id_resena) VALUES (?, ?)", [data.id_usuario, data.id_resena]);
    }

    connection.end();
    return 1;
}

export const updateGasolina = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET gasolina = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    connection.end();
    return result;
}

export const updateConfiabilidad = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET confiabilidad = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    connection.end();
    return result;
}

export const updateManejo = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET manejo = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    connection.end();
    return result;
}

export const updateConfort = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET confort = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    connection.end();
    return result;
}

export const updateDiseño = async (data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE calificaciones SET diseno = ? WHERE id_usuario = ? && id_resena = ?", [data.puntaje, data.id_usuario, data.id_resena]);

    connection.end();
    return result;
}