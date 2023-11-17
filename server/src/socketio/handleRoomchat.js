import logger from "../helpers/middleware/logger.js";
import ChatRoomModel from "../models/chatRoom.model.js";
import UserModel from "../models/user.model.js";
import { io } from "../server.js";

export async function handleRoomchat(socket, io, userId = null) {
  let rooms = [];
  ///////////////////////////////////////////////////////////////////////////////////////
  socket.on("groupRoom", async (data) => {
    const initialLength = rooms.length;
    console.log(initialLength, rooms.length);
    const foundRoom = rooms.find((room) => {
      return room?.chatName === data.chatName && room?.chatAdmin;
    });

    if (!foundRoom) {
      rooms.push(data);
      if(initialLength !== rooms.length){

        console.log("room not found", Boolean(foundRoom));
        socket.join(data.chatName);
      }
    }
    const members = io.sockets.adapter.rooms.get(data.chatName);
    io.to(data.chatName).emit("joinRoom", {
      currentRoom: data,
      participants: [...members],
    });
  });

  ///////////////////////////////////////////////////////////////////////////////////////

  socket.on("updateRoom", (roomName) => {
    console.log("updateRoom", roomName);
    io.to(roomName).emit("joinRoom", () => {
      const currentMembers = io.sockets.adapter.rooms.get(roomName);
      rooms = rooms.map((room) => {
        if (room?.chatName === roomName) {
          return {
            ...room,
            participants: [...currentMembers].filter(
              (value, index, self) => self.indexOf(value) === index
            ),
          };
        } else {
          return room;
        }
      });
      const currentRoom = rooms.find((room) => room?.chatName === roomName);
      console.log("currentRoom", currentRoom);
      return {
        currentRoom: currentRoom,
        participants: [...(currentMembers || "")],
      };
    });
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  socket.on("sendMessage", async (message, roomName, cb) => {
    cb(`${message.content} received`);

    rooms = rooms.map((room) => {
      if (room?.chatName === roomName) {
        return {
          ...room,
          chatMessages: [...room.chatMessages, message],
        };
      } else {
        return room;
      }
    });
    const foundRoom = rooms.find((room) => {
      return room?.chatName === roomName;
    });

    console.log("newRoom and message", foundRoom, message);
    //
    io.to(roomName).emit("messages_groupRoom", message, foundRoom);
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  socket.on("leaveRoom", (data) => {
    socket.leave(data.chatName);
    console.log(
      `User with ID: ${data.participants.find(
        (id) => id !== userId
      )} left room: ${data?.chatName}`
    );
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  socket.on("disconnect", () => {
    const rooms = socket.rooms;
    rooms.forEach((room) => {
      const roomMembers = io.sockets.adapter.rooms.get(room);
      console.log("Room Members after disconnect:", roomMembers);
    });
  });
}
