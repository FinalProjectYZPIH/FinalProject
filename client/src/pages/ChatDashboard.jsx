import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";
export default function ChatDashboard() {

  const {defaultProfile, setLogout } = useProfileStore();

  const {isOnline} = defaultProfile;




  const { data: userData, isSuccess } = profileRequest("user") ;



const handleLogout = async (e) => {
  e.preventDefault();
  setLogout()
}

  return (
    <div>ChatDashboard testtest

       {isOnline && isSuccess ? `${userData.data.firstname}` : "failed to fetching userdata"}


       <button className="border border-1 p-1" onClick={handleLogout}>logout</button>
    </div>
  )
}
