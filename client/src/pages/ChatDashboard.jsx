import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import Chat from "../components/chat";
import { useSocketProvider } from "../context/data/SocketProvider";

export default function ChatDashboard() {
  const { defaultProfile, setLogout } = useProfileStore();

  const { isOnline } = defaultProfile;

  const { data: userData, isSuccess } = profileRequest("user");

  const { socket } = useSocketProvider()
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   setLogout();
  // };

  // return (
  //   <div className="flex items-center flex-col ">
  //     <div className="w-1/2 h-1/2 bg-slate-200 flex justify-center ">
  //       Anzeigebildschirm
  //     </div>

  //     {isOnline && isSuccess ? (
  //       <div>{`${userData.data.firstname}`}</div>
  //     ) : (
  //       "failed to fetching userdata"
  //     )}
  //     <button className="border border-1 p-1" onClick={handleLogout}>
  //       logout
  //     </button>
  //   </div>
  // );
}



