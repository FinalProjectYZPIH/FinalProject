import React from "react";

export default function DisplayBoard() {
  return (
    <div className="joinChatContainer flex items-center flex-col">
      {" "}
      {/** Hier werden von remote aus alle message daten und auch lokale daten hinzugeügt */}
      <div className="w-1/2 h-1/2 bg-slate-200 flex justify-center ">
        Anzeigebildschirm für chats
      </div>
    </div>
  );
}
