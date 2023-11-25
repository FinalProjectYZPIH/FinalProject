import logger from "../helpers/middleware/logger.js";
import ChatRoomModel from "../models/chatRoom.model.js";
import UserModel from "../models/user.model.js";
import { io } from "../server.js";

export async function handleRoomchat(socket, io, userId = null) {
  let rooms = [];
  ///////////////////////////////////////////////////////////////////////////////////////
  socket.on("groupRoom", async (data) => {

    const foundRoom = rooms.find((room) => {
      return (
        room?.chatName === data?.chatName && room?.chatAdmin === data?.chatAdmin
      );
    });

    if (!foundRoom) {
      rooms.push(data);
      console.log("room not found", Boolean(foundRoom));

      socket.join(data.chatName);
    }
    const members = io.sockets.adapter.rooms.get(data.chatName);
    io.to(data.chatName).emit("joinRoom", {
      currentRoom: data,
      participants: [...members],
    });
  });

  ///////////////////////////////////////////////////////////////////////////////////////


  socket.on("updateRoom", async (roomName, updateExistingRoom) => {
    console.log("updateRoom", roomName);

    io.to(roomName).emit("joinRoom", () => {
      const currentMembers = io.sockets.adapter.rooms.get(roomName);
      rooms = rooms.map((room) => {
        if (room?.chatName === roomName) {

          updateExistingRoom.participants.forEach((participant) => {
            if (!currentMembers.has(participant)) {
              socket.join(roomName);
            }
          });

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

      const currentRoom = rooms.find(
        (room) =>
          room?.chatName === roomName &&
          room?.chatAdmin === updateExistingRoom?.chatAdmin
      ) || {};
      console.log("socket", currentRoom, "frontend", updateExistingRoom);
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
  socket.on("leaveRoom", (chatName, user) => {
    socket.leave(chatName);  
    const foundRoom = rooms.find((room) => room?.chatName === chatName);
    rooms = rooms.map((room) => {
      if (room?.chatName === chatName) {
        return {
          ...room,
          participants: room.participants.filter((id) => id !== user),
        };
      } else {
        return room;
      }
    });
    console.log(
      `User with ID: ${foundRoom?.participants.find(
        (id) => id !== userId
      )} left room: ${foundRoom?.chatName}`
    );
    io.to(chatName).emit("leavedRoom", foundRoom);

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
