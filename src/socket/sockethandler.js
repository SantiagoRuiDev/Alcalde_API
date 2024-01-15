import fs from "fs";
import { Server } from "socket.io"; // Importar Server de Socket.io
import { deleteMessage, like, getForo, createMessage, createReply, deleteReply } from "../messenger/message.js";

function init(server){

    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {


        socket.on('joinForo', async (data) => {
            
            socket.join(data.room);

            const room = await getForo(data);

            socket.emit('joinForo', room);
        })

        socket.on('createMessage', async (data) => {
            const message = await createMessage(data);

            if(message.status == 1){
                const room = await getForo(data);

                io.to(data.room).emit('joinForo', room);
            }
        })

        socket.on("createReply", async (data) => {
            const message = await createReply(data);

            if(message.status === 1){
                const room = await getForo(data);

                io.to(data.room).emit('joinForo', room);
            }
        });

        socket.on("deleteMessage", async (data) => {
            const message = await deleteMessage(data);

            if(message.status === 1){
                const room = await getForo(data);

                io.to(data.room).emit('joinForo', room);
            }
        });

        socket.on("deleteReply", async (data) => {
            const message = await deleteReply(data);

            if(message.status === 1){
                const room = await getForo(data);

                io.to(data.room).emit('joinForo', room);
            }
        });

        socket.on("imageDelete", (data) => {
            fs.unlinkSync(data.path);

            socket.emit("imageDelete", { "message": "Imagen eliminada" });
        })
    });

    return io;

} // Esta funcion inicia la conexion y captura los eventos.



export { init };