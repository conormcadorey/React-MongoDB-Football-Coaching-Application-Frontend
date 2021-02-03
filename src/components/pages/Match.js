import React, { useState } from "react";
import Timer from "./Timer";
import PauseTimer from "./PauseTimer";
import SubmitModal from "./SubmitMatch";

import { useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from "@material-ui/core";

export default function Match() {

    //oppopsition team info from redux 
    const OppositionData = useSelector(
        (state) => state.opposition.oppositionName
    );

    //timer boolean from edux
    const isRunning = useSelector((state) => state.timer);

    const [myGoals, setMyGoals] = useState(0);
    const [oppGoals, setOppGoals] = useState(0);

     /////////////////////////
     const useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        pos: {
          marginBottom: 18,
        },
        loadingRoot: {
            width: '100%',
        },
      });

    const classes = useStyles();
    /////////////////////////

    return (
        <>
        {OppositionData.map((opp) => (
        <Box key={opp.key}>
        <h1>{isRunning ? ("Match: LIVE"):("Match: LIVE(Paused)")}</h1>
        <div className="matchCard">
            <Card variant="outlined" className={`${classes.pos} ${classes.root}`}>
                <CardContent style={{backgroundColor: "#F4F4F4"}}>
                <Typography align="center" variant="h6" component="h2">
                        TEAM A v {opp.value.toUpperCase()}
                    </Typography>
                    <Typography align="center" variant="h1" color="textSecondary">
                        {myGoals} - {oppGoals}
                    </Typography>
                    <Typography align="center" component="h2">
                        <Timer/>
                    </Typography>
                    <Typography variant="body2" component="p">
                    <div className={classes.loadingRoot}>
                    {isRunning ? 
                        (<LinearProgress/>)
                        :
                        (<LinearProgress color="secondary" />)}
                    </div>
                    <br />
                    </Typography>
                </CardContent>
                    <Button onClick={() => setMyGoals(myGoals + 1)} size="large" style={{width: "50%"}}>
                        <h3>TEAM A GOAL</h3>
                    </Button>
                    <Button onClick={() => setOppGoals(oppGoals + 1)} size="large" style={{width: "50%"}}>
                        <h3>{opp.value.toUpperCase()} GOAL</h3>
                    </Button>
                    <PauseTimer/>
                    <SubmitModal/>                   
                </Card>
        </div>
        </Box>       
         ))}
        </>
    );
}


/*
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import PauseTimer from "./PauseTimer";
import SubmitModal from "./SubmitMatch";

import { useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from "@material-ui/core";

export default function Match() {

    const OppositionData = useSelector(
        (state) => state.opposition.oppositionName
    );

    const [title, setTitle] = useState(true);
    //const [pause, setPause] = useState(true);
    const [isRunning, setIsRunning] = useState(true);
    const [myGoals, setMyGoals] = useState(0);
    const [oppGoals, setOppGoals] = useState(0);

     /////////////////////////
     const useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        pos: {
          marginBottom: 18,
        },
        loadingRoot: {
            width: '100%',
        },
      });

    const classes = useStyles();
    /////////////////////////

    return (
        <>
        {OppositionData.map((opp) => (
        <Box key={opp.key}>
        <h1>{title} {title ? ("Match: LIVE"):("Match: LIVE(Paused)")}</h1>
        <div className="matchCard">
            <Card variant="outlined" className={`${classes.pos} ${classes.root}`}>
                <CardContent style={{backgroundColor: "#F4F4F4"}}>
                <Typography align="center" variant="h6" component="h2">
                        TEAM A v {opp.value}
                    </Typography>
                    <Typography align="center" variant="h1" color="textSecondary">
                        {myGoals} - {oppGoals}
                    </Typography>
                    <Typography align="center" component="h2">
                        <Timer/>
                    </Typography>
                    <Typography variant="body2" component="p">
                    <div className={classes.loadingRoot}>
                        <LinearProgress/>
                        <LinearProgress color="secondary" />
                        </div>
                        <br />
                        </Typography>
                    </CardContent>
                        <Button onClick={() => setMyGoals(myGoals + 1)} size="large" style={{width: "50%"}}>
                            <h3>TEAM A GOAL</h3>
                        </Button>
                        <Button onClick={() => setOppGoals(oppGoals + 1)} size="large" style={{width: "50%"}}>
                            <h3>TEAM B GOAL</h3>
                        </Button>
                    <CardActions>
                        <Button onClick={()=>{ setTitle(!title); setIsRunning(!isRunning) }} size="medium" fullWidth="true">
                            {isRunning ? ("PAUSE MATCH"):("RESUME MATCH")}
                            </Button>
                    </CardActions>
                        <SubmitModal/>
                        <PauseTimer/>
                    </Card>
            </div>
            </Box>       
             ))}
            </>
        );
    }

*/