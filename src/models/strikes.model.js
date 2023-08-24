import { connectDatabase } from "../database/db.js";
import debug from 'debug';
const printMessage = debug('app:strikes-model');


// Definimos modelos y acciones para los strikes.

const banearMaxStrikes = async (id) => {
    try {
        const connection = await connectDatabase();
        const [result] = await connection.execute('UPDATE usuarios SET ban = 1 WHERE id = ?', [id]);
    } catch(error){
        printMessage(error);
    }
}


export const strikeUsuario = async (id) => {
    try {
        const connection = await connectDatabase();

        const [info] = await connection.execute('SELECT strikes FROM usuarios WHERE id = ?', [id]);
        if(info[0].strikes >= 3) {
            await banearMaxStrikes(id),
            printMessage(`El usuario ${id} fue baneado por tener 3 strikes`)
            return false;
        }; 


        const [result] = await connection.execute('UPDATE usuarios SET strikes = strikes + 1 WHERE id = ?', [id]);
        return result;

    } catch (error) {
        printMessage(error);
    }
}


export const quitarStrikeUsuario = async (id) => {
    try {
        const connection = await connectDatabase();

        const [info] = await connection.execute('SELECT strikes FROM usuarios WHERE id = ?', [id]);
        if(info[0].strikes == 0) return false; 

        const [result] = await connection.execute('UPDATE usuarios SET strikes = strikes - 1 WHERE id = ?', [id]);
        return result;

    } catch (error) {
        printMessage(error);
    }
}