import { createServer } from "http";
import {Server} from "socket.io";
import { io } from "../server.js";
import {test} from "./test.js"

export function createSocket (app) {
    const httpServer = createServer(app)
    const io = new Server(httpServer, {
        cors: {
          origin: "*", // Hier können Sie die gewünschten Ursprünge festlegen oder "*" verwenden, um alle Ursprünge zuzulassen
          methods: ["GET", "POST", "PATCH","PUT","DELETE"], // Erlaubte HTTP-Methoden
        }})

        return {httpServer, io}
}

export function socketInitiation () {

    const onConnection = (socket,io) => {
        test(io,socket)
    }


    io.on("connection", onConnection)
}
    