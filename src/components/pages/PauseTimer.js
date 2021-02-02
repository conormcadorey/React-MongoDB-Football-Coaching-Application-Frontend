import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import { changeTimer } from "./../../redux/timerSlice";

export default function PauseTimer() {

    const isRunning = useSelector((state) => state.timer);

    const dispatch = useDispatch();

        return (
            <div className="timer">

            {isRunning ? (
                <Button 
                fullWidth="true" 
                onClick={() => dispatch(changeTimer())}>
                   PAUSE MATCH
                </Button>
            ) : (
                <Button 
                fullWidth="true" 
                onClick={() => dispatch(changeTimer())}>
                    RESUME MATCH
                </Button>
            )
            }

            </div>   
        );
}






/*
<div className="timer">

            {isRunning ? (
                <Button 
                fullWidth="true" 
                onClick={() => {
                    setIsRunning(false);    
                }}>
                   PAUSE MATCH
                </Button>
            ) : (
                <Button 
                fullWidth="true" 
                onClick={() => {
                    setIsRunning(true);
                }}>
                    RESUME MATCH
                </Button>
            )
            }

                <button disabled={!isRunning} onClick={() => {
                    setIsRunning(false);
                    setSeconds(0);
                }}>
                    RESET
                </button>

                </div>   
*/