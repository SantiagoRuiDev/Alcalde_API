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


export const addPortadaResena = async (id, imageUrl) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("UPDATE resena SET imagen = ? WHERE id = ?", [imageUrl, id]);

    return result.affectedRows;
}

export const createResena = async (data) => {
    const connection = await connectDatabase();

    const newDetalles = await createDetalles(data);
    if(newDetalles > 0) {
        const [result] = await connection.query("INSERT INTO resena(id_usuario, id_detalles, calificaciones, imagen, descripcion, titulo, video) VALUES (?, ?, ?, ?, ?, ?, ?)", [data.resena.id_usuario, newDetalles, 0, "", data.resena.descripcion, data.resena.titulo, data.resena.video]);
        
        // Crear motor, confort, seguridad, entretenimiento, todas las secciones con el ID de la reseña

        const newMotor = await createResenaMotor(result.insertId, data);
        const newPerfomance = await createResenaPerfomance(result.insertId, data);
        const newChasis = await createResenaChasis(result.insertId, data);
        const newCapacidades = await createResenaCapacidades(result.insertId, data);
        const newSeguridad = await createResenaSeguridad(result.insertId, data);
        const newEntretenimiento = await createResenaEntretenimiento(result.insertId, data);
        const newConfort = await createResenaConfort(result.insertId, data);

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
    const [result] = await connection.query("INSERT INTO detalles(modelo, marca, ano, hp, puertas) VALUES (?, ?, ?, ?, ?)", 
                                            [data.resena.modelo, data.resena.marca, data.resena.ano, data.resena.hp, data.resena.puertas]);

    return result.insertId;
}

const createResenaMotor = async (id, data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("INSERT INTO resena_motor(resena_id, combustible, potencia, torque, cilindros, valvulas, alimentacion, sistema) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id, data.motor.combustible, data.motor.potencia, data.motor.torque, data.motor.cilindros, data.motor.valvulas, data.motor.alimentacion, data.motor.sistema]);

    return result;

}

const createResenaPerfomance = async (id, data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("INSERT INTO resena_perfomance(resena_id, aceleracion, velocidad, rendimientociudad, rendimientoruta, rendimientomixto) VALUES (?, ?, ?, ?, ?, ?)", [id, data.perfomance.aceleracion, data.perfomance.velocidad, data.perfomance.rendciudad, data.perfomance.rendruta, data.perfomance.rendmixto]);

    return result;
}

const createResenaChasis = async (id, data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("INSERT INTO resena_chasis(resena_id, motor, traccion, tranmision, frenos, neumaticos, suspdelantero, susptrasera, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, data.chasis.motor, data.chasis.traccion, data.chasis.transmision, data.chasis.frenos, data.chasis.neumaticos, data.chasis.suspdelantera, data.chasis.susptrasera, data.chasis.direccion]);

    return result;
}

const createResenaCapacidades = async(id, data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("INSERT INTO resena_medidas(resena_id, largo, alto, ancho, distanciaejes, cajuela, tanque, peso, capacidadcarga, alturapiso, capacidadvadeo, anguloataque, angulopartida, anguloventral, remolque, escalonamiento, inclinacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [id, data.capacidades.largo, data.capacidades.alto, data.capacidades.ancho, data.capacidades.ejes, data.capacidades.cajuela, data.capacidades.tanque, data.capacidades.peso, data.capacidades.capacidad, data.capacidades.altura, data.capacidades.vadeo, data.capacidades.anguloataque, data.capacidades.angulopartida, data.capacidades.anguloventral, data.capacidades.remolque, data.capacidades.escalonamiento, data.capacidades.inclinacion]);

    return result;

}

const createResenaSeguridad = async (id, data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("INSERT INTO resena_seguridad(resena_id, airbag, abs, distfrenado, asistfrenado, alarma, anclaje, cinturones, otros, sensor, terceraluz, autobloqueo, controlestabilidad, controltraccion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [id, data.seguridad.airbag, data.seguridad.abs, data.seguridad.distribucion, data.seguridad.asistencia, data.seguridad.alarma, data.seguridad.anclaje, data.seguridad.cinturones, data.seguridad.otros, data.seguridad.sensor, data.seguridad.terceraluz, data.seguridad.autobloqueo, data.seguridad.controlestabilidad, data.seguridad.controltraccion]);

    return result;
}

const createResenaEntretenimiento = async (id,data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("INSERT INTO resena_entretenimiento(resena_id, musica, bocinas, conex, bluetooth, tablero) VALUES (?,?,?,?,?, ?)", [id, data.entretenimiento.musica, data.entretenimiento.bocinas, data.entretenimiento.auxiliar, data.entretenimiento.bluetooth, data.entretenimiento.tablero]);

    return result;

}

const createResenaConfort = async (id, data) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("INSERT INTO resena_confort(resena_id, aire, asientosd, asientost, cierre, espejoi, espejoe, farosniebla, farosdelanteros, cambios, quemacocos, rines, vestiduras, crucero, vidrios, volante, cajuela, sensor, camara, computadora) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)", [id, data.confort.aireacondicionado, data.confort.asientosdelanteros, data.confort.asientostraseros, data.confort.cierrepuertas, data.confort.espejoint, data.confort.espejoext, data.confort.farosanti, data.confort.farosdelanteros, data.confort.palancacambios, data.confort.quemacocos, data.confort.rines, data.confort.vestiduras, data.confort.velocidadcrucero, data.confort.vidrios, data.confort.volante, data.confort.apertura, data.confort.sensor, data.confort.camara, data.confort.computadora]);

    return result;

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

export const getResenaMotor = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena_motor WHERE resena_id = ?", [id]);

    return result;
}

export const getResenaPerfomance = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena_perfomance WHERE resena_id = ?", [id]);

    return result;
}

export const getResenaChasis = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena_chasis WHERE resena_id = ?", [id]);

    return result;
}

export const getResenaCapacidades = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena_medidas WHERE resena_id = ?", [id]);

    return result;
}


export const getResenaSeguridad = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena_seguridad WHERE resena_id = ?", [id]);

    return result;
}


export const getResenaEntretenimiento = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena_entretenimiento WHERE resena_id = ?", [id]);

    return result;
}

export const getResenaConfort = async (id) => {
    const connection = await connectDatabase();
    const [result] = await connection.query("SELECT * FROM resena_confort WHERE resena_id = ?", [id]);

    return result;
}