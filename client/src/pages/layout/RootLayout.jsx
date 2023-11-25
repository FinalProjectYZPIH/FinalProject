import ProtectionProvider from "../../context/auth/ProtectionProvider";
import { useProfileStore } from "../../context/data/dataStore";

import { Navigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import ChatDashboard from "../ChatDashboard";
import GroupChat from "../../components/GroupChat";
import App from "../App";

import Navigation from "../../components/Navigation";
import { profileRequest } from "../../context/api/auth";
import { useSocketProvider } from "../../context/data/SocketProvider";

export default function RootLayout() {
  // const { isOnline } = useProfileStore((state) => state.defaultProfile);
  // console.log(isOnline);
  const {  setProfile, setContacts } =
    useProfileStore();
    const {setContact} = useSocketProvider();

  const { isOnline, userId, role, username, email, userIdDB, chatRooms } =
  useProfileStore((state) => state.defaultProfile);
  console.log(userId, role, username, email, userIdDB);
  const { data: userData, isSuccess, isError } = profileRequest("Yan");
  if (isSuccess) {
    setProfile({
      userIdDB: userData?.data?._id,
      userId: userData?.data?.userId,
      role: userData?.data?.role,
      username: userData?.data?.username,
      email: userData?.data?.email,
      avatar: userData?.data.avatarImage,
    });
    
  }
  
  // console.log(userData?.data?.friends)
  setContact(userData?.data?.friends)

  console.log(isSuccess)
  console.log(isOnline)

  if (isOnline === false) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <ProtectionProvider isAllowed={isOnline}>
        <Navigation />
        <Routes>
          {/* <Route path="" element={<Navigate to="/chat" />} /> */}
          <Route path="chat" element={<App />}>
            <Route path="" element={<ChatDashboard />} />
            <Route path=":chatName" element={<GroupChat />} />
          </Route>
        </Routes>
      </ProtectionProvider>
    </>
  );
}
