import { useState } from "react";
import { LoginComponent } from "../components/LoginComponent.jsx";
// import { useAuthStore } from '../context/data/dataStore.jsx';
import { useProfileStore } from "../context/data/dataStore.jsx";
import { useLoginRequest } from "../context/api/auth.jsx";
const Login = () => {
  const { defaultProfile, setLogin, setLogout } = useProfileStore();

  // const {isOnline,setLogin, setLogout} = useAuthStore()

  const [loginData, setLoginData, loginMutation] = useLoginRequest();

  const {
    data: userdata,
    isLoading,
    isSuccess,
    error,
    isError,
  } = loginMutation;

  // const {isOnline } = defaultProfile;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   console.log("Form data submitted:", formData);
  //   setLogout()

  // };

  // const handleLogin = (e) => {
  //   e.preventDefault()
  //   setLogin()

  // }

  const handleSumit = async (e) => {
    e.preventDefault();
    await setLoginData({...formData});
  };
  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSumit}>
          <div>
            <label htmlFor="username">Benutzername:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {/* <button className='border border-1 mx-2 p-1' type="submit" onClick={handleLogout}>logout</button>
        <button className='border border-1 mx-2 p-1' type="submit" onClick={handleLogin}>login</button> */}
          <button className="border border-1 mx-2 p-1" type="submit">
            submit
          </button>
        </form>
      </div>
      {/* {`${defaultProfile.isOnline}`} */}
      {isLoading
        ? "loding........."
        : isError
        ? `${error}`
        : isSuccess
        ? `${userdata}`
        : "Unknown Mistake........."}

      {/* <LoginComponent /> */}
    </>
  );
};

export default Login;
