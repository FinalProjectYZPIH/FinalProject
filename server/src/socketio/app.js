import { createServer } from "http";
import { io } from "../server.js";
import {Server} from "socket.io";
// import {test} from "./test.js"
import { corsOptions } from "../config/allowesOrigins.js";
import {handleRoomchat} from "./handleRoomchat.js"

const onlineUsers = {};


export function createSocket (app) {
  const httpServer = createServer(app)
  const io = new Server(httpServer, {
    cors: {
      origin: corsOptions, // Hier können Sie die gewünschten Ursprünge festlegen oder "*" verwenden, um alle Ursprünge zuzulassen
      methods: ["GET", "POST", "PATCH","PUT","DELETE"], // Erlaubte HTTP-Methoden
      credentials: true
      
    }})
    return {httpServer, io}
  }
  
  export function socketInitiation () {
    const onConnection = (socket,io) => {
      handlePrivateChat(socket, io);
      handleRoomchat(socket, io);
      // test(socket, io)
    }
    io.on("connection", onConnection)
  }
  

  function handlePrivateChat (socket, io) {

    socket.on("singleRoom", data => {
      console.log("singleroom",data.singleRoom)
      // socket.on("messages_singleRoom", data => {
      //   socket.on("sendMessage", message => {
      //     console.log(message)
      //     data.groupRoom.chatMessages.push(message.content)
      //     return message.content
      //   } )

      //   return data.groupRoom.chatMessages
      // } )
    })
    socket.on("customEvent", data => {
      console.log("custom",data.message)
    })
    // socket.on("sendMessage", (data, test) => {
    //   console.log("send",data)
    //   test(`${data.content} is received`)
    // });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  }
  

