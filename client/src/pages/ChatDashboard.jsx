import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSocketIo from "../libs/useSocketio";
import GroupChat from "../components/GroupChat";

export default function ChatDashboard() {
  const { defaultProfile, setLogout, setProfile, resetProfile } =
    useProfileStore();

  const { isOnline, userId, role, username, email } = useProfileStore(
    (state) => state.defaultProfile
  );

  const navigate = useNavigate();
  const { data: userData, isSuccess, isError } = profileRequest("Yan");
  // console.log(userData.data);

  if(isSuccess){
    setProfile({
      userId: userData?.data?.userId,
      role: userData?.data?.role,
      username: userData?.data?.username,
      email: userData?.data?.email,
      avatar: "avatar",
    });
  }
  if(isError){
    window.location.reload()
    if(isOnline === false){
      navigate("/login")
    }
  }
    
  console.log(userId, role, username, email);
  const { socket, sendMessage, createRoom } = useSocketIo(username);
  const [roomname, setRoomname] = useState("");
  const [roomConfig, setRoomConfig] = useState({})
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && roomname !== "") {
      console.log(roomname);
      // createRoom erstellt mit dem key "groupRoom oder singleRoom einen RoomObject der für Messages als einen Platzhalter gedacht ist "
      const roomData = createRoom(
        {
          attachMessages: [  {
            sender: username,
            content: `welcome to ${roomname} Room`,
            likes: 0,
            emojis: [],
            images: [],
            voices: [],
            videos: [],
          }],
          attachParticipants: ["user1", "user2"],
          attachComments: [{ like: 1 }],
          groupchat: true,
        },
        roomname
      );
      
      console.log(roomData);
      setRoomConfig(roomData)
      // socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    setLogout();
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
          <h3>Create or Join a Existing ChatRoom</h3>
          <input
            className="border border-1"
            type="text"
            placeholder="Create or Join a Room"
            onChange={(event) => {
              setRoomname(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <>
          <GroupChat socket={socket} username={username} roomconfig={roomConfig} sendMessage={sendMessage}/>
        </>
      )}
    </div>
  );
}
