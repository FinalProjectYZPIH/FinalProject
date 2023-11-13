import ProtectionProvider from "../../context/auth/ProtectionProvider";
import { useProfileStore } from "../../context/data/dataStore";
import { Routes, Route } from "react-router-dom";
import ChatDashboard from "../ChatDashboard";
import GroupChat from "../../components/GroupChat";
import App from "../App";
import Navigation from "../../components/Navigation";


export default function RootLayout() {
  const { isOnline } = useProfileStore((state) => state.defaultProfile);
  console.log(isOnline);

  return (
    // <>
    <ProtectionProvider isAllowed={isOnline}>
{/* <Navigation /> */}
<Navigation />
      <Routes>
        {/* <Route path="" element={<Navigate to="/chat" />} /> */}
        <Route path="chat" element={<App />}>
          <Route path="" element={<ChatDashboard />} />
          <Route path=":chatName" element={<GroupChat />} />
        </Route>
      </Routes>
    </ProtectionProvider>
    // </>
  );
}
