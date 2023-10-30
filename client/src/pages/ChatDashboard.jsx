import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import Chat from "../components/Chat";
import { useSocketProvider } from "../context/data/SocketProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons";

export default function ChatDashboard() {
  const { defaultProfile, setLogout,resetProfile } = useProfileStore();

  const { isOnline } = defaultProfile;

  const navigate = useNavigate();

  const { data: userData, isSuccess } = profileRequest("user");

  const { socket } = useSocketProvider();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
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
      {!showChat ? (
        <div className="joinChatContainer">
          <div className="flex items-center flex-col ">
            <div className="w-1/2 h-1/2 bg-slate-200 flex justify-center ">
              Anzeigebildschirm
            </div>

            {isOnline && isSuccess ? (
              <div>{`${userData.data.username}`}</div>
            ) : (
              "failed to fetching userdata"
            )}
            <Button className="border border-1 p-1" onClick={handleLogout}>
              logout
            </Button>
          </div>
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
        <>
          <Chat socket={socket} username={username} room={room} />
          <button className="border border-1 p-1" onClick={handleLogout}>
            logout
          </button>
        </>
      )}
    </div>
  );
}


// const groupChatData = {
//   chatName: "My Group Chat",
//   isGroupChat: true,
//   chatMessages: [], // Hier werden Nachrichten hinzugefügt
//   participants: [userId1, userId2], // Teilnehmer des Gruppenchats
//   chatAdmin: chatAdminUserId,
// };

// const messageData = {
//   sender: userId,
//   content: "Hello, this is a message!",
//   likes: [], // Array von User-IDs, die den Beitrag mögen
//   emojis: [], // Hier können Emojis hinzugefügt werden
//   images: [], // Hier können Bild-URLs hinzugefügt werden
//   voices: [], // Hier können Audio-URLs hinzugefügt werden
//   videos: [], // Hier können Video-URLs hinzugefügt werden
// };

