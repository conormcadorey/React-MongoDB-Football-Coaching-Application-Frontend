import React, {useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function TestTimer() {

    const isRunning = useSelector((state) => state.timer);

    const [seconds, setSeconds] = useState(0);
    const [intervalId, setIntervalId] = useState(null); 

    //setInterval to increase count to once every second
    useEffect(() => {
        //if timer is running 
        if (isRunning) {
        const id = window.setInterval(() => {
            setSeconds(seconds => seconds+1); }, 1000);
            setIntervalId(id);
        //cleanup function 
        //timer is not running
        return () => window.clearInterval(id); 
        } 
    }, [isRunning]);

    //<h1>{seconds}</h1>

    //format timer
    var date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    var formattedTimer = date.toISOString().substr(14, 5);

        return (
            <div className="timer">
                
                <h1>{formattedTimer}</h1>

            </div>   
        );
}

/*

import React, {useState, useEffect } from "react";

export default function Timer() {

    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [intervalId, setIntervalId] = useState(null); 

    //setInterval to increase count to once every second
    useEffect(() => {
        //if timer is running 
        if (isRunning) {
        const id = window.setInterval(() => {
            setSeconds(seconds => seconds+1); }, 1000);
            setIntervalId(id);
        //cleanup function 
        //timer is not running
        return () => window.clearInterval(id); 
        } 
    }, [isRunning]);

    //<h1>{seconds}</h1>

    //format timer
    var date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    var formattedTimer = date.toISOString().substr(14, 5);

        return (
            <div className="timer">
                
                <h1>{formattedTimer}</h1>

            {isRunning ? (
                <button onClick={() => {
                    setIsRunning(false);
                }}>
                    PAUSE
                </button>
            ) : (
                <button onClick={() => {
                    setIsRunning(true);
                }}>
                    PLAY
                </button>
            )
            }
                
                <button disabled={!isRunning} onClick={() => {
                    setIsRunning(false);
                    setSeconds(0);
                }}>
                    RESET
                </button>
                
            </div>   
        );
}

*/