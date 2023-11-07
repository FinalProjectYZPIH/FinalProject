import React, { useEffect, useState } from "react";
import { Inputs } from "./Inputs";
import { useDarkLightMode } from "../context/data/dataStore.jsx";
// import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { lightMode, setDarkMode } = useDarkLightMode();
  
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className={`chat-window font-orbitron grid grid-cols-1 lg:grid-cols-2 w-screen h-screen sm:bg-cover sm:bg-center  bg-no-repeat lg:bg-contain lg:bg-right ${
      lightMode ? "dark" : "light"
    }`}>
      <div className="chat-header flex items-center justify-evenly">
        <p>Live Chat</p>
      </div>
      <div className="chat-body border border-black">
        {/* <ScrollToBottom className="message-container"> */}
          {messageList.map((messageContent, index) => {
            return (
              <div key={index}
                className="message flex justify-center hover:bg-white h-64"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        {/* </ScrollToBottom> */}
      </div>
      <div className="chat-footer flex justify-center ">
        <Inputs
          type="text"
          value={currentMessage}
          ph="Hey..."
          onChangeFn={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658; send message</button>
      </div>
    </div>
  );
}

export default Chat;
