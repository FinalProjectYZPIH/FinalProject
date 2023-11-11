import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import AuthLayout from "./pages/layout/AuthLayout";
import Signup from "./pages/Signup";
import RootLayout from "./pages/layout/RootLayout";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import { AppWrapper } from "./context/data/AppWrapper";
import ChatDashboard from "./pages/ChatDashboard";
import { ResetPassword } from "./pages/ResetPassword";
import { Impressum } from "./pages/Impressum";
import Login from "./pages/Login";
import GroupChat from "./components/GroupChat";
import SingleChat from "./components/SingleChat";
import ChatSidebar from "./components/ChatSidebar";
// import ChatTest from "./components/ChatTest";

// function App() {

//   return (
//     <>
//       <div>Hello World</div>
//     </>
//   )
// }

// export default App

export const router = createBrowserRouter(
  //Template für React-router-dom
  createRoutesFromElements(

      <Route element={<AppWrapper />}>
        <Route index path="/" element={<Home />}></Route>
        {/* <Route path="chat" element={<RootLayout />}> */}
          {/* <Route path="" element={<ChatDashboard />} /> */}

          {/* <Route path=":chatName" element={<GroupChat />} /> */}
        {/* </Route> */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="signup" element={<Signup />} />
          <Route path="impressum" element={<Impressum />} />
        </Route>
        <Route path="*" element={<RootLayout />} />
      </Route>

  )
);
