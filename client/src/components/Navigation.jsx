import { useDarkLightMode, useProfileStore } from "../context/data/dataStore";
import { CloudMoon, Sun, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
import { logoutRequest } from "../context/api/auth";

// Beipiel
export default function Navigation() {
  const { lightMode, setDarkMode } = useDarkLightMode();
  const { isOnline, notifications, avatar, settings, chatRooms, contacts } =
    useProfileStore((state) => state.defaultProfile);
  const navigate = useNavigate();
  const { setLogout } = useProfileStore();

  const clearCookie = logoutRequest();

  const UserNav = {
    friends: contacts,
    notifications: notifications,
    rooms: chatRooms,
    isOnline: isOnline,
    avatar: avatar || "",
    config: settings,
  };

  const PageNav = [
    { path: "/", name: "Home", isMember: false }, // kann auch bei path componente sein
    { path: "/login", name: "Login", isMember: false },
    { path: "/chat", name: "Chat", isMember: true },
  ];
  const handleLogout = async (e) => {
    e.preventDefault();
    setLogout();
    if (isOnline === false) {
      clearCookie.mutate()
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex justify-between p-1 w-full h-6">
      <div className=" flex justify-between w-1/2">
        {PageNav.map((navObj) =>
          !navObj.isMember || isOnline ? (
            <div className="">
              <Link key={navObj.path} to={navObj.path}>
                {navObj.name}
              </Link>
            </div>
          ) : null
        )}
      </div>

      <div>Suchleiste</div>
      {/*Wenn hier gehovert wird kann das UserNav aufgerufen werden oder soll man anders machen?*/}
      <div className="">
        profile
        {isOnline ? (
          <div className="">
            {/*UserNav*/} <button onClick={handleLogout}>Logout</button>
          </div>
        ) : null}
      </div>

      <ReactSwitch
        onChange={setDarkMode}
        checked={!lightMode}
        offColor={"#3b82f6"}
        onColor={"#D0D0D0"}
        checkedIcon={<CloudMoon />}
        uncheckedIcon={<Sun />}
      />
    </div>
  );
}
