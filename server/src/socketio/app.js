import { createServer } from "http";
import { io } from "../server.js";
import {Server} from "socket.io";
// import {test} from "./test.js"
import { corsOptions } from "../config/allowesOrigins.js";

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
      // test(socket, io)
      test1(socket, io)
    }
    io.on("connection", onConnection)
  }
  
  
  function test1  ( socket, io){
    socket.on("connect", (data) => {
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

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

    socket.on("groupRoom", data => {
      socket.join(data.groupRoom.chatName)
      console.log("console.grouproom",data)
      console.log(`User with ID: ${data.groupRoom.participants[data.groupRoom.participants?.length-1]} joined room: ${data.groupRoom?.chatName}`);
      socket.on("sendMessage", (message, cb) => {
        cb(`${message} received`)
        data.groupRoom.chatMessages.push(message)
        console.log(message)
        socket.to(data.groupRoom.chatName).emit("messages_groupRoom", message)
      } )
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
  
