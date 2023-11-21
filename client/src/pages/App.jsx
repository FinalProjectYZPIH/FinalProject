import React, { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import { Outlet } from "react-router-dom";
import ContactSidebar from "../components/ContactSidebar";

export default function App() {
  const [showContact, setShowContact] = useState(false);
  return (
    <div className='flex mt-10'>
      <ChatSidebar />
      <Outlet />
      <ContactSidebar />
    </div>
  );
}
