import { useProfileStore } from "../context/data/dataStore";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 5);

export default function ChatSidebar() {
  const { chatRooms, contacts } = useProfileStore(
    (state) => state.defaultProfile
  );

  console.log(chatRooms);
  console.log(contacts);


    const handleClick = () => {

    }

  return (
    <div>
      Chatsidebar
      {chatRooms.map((room) => {
        if (room.singleroom) {
          return (
            <div className="cursor-pointer" onClick={handleClick} key={nanoid()}>
              {room.singleroom.participants[1]}
            </div>
          );
        } else if (room.grouproom) {
          return (
            <div className="cursor-pointer" onClick={handleClick} key={nanoid()}>{room.grouproom.chatName}</div>
          );
        }
      })}
    </div>
  );
}
