import React, { useEffect, useState } from "react";

import {
  useDarkLightMode,
  useProfileStore,
  useColorStore,
} from "../context/data/dataStore";
import { logoutRequest } from "../context/api/auth";
import { AlignJustify, CloudMoon, Sun, User, UserPlus2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
import { Button } from "@mui/material";
import FriendRequests from "../components/FriendRequests";
import SearchFriends from "./SearchFriends";
import DropdownColor from "./ui/DropdownColor";
import { is } from "date-fns/locale";

// Beipiel
export default function Navigation() {
  const [friendsRequestsList, setFriendsRequestsList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { userIdDB, username } = useProfileStore(
    (state) => state.defaultProfile
  );

  const { lightMode, setDarkMode } = useDarkLightMode();
  const { color } = useColorStore();

  const { isOnline, notifications, avatar, settings, chatRooms, contacts } =
    useProfileStore((state) => state.defaultProfile);
  const navigate = useNavigate();
  const { setLogout, resetProfile } = useProfileStore();

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
    // { path: "/login", name: "Login", isMember: false },
    // { path: "/logout", name: "Logout", isMember: true },
    { path: "/chat", name: "Chat", isMember: true },
    // { path: "/account", name: "Account", isMember: true },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();

    setLogout();
    clearCookies.mutate();
    resetProfile();

    // if (isOnline === false) {
    //   clearCookies.mutate();
    //   setLogout();
    // }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-10 flex justify-between items-center w-full h-10 shadow-lg rounded-sm ${color} ${
        lightMode ? " bg-neutral-900" : " bg-white"
      }`}
    >
      <div className={`flex w-1/3`}>
        <button className={`md:hidden`} onClick={toggleNavbar}>
          <AlignJustify size={32} className={`${color} border-0`} />
        </button>
        <div
          className={`md:flex md:justify-between h-8 ${
            isOpen
              ? `${
                  lightMode ? " bg-neutral-900" : " bg-white"
                } sm:flex-col sm:px-5 sm:fixed sm:top-10 sm:my-5 sm:left-2 sm:h-48 sm:w-32 sm:rounded-lg ${color}}`
              : "hidden"
          }`}
        >
          {PageNav.map((navObj) =>
            !navObj.isMember || isOnline ? (
              <div
                className={`flex items-center justify-center bg-transparent hover:text-cyan-400 hover: w-20 rounded-lg mx-0.5 sm:mb-5 md:mb-0 ${color} border-0`}
                key={navObj.path}
              >
                <Link to={navObj.path}>{navObj.name}</Link>
              </div>
            ) : null
          )}
          <div
            className={`flex items-center justify-center bg-transparent hover:text-cyan-400 hover:bg-opacity-1 hover:border-transparent w-20 rounded-lg mx-0.5 ${color} border-0`}
          >
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="lg:w-[40%] sm:w-[60%] fixed right-2 flex justify-between items-center">
        {/* <div className="w-52">
          <form>
            <input
              className="sm:hidden lg:flex w-32 focus:w-52 h-8 pl-4 pr-8 text-gray-900 rounded-full border border-cyan-400 outline-cyan-400"
              id="search"
              type="search"
              placeholder="Search..."
            />
          </form>
        </div> */}
        <div className="w-9">
          <img
            className={`${color} w-8 h-8 rounded-full`}
            src={UserNav.avatar}
            alt="Profile"
          />
        </div>
        
          <p className={`${color} border-0 text-lg`}>
            {username}
          </p>

          <div className="h-8">
            <Button
              onClick={() => {
                setFriendsRequestsList(!friendsRequestsList);
              }}
            >
              <UserPlus2 size={26} className={`${color} border-0`} />
            </Button>
            {friendsRequestsList === true && <FriendRequests />}
          </div>
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
    </div>
  );
}
