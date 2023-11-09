import { Outlet } from "react-router-dom";
import ProtectionProvider from "../../context/auth/ProtectionProvider";
import { useProfileStore } from "../../context/data/dataStore";
import { Navigate } from "react-router-dom";
import ChatSidebar from "../../components/ChatSidebar";
<<<<<<< HEAD

export default function RootLayout() {
  const { isOnline } = useProfileStore((state) => state.defaultProfile);
  console.log(isOnline);

=======
import ContactSidebar from "../../components/ContactSidebar";

export default function RootLayout() {
  const { isOnline } = useProfileStore((state) => state.defaultProfile);
  // const {resetProfile} = useProfileStore()
  console.log(isOnline);

  // if(isOnline === false) {
  //   resetProfile()
  // }
>>>>>>> origin/yan
  return (
    <div className="flex justify-evenly mt-6">
      <ProtectionProvider isAllowed={isOnline}>
        <ChatSidebar />
        <Outlet />
<<<<<<< HEAD
=======
        <ContactSidebar />
>>>>>>> origin/yan
      </ProtectionProvider>
    </div>
  );
}
