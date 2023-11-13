import React, { useState } from "react";
import { useDarkLightMode, useProfileStore } from "../context/data/dataStore";
import { logoutRequest } from "../context/api/auth";
import { CloudMoon, Sun, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
import { Button } from "@mui/material";
import FriendRequests from "../components/FriendRequests"
import Search from "./Search";


// Beipiel
export default function Navigation() {
  const [friendsRequestsList, setFriendsRequestsList] = useState(false)

  const {userIdDB} = useProfileStore(state => state.defaultProfile)

  const { lightMode, setDarkMode } = useDarkLightMode();
  const { isOnline, notifications, avatar, settings, chatRooms, contacts } =
    useProfileStore((state) => state.defaultProfile);
  const navigate = useNavigate();
  const { setLogout } = useProfileStore();

  const UserNav = {
    friends: contacts,
    notifications: notifications,
    rooms: chatRooms,
    isOnline: isOnline,
    avatar: avatar || "",
    config: settings,
  };

  const clearCookies = logoutRequest();

  const PageNav = [
    { path: "/", name: "Home", isMember: false }, // kann auch bei path componente sein
    // { path: "/about", name: "About", isMember: false },
    { path: "/login", name: "Login", isMember: false },
    // { path: "/logout", name: "Logout", isMember: true },
    { path: "/chat", name: "Chat", isMember: true },
    // { path: "/account", name: "Account", isMember: true },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    setLogout() && toast.success("You are logged out");
    if (isOnline === false) {
      clearCookies.mutate();
      navigate("/", { replace: true });
    }
  };

  return (
    <div
      className={`fixed top-0 flex justify-between items-center w-full h-9 shadow-lg ${
        lightMode ? "text-white" : "text-black"
      }`}
    >
      <div className="flex w-2/3 h-full rounded-lg sm:pl-0">
        {PageNav.map((navObj) =>
          !navObj.isMember || isOnline ? (
            <div
              className="flex items-center justify-center bg-transparent hover:border-y-teal-400 hover:bg-cyan-400 text-sky-400 hover:text-white hover:bg-opacity-1 hover:border-transparent w-20 rounded-lg mx-0.5"
              key={navObj.path}
            >
              <Link to={navObj.path}>{navObj.name}</Link>
            </div>
          ) : null
        )}
        <div className="flex items-center justify-center bg-transparent hover:border-y-teal-400 hover:bg-cyan-400 text-sky-400 hover:text-white hover:bg-opacity-1 hover:border-transparent w-20 rounded-lg mx-0.5">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <Search/>

      <div className="flex items-center mx-2">

        <img
          className="w-8 h-8 rounded-full ml-2 border border-cyan-400"
          src={UserNav.avatar}
          alt="Profile"
        />
      </div>

      <Button onClick={()=>{setFriendsRequestsList(!friendsRequestsList)}}>
         Req
      </Button>
      {friendsRequestsList === true &&
        <FriendRequests userId = {userIdDB} />}


      <ReactSwitch
        onChange={setDarkMode}
        checked={lightMode}
        offColor={"#3b82f6"}
        onColor={"#D0D0D0"}
        checkedIcon={<CloudMoon />}
        uncheckedIcon={<Sun />}
      />
    </div>
  );
}
