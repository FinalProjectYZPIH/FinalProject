import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthLayout from "./pages/layout/AuthLayout";
import Signup from "./pages/Signup";
import RootLayout from "./pages/layout/RootLayout";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import { AppWrapper } from "./context/data/AppWrapper";
import ChatDashboard from "./pages/ChatDashboard";
import  Login  from "./pages/Login";

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
      <Route path="/" element={<Home />}>
        {/* <Route path=""element={<Navigation />} /> */}
      </Route>
      <Route path="/chat" element={<RootLayout />}>

        <Route path="" element={<ChatDashboard />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Route>
  )
);
