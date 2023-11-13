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
import { AppWrapper } from "./context/data/AppWrapper";
import { ResetPassword } from "./pages/ResetPassword";
import { Impressum } from "./pages/Impressum";
import Login from "./pages/Login";


export const router = createBrowserRouter(
  //Template für React-router-dom
  createRoutesFromElements(

      <Route element={<AppWrapper />}>
        <Route index path="/" element={<Home />}></Route>
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
