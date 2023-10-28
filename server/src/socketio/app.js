import { createServer } from "http";
import {Server} from "socket.io";
import { io } from "../server.js";
import {test} from "./test.js"
import { corsOptions } from "../config/allowesOrigins.js";

export function createSocket (app) {
    const httpServer = createServer(app)
    const io = new Server(httpServer, {
        cors: {
          origin: corsOptions, // Hier können Sie die gewünschten Ursprünge festlegen oder "*" verwenden, um alle Ursprünge zuzulassen
          methods: ["GET", "POST", "PATCH","PUT","DELETE"], // Erlaubte HTTP-Methoden
        }})

        return {httpServer, io}
}

export function socketInitiation () {

    const onConnection = (socket,io) => {
        test(socket, io)
    }


    io.on("connection", onConnection)
}
    