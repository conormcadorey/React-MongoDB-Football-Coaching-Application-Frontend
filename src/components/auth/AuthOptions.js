import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../context/UserContext";
import SettingsIcon from '@material-ui/icons/Settings';

export default function AuthOptions() {

    //destructure userData and setUserData as seperate variables from userContext provider
    const { userData, setUserData } = useContext(userContext);

    const history = useHistory();

    //set up button links with useHistory
    const register = () => history.push("/register");
    const login = () => history.push("/login");
    //log out user button 
    //sets userData/token back to undefined 
    //then clear token from local storage
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };

    return (
         //if userData = true/isn't null then a user is logged in
        //show log out button
        //else if no userData, show register/login buttons
        <nav className="auth-options">
            {
            userData.user ? (
        <>
            <button><SettingsIcon /></button>
            <button onClick={logout}>Log out</button>
        </>
        ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
        )}
        </nav>
    );
}