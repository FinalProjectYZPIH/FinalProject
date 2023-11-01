import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";
import useSocketIo from "../libs/useSocketio";

export default function ChatDashboard() {
  const { defaultProfile, setLogout,resetProfile } = useProfileStore();
  const { isOnline, username } = defaultProfile;

  const navigate = useNavigate();
  const { data: userData, isSuccess } = profileRequest("mainUser");

  const {socket, sendMessage, createRoom } = useSocketIo(username);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== "" && room !== "") {
        const firstMessage = `welcome to our ${room}`
        console.log(room)
        createRoom({attachMessage: [firstMessage], attachParticipantas: ["user1,user2"], attachComments:[], groupchat: true }, room)
    //   socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    setLogout();
    resetProfile();
    if (isOnline === false) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="App">
        <div className="joinChatContainer flex items-center flex-col">
          
            <div className="w-1/2 h-1/2 bg-slate-200 flex justify-center ">
              Anzeigebildschirm
            </div>

            {isOnline && isSuccess ? (
              <div>{`${userData.data.username}`}</div>
            ) : (
              "failed to fetching userdata"
            )}
            <button className="border border-1 p-1" onClick={handleLogout}>
              logout
            </button>
            </div>
      {!showChat ? (
        <div>
          <h3>Join A Chat</h3>
          <input
            className="border border-1"
            type="text"
            placeholder="Create or Join a Room"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <>
          <Chat socket={socket} username={username} room={room} />
        </>
      )}
    </div>
  );
}
