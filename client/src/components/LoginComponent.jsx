//module
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// ui
import { Link } from "react-router-dom";
import { Button, MediaButtons } from "./ui/Buttons.jsx";
import { FacebookIcons, GoogleIcons } from "../assets/Icons.jsx";
import { Inputs } from "./ui/Inputs.jsx";
import { useDarkLightMode } from "../context/data/dataStore.jsx";

//api
import { loginRequest, profileRequest } from "../context/api/auth.jsx";

//context
import { useProfileStore } from "../context/data/dataStore.jsx";
import { useEffect } from "react";
import { Facebook } from "lucide-react";

export const LoginComponent = () => {
  const [input, setInput] = useSearchParams({ i: "" });
  const inputParam = input.get("i");

  const { setLogin, setLogout, resetProfile } = useProfileStore(); //benutze die globale variable um login und userobjekte einzusetzen und um zuverteilen
  const { isOnline } = useProfileStore((state) => state.defaultProfile);
  const navigate = useNavigate();

  const loginHandler = loginRequest(); //loginhandler ist einen object der fast alle bedingungensfälle enthält
  const { isSuccess, isError, isIdle} = loginHandler;

  if (isSuccess) {
    //falls erfolgreich eingeloggt ist,  dann setze globale isOnline auf true, erstelle neue profilerequest  und ändere die userdaten
    setLogin();
    navigate("/chat", { replace: true });
  }

  const { lightMode, setDarkMode } = useDarkLightMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginHandler.mutate({
      email: e.target[0].value,
      password: e.target[1].value,
    });

    console.log(e.target[0].value, e.target[1].value);
    

  };

  const google = () => {
    window.open("http://localhost:3000/auth/google", "_self");

  };
  const facebook = () => {
    window.open("http://localhost:3000/auth/facebook", "_self");
  };

  const inputProps = {
    ph: "Your Password",
    type: "password",
    label: "enter password",
  };
  return (
    <div
      className={`font-orbitron grid grid-cols-1 lg:grid-cols-2  w-screen h-screen sm:bg-cover sm:bg-center bg-no-repeat lg:bg-contain lg:bg-right ${lightMode ? "dark" : "light"
        }`}
    >
      <div className="flex items-center justify-center  bg-cover  h-screen">
        <div className=" flex flex-col justify-evenly items-center w-2/3 lg:w-auto h-screen">
          <div className=" m-10 h-screen-sm w-screen-sm  border border-slate-400 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
            <h1 className="text-4xl text-blue-600 text-center mb-6">LOGIN</h1>

            <MediaButtons window={google}>
              <GoogleIcons />sign in with google
            </MediaButtons>
            <MediaButtons window={facebook}>
              <FacebookIcons />sign in with facebook
            </MediaButtons>
            <form onSubmit={handleSubmit}>
              <Inputs
                label="enter email"
                ph="Your Email"
                type="email"
                value={inputParam}
                onChangeFn={(
                  e // hier werden alle inputs im url gespeichert
                ) =>
                  setInput(
                    (prev) => {
                      prev.set("i", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              >
                your email
              </Inputs>
              <Inputs {...inputProps}>your password</Inputs>
              <div>
                <div>
                  <input type="checkbox" name="checkbox" id="checkbox" />
                  <label htmlFor="checkbox" className=" text-center">
                    Remember Me
                  </label>
                  <Link to="/ResetPassword">
                    <p className="text-cyan-400 hover:text-cyan-200">
                      Forgot Password
                    </p>
                  </Link>
                </div>
              </div>
              <div>
                <Button>Login</Button>
                <Link to="/Signup">
                  <Button className="text-white">Sign In</Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
