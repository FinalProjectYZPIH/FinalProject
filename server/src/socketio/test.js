


export const test = ( socket, io) => {
    console.log("a user connected"),
    console.log(socket.id)
    socket.on("message", (message) => {
        console.log(message)
    })
    
    socket.on("disconnect", (socket) => {
        console.log(`User ${socket.id} disconnected`);
    });
}

