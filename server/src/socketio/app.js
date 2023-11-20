import { createServer } from "http";
import { io } from "../server.js";
import { Server } from "socket.io";
// import {test} from "./test.js"
import { corsOptions } from "../config/allowesOrigins.js";
import { handleRoomchat } from "./handleRoomchat.js";

// cookie
import { parse } from "cookie";
import { verifyJwt } from "../helpers/utils/jwt.utils.js";
import logger from "../helpers/middleware/logger.js";
import { updateUserSocket } from "../services/user.service.js";
import { localTest } from "./test.js";



export function createSocket(app) {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: corsOptions, // Hier können Sie die gewünschten Ursprünge festlegen oder "*" verwenden, um alle Ursprünge zuzulassen
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Erlaubte HTTP-Methoden
      credentials: true,
      // cookie: false,
    },
    // pingTimeout: 60000 * 5, // 5 Minuten werden gewartet, bis der Benutzer getrennt wird (id etc werden gelöscht)
    // pingInterval: 25000, // alle 25 Sekunden wird ein Ping gesendet
  });
  return { httpServer, io };
}

let currentUserId = null;
export function socketInitiation() {
    io.use(async (socket, next) => {
      const token = socket.handshake.headers["cookie"];
      const { accessJwt } = parse(token);
      //  console.log( accessJwt)
      const { decoded, valid } = verifyJwt(accessJwt, process.env.ACCESS_TOKEN);


      try {
        if (valid) {
          const updatedUser = await updateUserSocket(decoded.UserInfo.id, socket.id);
          if (!updatedUser) {
              logger.error("Update Socketid failed");
              // return next("updateSocketid Failed");
              return;
          }

          currentUserId = decoded.UserInfo.id;
          next()

        }
        if(!token) {
          next()
        }
      } catch (error) {
        logger.error(error);
        next(error);
      }

      // console.log(decoded?.UserInfo);
    });


  const onConnection = async (socket, io) => {
    handleRoomchat(socket, io, currentUserId);
    handlePrivateChat(socket, io);
    localTest(socket, io)
  };
  io.on("connection", (socket) => onConnection(socket, io));
}

function handlePrivateChat(socket, io) {
  socket.on("singleRoom", (data) => {
    console.log("singleroom", data.singleRoom);
    // socket.on("messages_singleRoom", data => {
    //   socket.on("sendMessage", message => {
    //     console.log(message)
    //     data.groupRoom.chatMessages.push(message.content)
    //     return message.content
    //   } )

    //   return data.groupRoom.chatMessages
    // } )
  });
  socket.on("customEvent", (data) => {
    console.log("custom", data.message);
  });
  // socket.on("sendMessage", (data, test) => {
  //   console.log("send",data)
  //   test(`${data.content} is received`)
  // });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
}
