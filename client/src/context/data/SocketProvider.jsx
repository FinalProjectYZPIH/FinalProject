import { createContext, useContext,useState,useEffect } from "react"
import io from "socket.io-client";
import {messageData, roomChatData} from "../data/data.js"



const SocketTheme = createContext(null)

export function useSocketProvider(){
  return useContext(SocketTheme)
}



export default function SocketProvider({children}) {
    // benutze useSocketIo in libs ordner
    
  //   const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   setSocket(io("http://localhost:5000"));
  // }, []);

// const socket = io.connect("http://localhost:3000");


  return (
    
    <SocketTheme.Provider value={{}}>
        {children}
    </SocketTheme.Provider>
  )
}


// daten vorstellungen
// const groupChatData = {
//   chatName: "",
//   isGroupChat: false,
//   chatMessages: [messageData,...], // Jedes mal wenn einen nachricht gesendet wird, wird einen chatMessages erstellt, und messagData wird reingepushed. paricipants sind required. Die anderen Optionenen sind für raumerstellungen wichtig ansonstens sind alle optional.
//   participants: [userId1, userId2], // Teilnehmer des Gruppenchats (bei 3 oder mehr leute admin required)
//   chatAdmin: userid,
// };


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
