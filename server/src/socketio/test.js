


export const test = (io, socket) => {
    console.log("a user connected"),
    console.log(socket.id)
    socket.on("message", (message) => {
        console.log(message)
        io.emit('socket', `${socket.id.substring(0,2)} said ${message}`)
    })
    
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        socket.off("message"); // Entfernt den "message" Event-Listener
    });
}