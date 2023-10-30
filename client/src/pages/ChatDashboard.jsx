import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import Chat from "../components/Chat";
import { useSocketProvider } from "../context/data/SocketProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons";
import { useDarkLightMode } from "../context/data/dataStore";
import { Inputs } from "../components/Inputs";

export default function ChatDashboard() {
  const { defaultProfile, setLogout, resetProfile } = useProfileStore();

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

  const { lightMode, setDarkMode } = useDarkLightMode();

  return (
    <div
      className={`font-orbitron grid grid-cols-1 lg:grid-cols-2  w-screen h-screen sm:bg-cover sm:bg-center bg-no-repeat lg:bg-contain lg:bg-right ${lightMode ? "dark" : "light"
        }`}
    >
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

          </div>
          <div className="flex items-center justify-center flex-col h-1/3 mt-28 lg:ml-28">
            <h3>Join A Chat</h3>

            <Inputs
              type="text"
              label="Name"
              ph="who are you?"
              onChangeFn={(event) => { setUsername(event.target.value) }}
            />

            <Inputs
              type="text"
              label="Room"
              ph="choose a room"
              onChangeFn={(event) => {
                setRoom(event.target.value);
              }}
            />
       
          </div>
          <div className="lg:ml-28">
          <Button onClick={joinRoom}>Join A Room</Button> 
          <Button className="border border-1 p-1" onClick={handleLogout}>
            logout
          </Button>
          </div>
        </div>
      ) : (
        <>
          <Chat socket={socket} username={username} room={room} />
          <Button onClick={handleLogout}>
            Logout
          </Button>

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

