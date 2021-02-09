import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../context/UserContext";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SettingsIcon from '@material-ui/icons/Settings';

export default function AuthOptions() {

    const { userData, setUserData } = useContext(userContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const history = useHistory();

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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <nav className="auth-options">
            {
            userData.user ? (
        <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <SettingsIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => history.push("/myaccount")}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Team admin</MenuItem>
                <MenuItem onClick={handleClose}>Messages</MenuItem>
                <MenuItem onClick={handleClose}>Help</MenuItem>
            </Menu>
            <Button aria-controls="simple-menu" onClick={logout}>Log out</Button>
        </>
        ) : (
        <>
          <Button aria-controls="simple-menu" onClick={register}>Register</Button>
          <Button aria-controls="simple-menu" onClick={login}>Log in</Button>
        </>
        )}
        </nav>
    );
}