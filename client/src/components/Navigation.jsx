import React, { useState } from "react";
import { useDarkLightMode, useProfileStore } from "../context/data/dataStore";
import { CloudMoon, Sun, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";

// Beipiel
export default function Navigation() {
  const { lightMode, setDarkMode } = useDarkLightMode();
  const { isOnline, contacts, notifications, avatar, settings, chatRooms } =
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

  const PageNav = [
    { path: "/", name: "Home", isMember: false }, // kann auch bei path componente sein
    // { path: "/about", name: "About", isMember: false },
    { path: "/login", name: "Login", isMember: false },
    { path: "/chat", name: "Chat", isMember: true },
    // { path: "/account", name: "Account", isMember: true },
  ];
  const handleLogout = async (e) => {
    e.preventDefault();
    setLogout();
    if (isOnline === false) {
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
      </div>
      <form>
        <input
          className="w-32 h-7 pl-4 pr-8 text-gray-900 rounded-full outline-cyan-400"
          id="search"
          type="search"
          placeholder="Search..."
        />
      </form>
      <div className="flex items-center mx-2">
        {isOnline && <div>{UserNav.friends}</div>}
        <img
          className="w-8 h-8 rounded-full ml-2 border border-cyan-400"
          src={UserNav.avatar}
          alt="Profile"
        />
      </div>
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
