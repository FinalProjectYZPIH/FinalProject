import React, { useEffect, useState } from "react";
import { getTime } from "date-fns";
import { useSocketProvider } from "../context/data/SocketProvider";
import { useProfileStore } from "../context/data/dataStore";

import { useNavigate, useParams } from "react-router-dom";
import { produce } from "immer";

import { useDarkLightMode } from "../context/data/dataStore.jsx";
import { Inputs } from "./ui/Inputs";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button } from "./ui/Buttons";
import Navigation from "./Navigation.jsx";

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
// messageData = {
//   sender: userId,
//   content: content,
//   likes,
//   emojis,
//   images,
//   voices,
//   videos,
//   time:
//   new Date(Date.now()).getHours() +
//   ":" +
//   new Date(Date.now()).getMinutes(),
// };
function GroupChat() {
  const { username, chatRooms } = useProfileStore(
    (state) => state.defaultProfile
  );
  const { setChatRooms } = useProfileStore();
  const { chatName } = useParams();
  const navigate = useNavigate();
  console.log(chatName);

  const { socket, sendMessage } = useSocketProvider();
  const { lightMode, setDarkMode } = useDarkLightMode();
  console.log(chatRooms);

  const defaultMessageObj = {
    content: "",
    likes: 0,
    emojis: [],
    images: [],
    voices: [],
    videos: [],
  };
  const [currentMessage, setCurrentMessage] = useState({
    ...defaultMessageObj,
    time: getTime(new Date()),
  });
  const [messageList, setMessageList] = useState([]);
  const [roomConfig, setRoomConfig] = useState(
    chatRooms?.find((room) => {

      if (room.chatName === "") {
        return "leere String";
      }
      room?.chatName === chatName;
    })

  );

  console.log(messageList);
  // const [comments, setComments] = useState(roomConfig?.comments);
  // const [admin, setAdmin] = useState(roomConfig?.chatAdmin)

  // console.log(roomConfig?.chatMessages);
  // console.log(roomConfig?.chatAdmin);

  useEffect(() => {
    setMessageList(roomConfig?.chatMessages || []);
  }, [chatName]);

  // hier wird die daten aus backend immer mit dazugehörigen room aktualisiert
  useEffect(() => {
    socket.on("messages_groupRoom", (message, room) => {
      console.log(message);
      setMessageList((list) => [...list, message]);
      setChatRooms(room);
      console.log("roomtest", room);
    });
  }, [socket]);

  const storedData = JSON.parse(sessionStorage.getItem("Profile"));
  console.log("Stored Data:", storedData?.defaultProfile?.chatMessages);

  const sendMessages = async () => {
    if (currentMessage.content !== "") {
      const message = sendMessage(currentMessage, (cb) => console.log(cb));
      console.log(message);
      setCurrentMessage({
        ...defaultMessageObj,
        time: getTime(new Date()),
      });

      setMessageList((list) => [...list, message]);
    }
  };
  console.log(messageList);
  console.log(roomConfig?.chatMessages);
  return (
    <div
      className={`chat-window font-orbitron w-screen h-screen ${
        lightMode ? "dark bg-none" : "light bg-none"
      }`}
    >
      <div className="chat-header border mt-5 border-cyan-400 rounded-lg p-5 h-4/5 w-auto shadow-lg backdrop-blur">
        <p>Live Chat</p>
        <div className="chat-body flex flex-col border border-cyan-800 h-[500px] rounded-lg py-5 px-1">
          <ScrollToBottom className="overflow-x-hidden">
            {(messageList ?? []).map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className={
                    username === messageContent.author ||
                    username === messageContent.sender
                      ? "self-message flex justify-end rounded-lg break-words"
                      : "other-message flex justify-start rounded-lg break-words  "
                  }
                >
                  <div>
                    <div className="message-content w-60 border border-cyan-400 p-2 m-1 rounded-lg ">
                      <p>{messageContent.content}</p>
                      <div className="message-meta flex justify-end text-xs p-2">
                        <p id="author">{messageContent.sender}</p>
                        <p className="pl-2" id="time">
                          {messageContent.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer flex fixed bottom-2 left-0">
          <form>
            <input
              className="bg-blue-950 bg-opacity-5 block w-full px-10 py-1 text-lg text-cyan-400 focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 border-b-2 rounded-lg border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:text-white focus:bg-sky-600 focus:bg-opacity-25 focus:border-blue-600 hover:border-b-cyan-400"
              type="text"
              value={currentMessage.content}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage({
                  ...currentMessage,
                  content: event.target.value,
                });
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessages();
              }}
            />
          </form>

          <div className="fixed bottom-1 right-0 w-32">
            <Button onClick={sendMessages}>GO</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupChat;

// import React, { useEffect, useState } from "react";
// // import ScrollToBottom from "react-scroll-to-bottom";

// function Chat({ socket, username, room }) {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);

//   const sendMessage = async () => {
//     if (currentMessage !== "") {
//       const messageData = {
//         room: room,
//         author: username,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };
//       await socket.emit("send_message", messageData);
//       setMessageList((list) => [...list, messageData]);
//       setCurrentMessage("");
//     }
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageList((list) => [...list, data]);
//     });
//   }, [socket]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body">
//         {/* <ScrollToBottom className="message-container"> */}
//           {messageList.map((messageContent) => {
//             return (
//               <div
//                 className="message"
//                 id={username === messageContent.author ? "you" : "other"}
//               >
//                 <div>
//                   <div className="message-content">
//                     <p>{messageContent.message}</p>
//                   </div>
//                   <div className="message-meta">
//                     <p id="time">{messageContent.time}</p>
//                     <p id="author">{messageContent.author}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         {/* </ScrollToBottom> */}
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           value={currentMessage}
//           placeholder="Hey..."
//           onChange={(event) => {
//             setCurrentMessage(event.target.value);
//           }}
//           onKeyPress={(event) => {
//             event.key === "Enter" && sendMessage();
//           }}
//         />
//         <button onClick={sendMessage}>&#9658;</button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
