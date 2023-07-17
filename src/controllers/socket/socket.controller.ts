import { Server } from "socket.io";

export const socketController = (socket: Server) => {
    
    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('enviar-mensaje', ( payload, callback ) => {
        
        const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );

    })

}
