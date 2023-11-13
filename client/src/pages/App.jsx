import React from "react";
import ChatSidebar from "../components/ChatSidebar";
import { Outlet } from "react-router-dom";
import ContactSidebar from "../components/ContactSidebar";

export default function App() {
  return (
    <div className='flex justify-evenly mt-6'>
      <ChatSidebar />
      <Outlet />
      <ContactSidebar />
    </div>
  );
}
