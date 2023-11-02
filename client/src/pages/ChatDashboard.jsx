import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
import { useState } from "react";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";
import useSocketIo from "../libs/useSocketio";

export default function ChatDashboard() {
  const { defaultProfile, setLogout, setProfile, resetProfile } =
    useProfileStore();

  const { isOnline, userId, role, username, email } = useProfileStore(
    (state) => state.defaultProfile
  );

  let testname = "mainUser";
  const navigate = useNavigate();
  const { data: userData, isSuccess } = profileRequest("Yan");
  // console.log(userData.data);
  setProfile({
    userId: userData?.data?.userId,
    role: userData?.data?.role,
    username: userData?.data?.username,
    email: userData?.data?.email,
    avatar: "avatar",
  });

  console.log(userId, role, username, email);
  const { socket, sendMessage, createRoom } = useSocketIo(testname);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log(room);
      // createRoom erstellt mit dem key "groupRoom oder singleRoom einen RoomObject der für Messages als einen Platzhalter gedacht ist "
      const data = createRoom(
        {
          attachMessages: [`welcome to ${room}`],
          attachParticipants: ["user1", "user2"],
          attachComments: [{ like: 1 }],
          groupchat: true,
        },
        room
      );
      console.log(data);
      // socket.emit("join_room", room);
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
          <Chat socket={socket} username={testname} room={room} />
        </>
      )}
    </div>
  );
}
