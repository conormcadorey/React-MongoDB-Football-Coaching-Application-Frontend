import React from "react";
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
                fullWidth={true}
                onClick={() => dispatch(changeTimer())}
                style={{padding: "1rem"}}
                size="large"
                >
                   PAUSE MATCH
                </Button>
            ) : (
                <Button 
                fullWidth={true}
                onClick={() => dispatch(changeTimer())}
                style={{padding: "1rem"}}
                size="large"
                >
                    RESUME MATCH
                </Button>
            )
            }

            </div>   
        );
}

