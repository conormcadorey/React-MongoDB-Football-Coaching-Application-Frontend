import React from "react";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

export default function RedirectToLogin() {

    const history = useHistory();

    return (
        <div className="LoginNotice">   
        <p>Welcome to headr, the no1 application for amateur and youth football coaches!</p>
        <Button 
        fullWidth
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => history.push("/login")}
        >
            Login
        </Button>
        </div>   
    );
}