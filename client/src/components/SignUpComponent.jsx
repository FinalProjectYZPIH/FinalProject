import React, { useEffect } from "react";
import "../index.css";
// import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/Buttons";
import { Inputs } from "./ui/Inputs";
import backgroundImages from "../../tailwind.config.js";
import { useColorStore, useDarkLightMode } from "../context/data/dataStore";
import { registerRequest } from "../context/api/auth.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export const SignUpComponent = () => {
  const { lightMode, setDarkMode } = useDarkLightMode();
  const register = registerRequest();

  const [password, setPassword] = useState("");
  const [input, setInput] = useSearchParams({
    firstname: "",
    lastname: "",
    username: "",
    birthday: "",
    email: "",
    emailConfirmation: "",
  });
  const firstnameParam = input.get("firstname");
  const lastnameParam = input.get("lastname");
  const usernameParam = input.get("username");
  const birthdayParam = input.get("birthday");
  const emailParam = input.get("email");
  const emailConfirmationParam = input.get("emailConfirmation");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.firstname.value);
    register.mutate({
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      username: e.target.username.value,
      birthday: e.target.birthday.value,
      email: e.target.email.value,
      emailConfirmation: e.target.emailConfirmation.value,
      password: password,
      passwordConfirmation: e.target.passwordConfirmation.value,
    });
  };

  return (
    <div
      className={`font-orbitron grid grid-cols-1 lg:grid-cols-2 w-screen h-screen sm:bg-cover sm:bg-center bg-no-repeat lg:bg-contain lg:bg-right ${
        lightMode ? "dark" : "light"
      }`}
    >
      <div className="flex items-center justify-center bg-cover h-screen">
        <div className="flex flex-col justify-evenly items-center">
          <div className="h-full w-screen-sm border border-slate-400 rounded-md px-10 py-7 mt-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
            <h1 className="text-4xl text-blue-600 text-center">SIGN UP</h1>
            <form onSubmit={handleSubmit}>
              <Inputs
                label="First Name"
                ph="Enter your first name"
                type="text"
                value={firstnameParam}
                onChangeFn={(
                  e // hier werden alle inputs im url gespeichert
                ) =>
                  setInput(
                    (prev) => {
                      prev.set("firstname", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              ></Inputs>
              <Inputs
                label="Last Name"
                ph="Enter your last name"
                type="text"
                value={lastnameParam}
                onChangeFn={(
                  e // hier werden alle inputs im url gespeichert
                ) =>
                  setInput(
                    (prev) => {
                      prev.set("lastname", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              ></Inputs>
              <Inputs
                label="User Name"
                ph="Choose your User name"
                type="text"
                value={usernameParam}
                onChangeFn={(
                  e // hier werden alle inputs im url gespeichert
                ) =>
                  setInput(
                    (prev) => {
                      prev.set("username", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              ></Inputs>
              <Inputs
                label="Birthday"
                ph="Your Birthday"
                type="text"
                value={birthdayParam}
                onChangeFn={(
                  e // hier werden alle inputs im url gespeichert
                ) =>
                  setInput(
                    (prev) => {
                      prev.set("birthday", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              ></Inputs>
              <Inputs
                label="Email"
                ph="Your Email"
                type="email"
                value={emailParam}
                onChangeFn={(
                  e // hier werden alle inputs im url gespeichert
                ) =>
                  setInput(
                    (prev) => {
                      prev.set("email", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              ></Inputs>
              <Inputs
                label="Confirm Email"
                ph="Confirm Email"
                type="email"
                value={emailConfirmationParam}
                onChangeFn={(
                  e // hier werden alle inputs im url gespeichert
                ) =>
                  setInput(
                    (prev) => {
                      prev.set("emailConfirmation", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              ></Inputs>
              <Inputs
                label="Password"
                value={password}
                onChangeFn={(e) => setPassword(e.target.value)}
                ph="Choose a password"
                type="password"
              />
              <Inputs
                label="Confirm Password"
                ph="confirm password"
                type="password"
              />
              <div className="text-center">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label htmlFor="checkbox" className="text-cyan-400 p-5">
                  agree2theTermsOfUse
                </label>
              </div>
              <Button>Sign In</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
