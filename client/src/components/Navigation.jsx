
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
import { ColorTheme } from "./ui/ColorTheme";
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
  const { color } =

    useColorStore();

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
      className={`fixed top-0 left-0 z-10 flex justify-between items-center w-full h-10 shadow-lg ${
        lightMode ? " bg-neutral-900" : " bg-white"
      }`}
    >

      <div className={`flex w-3/5`}>
        <button className={`md:hidden`} onClick={toggleNavbar}>
          <AlignJustify size={32} color="#22d3ee" />
        </button>
        <div
          className={` md:flex md:justify-between h-8 ${
            isOpen
              ? `${
                  lightMode ? " bg-neutral-900" : " bg-white"
                } sm:flex-col sm:index-10 sm:px-5 sm:fixed sm:top-10 my-5 sm:left-2 sm:h-48 sm:w-32 sm:border sm:border-cyan-400 sm:rounded-lg`
              : "hidden"
          }`}
        >
          {PageNav.map((navObj) =>
            !navObj.isMember || isOnline ? (
              <div
                className="flex items-center justify-center bg-transparent hover:border-y-teal-400 hover:bg-cyan-400 text-sky-400 hover:text-white hover:bg-opacity-1 hover:border-transparent w-20 rounded-lg mx-0.5 sm:mb-5 md:mb-0"
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
      </div>
      {/* <div className="flex items-center justify-between w-96">

        <div className="w-52">
          <form>
            <input
              className="w-32 focus:w-52 h-8 pl-4 pr-8 text-gray-900 rounded-full border border-cyan-400 outline-cyan-400"
              id="search"
              type="search"
              placeholder="Search..."
            />
          </form>
        </div>
      </div> */}
      <div className="flex items-center mx-2">
        <img
          className="w-8 h-8 rounded-full border border-cyan-400"
          src={UserNav.avatar}
          alt="Profile"
        />

          <p className={`${lightMode ? "text-white" : `${color}`}`}>{username}</p>


        <div className="h-8 w-12">
          <Button
            onClick={() => {
              setFriendsRequestsList(!friendsRequestsList);
            }}
          >
            <UserPlus2 color="#22d3ee" />

            
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
