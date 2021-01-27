import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../Errors";

export default function Register() {
  //state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [userName, setUserName] = useState();
  const [error, setError] = useState();

  //enable context
  //destructure setUserData 
  const { setUserData } = useContext(UserContext);
  //enable history
  const history = useHistory();

  //submit form function
  const submit = async (e) => {
    e.preventDefault(); //prevent reload 
    //get current form state to add to object
    //use axios to send the newUser object with headers
    try {
      const newUser = { email, password, passwordCheck, userName };
      await Axios.post("http://localhost:5000/users/register", newUser);
      //on successful registration, create new user login request using context
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      //response returns token/user data
      //add data to context
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      //add token to local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      //redirect new user to homepage 
      history.push("/");
    } catch (err) {
      //if error exists, set error state
      //only executes if both statements true
      //ie if err msg is undefined = false 
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {/*if error- create an error notice component */}
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}

    <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-user-name">Username</label>
        <input
          id="register-user-name"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>  
  );
}