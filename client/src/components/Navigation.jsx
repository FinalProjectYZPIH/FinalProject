import React, { useState } from "react";
import { useDarkLightMode, useProfileStore, useColorStore } from "../context/data/dataStore";
import { logoutRequest } from "../context/api/auth";
import { CloudMoon, Sun, User, UserPlus2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
import { Button } from "@mui/material";
import FriendRequests from "../components/FriendRequests"
import Search from "./Search";
import { ColorTheme } from "./ui/ColorTheme";
import DropdownColor from "./ui/DropdownColor";



// Beipiel
export default function Navigation() {
  const [friendsRequestsList, setFriendsRequestsList] = useState(false)


  const {userIdDB, username} = useProfileStore(state => state.defaultProfile)


  const { lightMode, setDarkMode } = useDarkLightMode();
  const { colorPosition, setColorPosition, setSpecificColor, color } =
    useColorStore();

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
    clearCookies.mutate();
    // if (isOnline === false) {
    //   clearCookies.mutate();
    //   setLogout();
    // }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-10 flex justify-between items-center w-full h-10 shadow-lg ${lightMode ? " bg-neutral-900" : " bg-white"}`}
    >
      <div className={`flex justify-between w-2/3 h-full rounded-lg sm:pl-0 ${color}`} >
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

        <div className="w-52">
          <form>
            <input
              className="w-32 focus:w-52 h-8 pl-4 mt-0.5 pr-8 text-gray-900 rounded-full border border-cyan-400 outline-cyan-400"
              id="search"
              type="search"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>
      <div className="flex items-center mx-2">
        <img
          className="w-8 h-8 rounded-full ml-2 border border-cyan-400"
          src={UserNav.avatar}
          alt="Profile"
        />
      </div>


      <Button onClick={() => { setFriendsRequestsList(!friendsRequestsList) }}>
        <UserPlus2 color="#22d3ee" />

      <p className={`${lightMode ? " text-white" : " bg-white"}`}>{username}</p>

      </Button>
      {friendsRequestsList === true &&
        <FriendRequests userId={userIdDB} />}


      <DropdownColor />
      <ReactSwitch
        onChange={setDarkMode}
        checked={lightMode}
        offColor={"#22d3ee"}
        onColor={"#22d3ee"}
        checkedIcon={<CloudMoon />}
        uncheckedIcon={<Sun />}
      />
    </div>
  );
}
