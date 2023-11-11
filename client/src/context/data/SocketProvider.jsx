import { createContext, useContext } from "react";

import { useProfileStore } from "./dataStore.jsx";
import useSocketIo from "../../libs/useSocketio.jsx";
import { useState } from "react";

const SocketTheme = createContext(null);

export function useSocketProvider() {
  return useContext(SocketTheme);
}

export default function SocketProvider({ children }) {
  // benutze useSocketIo in libs ordner
  const { isOnline, userId, role, username, email } = useProfileStore(
    (state) => state.defaultProfile
  );
  console.log(userId);

  

  const { socket, sendMessage, createRoom } = useSocketIo(username);

  return (
    <SocketTheme.Provider
      value={{
        socket,
        sendMessage,
        createRoom,
      }}
    >
      {children}
    </SocketTheme.Provider>
  );
}

// daten vorstellungen
// {
//   type: 'single',
//   chatName: 'SingleRoomName',
//   chatMessages: [{ content: 'Guten Nachmittag!', likes: 5, emojis: [] }],
//   participants: ['Yan', 'Zoe'],
//   comments: [{ content: 'sample coments', likes: 5, emojis: [] }],
// },
// {
//   type: 'group',
//   chatName: 'Room_League',
//   chatAdmin: 'Zoe',
//   chatMessages: [{ content: "Welcome to Zoe's Room", likes: 5, emojis: [] }],
//   participants: ['userid', 'user2', 'user3'],
//   comments: [{ content: 'sample coments', likes: 5, emojis: [] }],
// },

// messageData kann bei allen stelle angehängt werden also auch als attachdocument
// const messageData = {
//   sender: userId,
//   content: "Hello, this is a message!",
//   likes: [], // Array von User-IDs, die den Beitrag mögen
//   emojis: [], // Hier können Emojis hinzugefügt werden
//   images: [], // Hier können Bild-URLs hinzugefügt werden
//   voices: [], // Hier können Audio-URLs hinzugefügt werden
//   videos: [], // Hier können Video-URLs hinzugefügt werden
// };

//defaultProfile
// userId: null,
// role: null,
// isOnline: false,
// username: null,
// email: null,
// avatar: null,
// contacts: [
//   // friends
// ],
// notifications: Number,  //[chatroom].reduce((startvalue,f) => startvalue + f.length   ,0)
// messages: [
//   //[chatroom,...].filter(a => a[0] === friendsUserid)
// ],
// settings: {}, // am überlegen
