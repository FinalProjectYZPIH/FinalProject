//module
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


// ui
import { Link } from "react-router-dom";
import { Button } from "./Buttons.jsx";
import { Inputs } from "./Inputs.jsx";


//api
import { loginRequest, profileRequest } from "../context/api/auth.jsx";

//context
import { useProfileStore } from "../context/data/dataStore.jsx";
import { useEffect } from "react";

export const LoginComponent = () => {
  const [input, setInput] = useSearchParams({ i: "" });
  const inputParam = input.get("i");


  const { setLogin, setLogout } = useProfileStore(); //benutze die globale variable um login und userobjekte einzusetzen und um zuverteilen
  const { isOnline } = useProfileStore(state => state.defaultProfile);
  const navigate = useNavigate();
  const loginHandler = loginRequest(); //loginhandler ist einen object der fast alle bedingungensfälle enthält

  const { isSuccess } = loginHandler;

  if (isSuccess) {
    //falls erfolgreich eingeloggt ist,  dann setze globale isOnline auf true, erstelle neue profilerequest  und ändere die userdaten
    setLogin();
    navigate("/chat", { replace: true });
  }


const handleSubmit = async (e) => {
    e.preventDefault();
    loginHandler.mutate({
        email: e.target[0].value,
        password: e.target[1].value,
    });
    if (isOnline === false) {
      setLogout();
    }
};

  const google = () => {
    window.open("http://localhost:3000/auth/google", "_blank");
  };
  const inputProps = {
    ph: "Your Password",
    type: "password",
    label: "enter password",
  };
  return (
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
          <label htmlFor="checkbox" className="text-white">
            Remember Me
          </label>
        </div>

        <Button>Login</Button>
        <span className="text-white">Forgot Password</span>
      </div>
      <div>
        <span>
          New here?{" "}
          <Link to="/Signup">
            <Button className="text-white">Sign In</Button>
          </Link>{" "}
        </span>
      </div>
    </form>
  );
};
