import mysql from 'mysql2/promise';
import { connectDatabase } from '../database/db.js';

import { encryptPassword, comparePassword } from '../libs/password.js';

// Aqui crearemos los modelos para contactar la database.

export const getUsuarios = async () => {
    const connection = await connectDatabase();
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE rol != "superadmin"');
    return rows;
}


export const createUsuario = async (usuario) => {
    const { contraseña, nombre, correo, ciudad } = usuario;
    
    const encryptedPass = await encryptPassword(contraseña); // Llamamos al metodo para encriptar la contraseña.

    const connection = await connectDatabase(); // Conectamos a la db.
 
    const query = 'INSERT INTO usuarios (nombre, correo, ciudad, contraseña) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute(query, [nombre, correo, ciudad, encryptedPass]);
    return result.affectedRows; // Si el usuario no existe procede a crear uno nuevo
}

export const loginUsuario = async (usuario) => {
    const connection = await connectDatabase();
    const query = 'SELECT id FROM usuarios WHERE correo = ?';

    if(await comparePassword(usuario.contraseña, usuario.correo)){
        const [userId] = await connection.execute(query, [usuario.correo]);
        return userId;
    } // Esta funcion compara las contraseñas y nos permite ver si hay similitud entre ellas.

    return [{id: undefined}]; // Si no, retorna un id indenifido.
}

export const banUsuario = async (id) => {
    const connection = await connectDatabase();
    const query = 'UPDATE usuarios SET ban = 1 WHERE id = ?';

    const [result] = await connection.execute(query, [id]);
    return result.changedRows;
}

export const pardonUsuario = async (id) => {
    const connection = await connectDatabase();
    const query = 'UPDATE usuarios SET ban = 0 WHERE id = ?';

    const [result] = await connection.execute(query, [id]);
    return result.changedRows;
}

export const deleteUsuario = async (id) => {
    const connection = await connectDatabase();
    const query = 'DELETE FROM usuarios WHERE id = ?';

    const [result] = await connection.execute(query, [id]);
    return result.affectedRows;
}


export const ascenderUsuario = async (id) => {
    const connection = await connectDatabase();

    const [userRol] = await connection.execute('SELECT rol FROM usuarios WHERE id = ?', [id]);
    let newRol = "";

    if(userRol[0].rol === "usuario"){
        newRol = "moderador";
    } else if(userRol[0].rol === "moderador") {
        newRol = "admin";
    } else {
        return 0;
    }

    const query = 'UPDATE usuarios SET rol = ? WHERE id = ?';

    const [result] = await connection.execute(query, [newRol, id]);
    return result.changedRows;
}


export const degradarUsuario = async (id) => {
    const connection = await connectDatabase();

    const [userRol] = await connection.execute('SELECT rol FROM usuarios WHERE id = ?', [id]);
    let newRol = "";

    if(userRol[0].rol === "moderador"){
        newRol = "usuario";
    } else if(userRol[0].rol === "admin") {
        newRol = "moderador";
    } else {
        return 0;
    }

    const query = 'UPDATE usuarios SET rol = ? WHERE id = ?';

    const [result] = await connection.execute(query, [newRol, id]);
    return result.changedRows;
}

export const getUsuarioByID = async (id) => {
    const connection = await connectDatabase();
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows;
}

export const getUsuarioByCorreo = async (correo) => {
    const connection = await connectDatabase();
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return rows;
}


export const getUsuarioByCode = async (code) => {
    const connection = await connectDatabase();
    const [rows] = await connection.execute('SELECT * FROM codigos WHERE codigo = ?', [code]);
    return rows;
}


export const saveRecoverCode = async (id, code) => {
    const connection = await connectDatabase();
    const [rows] = await connection.execute('INSERT INTO codigos(id_usuario, codigo) VALUES (?, ?)', [id, code]);

    return rows.affectedRows;
}

export const changePass = async (id, pass) => {
    const connection = await connectDatabase();
    const hash = await encryptPassword(pass);
    const [rows] = await connection.execute('UPDATE usuarios SET contraseña = ? WHERE id = ?', [hash, id]);

    const [deleteCode] = await connection.execute('DELETE FROM codigos WHERE id_usuario = ?', [id]);
    return rows.affectedRows;
}