import { useProfileStore } from "../context/data/dataStore";
import { profileRequest } from "../context/api/auth";

export default function ChatDashboard() {
  const { defaultProfile, setLogout } = useProfileStore();

  const { isOnline } = defaultProfile;

  const { data: userData, isSuccess } = profileRequest("user");

  const handleLogout = async (e) => {
    e.preventDefault();
    setLogout();
  };

  return (
    <div className="flex items-center flex-col ">
      <div className="w-1/2 h-1/2 bg-slate-200 flex justify-center ">
        Anzeigebildschirm
      </div>

      {isOnline && isSuccess ? (
        <div>{`${userData.data.firstname}`}</div>
      ) : (
        "failed to fetching userdata"
      )}
      <button className="border border-1 p-1" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
}
