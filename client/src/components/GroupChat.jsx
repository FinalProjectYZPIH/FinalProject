import React, { useEffect, useState } from "react";
import { getTime } from "date-fns";
import { useSocketProvider } from "../context/data/SocketProvider";
import { useProfileStore } from "../context/data/dataStore";
import { useNavigate, useParams } from "react-router-dom";
import { produce } from "immer";
// import ScrollToBottom from "react-scroll-to-bottom";

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
  const { username } = useProfileStore((state) => state.defaultProfile);
  const { socket, sendMessage, roomConfig, setRoomConfig, setUrlRooms, urlRooms } =
    useSocketProvider();
  const { setChatRooms } = useProfileStore();
  // const [urlRooms, setUrlRooms] = useState([]);
  const { chatName } = useParams();
  const navigate = useNavigate();
  console.log(chatName);
  console.log(roomConfig);
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

  // useEffect(() => {
  //   setUrlRooms((prev) => [...prev,{[chatName]: roomConfig}]);
  // }, [chatName]);

  const [messageList, setMessageList] = useState(roomConfig.chatMessages);

  console.log(roomConfig.chatMessages);
  console.log(roomConfig.chatAdmin);

  useEffect(() => {
    setRoomConfig((prev) =>({ ...prev, [chatName]: chatName, chatMessages: [...prev.chatMessages, ...messageList] }));
    setChatRooms(roomConfig);
  }, [chatName]);

  // hier wird die daten aus backend immer mit dazugehörigen room aktualisiert
  useEffect(() => {
    socket.on("messages_groupRoom", (message, room) => {
      console.log(message);
      setMessageList((list) => [...list, message]);
      setChatRooms(room);
    });
  }, [socket]);

  const sendMessages = async () => {
    if (currentMessage.content !== "") {
      const message = sendMessage(currentMessage, (cb) => console.log(cb));
      console.log(message);

      setMessageList((list) => [...list, message]);
      setCurrentMessage({
        ...defaultMessageObj,
        time: getTime(new Date()),
      });
    }
  };
  console.log(messageList);
  return (
    <div className="chat-window bg-blue-200">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {/* <ScrollToBottom className="message-container"> */}
        {(messageList ?? []).map((messageContent) => {
          return (
            <div
              className="message"
              id={username === messageContent.sender ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.content}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.sender}</p>
                </div>
              </div>
            </div>
          );
        })}
        {/* </ScrollToBottom> */}
      </div>
      <div className="chat-footer">
        <input
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
        <button onClick={sendMessages}>&#9658;</button>
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
