import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

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

export default function Match() {

    //oppopsition team info from redux 
    const oppositionData = useSelector(
        (state) => state.opposition.oppositionName
    );

    const {userData} = useContext(UserContext);
    const history = useHistory();

    //timer boolean from edux
    const isRunning = useSelector((state) => state.timer);

    const [myGoals, setMyGoals] = useState(0);
    const [oppGoals, setOppGoals] = useState(0);

    const cancelMatch = () => {
        setMyGoals(0);
        setOppGoals(0);
        history.push("/")
    }

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
            paddingTop: "2rem",
        },
      });

    const classes = useStyles();
    /////////////////////////

    return (
        <div className="page">
        <div className="pageTitle" style={{color: "#FFF", padding: "1rem", marginBottom: "1rem"}}>
            <Typography variant="h5">
                {isRunning ? ("Match: Live"):("Match: Paused")}
            </Typography>
        </div>
        <div className="matchCard">
            <Card variant="outlined" className={`${classes.pos} ${classes.root}`}>
                <CardContent style={{backgroundColor: "#F4F4F4", padding: "2rem"}}>
                <Typography align="center" variant="h6" component="h2">
                        {userData.user.team.toUpperCase()} v {oppositionData.toUpperCase()}
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
                        {isRunning ? (
                            <>
                            <Button 
                            onClick={() => setMyGoals(myGoals + 1)} 
                            size="large" 
                            style={{width: "50%", paddingTop: "2rem", paddingBottom: "2rem"}}
                            >
                            <h3>{userData.user.team.toUpperCase()} GOAL</h3>
                            </Button>
                            <Button onClick={() => setOppGoals(oppGoals + 1)} 
                            size="large" 
                            style={{width: "50%", paddingTop: "2rem", paddingBottom: "2rem"}}
                            >
                                <h3>{oppositionData.toUpperCase()} GOAL</h3>
                            </Button>
                            </>
                        ) : (
                            <>
                            <Button 
                            disabled 
                            size="large" 
                            style={{width: "50%", paddingTop: "2rem", paddingBottom: "2rem"}}
                            >
                            <h3>{userData.user.team.toUpperCase()} GOAL</h3>
                            </Button>
                            <Button 
                            disabled 
                            size="large" 
                            style={{width: "50%", paddingTop: "2rem", paddingBottom: "2rem"}}
                            >
                                <h3>{oppositionData.toUpperCase()} GOAL</h3>
                            </Button>
                            </>
                        )}
                    <PauseTimer/>
                    <SubmitModal myGoals={myGoals} oppGoals={oppGoals} myTeam={userData.user.team} oppTeam={oppositionData}/>     
                    <Button 
                        fullWidth={true}
                        onClick={() => cancelMatch()}
                        style={{padding: "1rem"}}
                        size="large"
                        >
                        CANCEL MATCH
                    </Button>              
                </Card>
        </div>
        </div>
    );
}
