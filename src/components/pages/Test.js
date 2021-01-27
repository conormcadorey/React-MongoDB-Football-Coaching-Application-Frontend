import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import ErrorNotice from "../Errors";

export default function Test() {
  //state
  const [name, setName] = useState();
  const [position, setPosition] = useState();
  const [number, setNumber] = useState();

  const [error, setError] = useState();

  //enable context
  //destructure logged in users data
  const {userData} = useContext(UserContext);
  //enable history
  const history = useHistory();

  useEffect(() => {
    //if userData undefined redirect to login 
    if (!userData.user) history.push("/login");
  });

  //submit form function
  const submit = async (e) => {
    e.preventDefault(); //prevent reload 
    //get current form state to add to object
    //use axios to send the newUser object with headers
    try {
      const newPlayer = { name, position, number };
      let token = localStorage.getItem("auth-token");
      const url = "http://localhost:5000/players";
      console.log("THE TOKEN:");
      console.log(token);

      axios.post(`${url}/`, newPlayer, {
        headers: {
            "Authorization": token
        }
    })
      //redirect user
      history.push("/myteam");
    } catch (err) {
      //errors
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
          <label htmlFor="register-player-name">Name</label>
          <input
            id="register-player-name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
  
          <label htmlFor="register-player-position">Position</label>
          <input
            id="register-player-position"
            type="text"
            onChange={(e) => setPosition(e.target.value)}
          />

          <label htmlFor="register-player-number">Player Number</label>
          <input
            id="register-player-number"
            type="text"
            onChange={(e) => setNumber(e.target.value)}
          />
  
          <input type="submit" value="Register" />
        </form>
      </div>  
    );
}