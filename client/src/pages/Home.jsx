import { Outlet } from "react-router-dom";
import { useSocketProvider } from "../context/data/SocketProvider";
import { HomeComponent } from "../components/HomeComponent";
import { useProfileStore } from "../context/data/dataStore";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const socket = useSocketProvider();
  const { isOnline, setLogin } = useProfileStore(
    (state) => state.defaultProfile
  );
  const { resetProfile } = useProfileStore();

  const navigate = useNavigate();
  function sendMessage(event) {
    event.preventDefault();
    socket.emit("message", { message: "hello" });
  }



    // Hier wird die useQuery-Hook innerhalb der React-Komponente verwendet
    // const { data: userData, isSuccess, isError } = refreshRequest("validUser");
    // console.log(userData)
    // if (isError) {
    //   console.log("hi")
    //   toast.error("Fehler beim Aktualisieren des Tokens");
    // } else if (isSuccess) {
    //   setLogin();
    //   toast.success("Erfolgreich ausgelesen");
    //   if (isOnline === true) navigate("/chat");
    // }




  return (
    <div className="">
         
      <Outlet />
      <HomeComponent />
    </div>
  );
}

// import { Outlet } from "react-router-dom";
// import io from "socket.io-client";
// import { useColorStore, useDarkLightMode } from "../context/data/dataStore";
// import toast from "react-hot-toast";
// import axios from "axios"

// const socket = io.connect("http://localhost:3000");
// export default function Home() {
//   const dataFetch = axios.get("http://localhost:3000/api/user")

//   function sendMessage(event) {
//     event.preventDefault();
//     socket.emit("message", { message: "hello" });
//   }

//   const { colorPosition, setColorPosition, setSpecificColor, color } =
//     useColorStore();

//   const {lightMode, setDarkMode } = useDarkLightMode()
//   return (
//     <div className="">
//       <Outlet />
//       Home
//       {/* {ThemeColors[colorPosition]} */}
//       {console.log(color)}
//       {color}
//       <div
//         style={{ backgroundColor: color, width: "100px", height: "100px" }}
//       ></div>
//       <div className={`${color} w-full h-10 font-bold`}>
//         {" "}
//         FONT TEST
//       </div>{" "}
//       <button
//         className="border border-1 mx-2 rounded p-1"
//         onClick={() => setColorPosition()}
//       >
//         NEXT
//       </button>
//       <button
//         className="border border-1 mx-2 rounded p-1"
//         onClick={() => setSpecificColor(0)}
//       >
//         SET POSITION
//       </button>
//       {/* siehe documentation >> https://react-hot-toast.com/docs/toast */}
//       <button
//         onClick={() => toast.success("Hello World", { position: "right" })}
//         className="bg-green-400 border border-1 mx-2 rounded p-1"
//       >
//         TOAST SUCCESS
//       </button>
//       <button
//         onClick={() => toast.error("Hello World", { icon: "😆⛔" })}
//         className="bg-green-400 border border-1 mx-2 rounded p-1"
//       >
//         TOAST ERROR
//       </button>
//       <button
//         onClick={() => toast.loading("Hello World", { duration: 2000 })}
//         className="bg-green-400 border border-1 mx-2 rounded p-1"
//       >
//         TOAST LOADING
//       </button>
//       <button
//         onClick={() =>
//           toast.custom(
//             <div className="font-bold text-blue-500 border border-2 p-2">
//               HELLO WORLD
//             </div>
//           )
//         }
//         className="bg-green-400 border border-1 mx-2 rounded p-1"
//       >
//         TOAST CUSTOME
//       </button>
//       <button
//         onClick={() =>
//           toast.promise(dataFetch, {
//             loading: "Loading",
//             success: (data) => `Successfully saved ${data[0].username}`,
//             error: (err) => `This just happened: ${err.toString()}`,
//           })
//         }
//         className="bg-green-400 border border-1 mx-2 rounded p-1"
//       >
//         TOAST PROMISE
//       </button>
//       <button
//         onClick={() => lightMode && toast.success("Hello World")}
//         className="bg-green-400 border border-1 mx-2 rounded p-1"
//       >
//         TOAST CONDITION
//       </button>
//       {lightMode ? "Light  " : "Dark  "}
//         <button onClick={setDarkMode} className="border border-1 p-2 rounded">SwitchLight</button>
//       {/* <p className="bg-black text-white w-full h-4">{color} </p> */}
//       {/* Socket Io Testing */}
//       <form action="">
//         <input type="text" placeholder="Write messages" />
//         <button type="submit" onClick={sendMessage}>
//           Send Message
//         </button>
//       </form>
//     </div>
//   );
// }
