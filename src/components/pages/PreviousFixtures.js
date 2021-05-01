import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function PreviousFixtures() {

const [matches, setMatches] = useState([]);

const url = "http://localhost:5000/match";

useEffect(() => {
    upcomingMatches();
}, [])

const upcomingMatches = async () => {
    try {
        await axios.get(`${url}/allmatches`)
    .then( res => setMatches(res.data))
    } catch(err) {
        console.error(err);
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    pos: {
        marginBottom: 18,
    },
}));

    const classes = useStyles();

return (
    <>
    <div className="pageTitle"><h1>Previous fixtures</h1></div>

        {matches ? 
            (matches.map(match => {
                const { myTeam, oppTeam, myGoals, oppGoals, homeAway, complete, duration, createdAt } = match || {};
                return (
                    <>
                    {complete === "Y" ? (       
                        <>
                        {homeAway ? (
                            <Card variant="outlined" key={match._id} className={`${classes.pos} ${classes.root}`}>
                                <CardContent pt={1} style={{backgroundColor: "#F4F4F4"}}>
                                    <Typography align="center" variant="h5" component="h2">
                                        {myTeam} v {oppTeam}
                                    </Typography>  
                                    <Typography align="center" variant="body2" component="p">
                                        {duration} | {moment(createdAt).format("DD/MM/YYYY")}
                                    </Typography>
                                </CardContent>
                                <CardContent pt={1} style={{backgroundColor: "#FFFFFF"}}>
                                    <Typography align="center" variant="h4" color="textSecondary">
                                        {myGoals} | {oppGoals}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card variant="outlined" key={match._id} className={`${classes.pos} ${classes.root}`}>
                                <CardContent pt={1} style={{backgroundColor: "#F4F4F4"}}>
                                    <Typography align="center" variant="h5" component="h2">
                                        {oppTeam} v {myTeam}
                                    </Typography>  
                                    <Typography align="center" variant="body2" component="p">
                                        {duration} | {moment(createdAt).format("DD/MM/YYYY")}
                                    </Typography>
                                </CardContent>
                                <CardContent pt={1} style={{backgroundColor: "#FFFFFF"}}>
                                    <Typography align="center" variant="h4" color="textSecondary">
                                        {oppGoals} | {myGoals}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                        </>
                    ) : (
                        <></>
                    )}
                    </>
                )
            })
        ) : (
            <CircularProgress />
        )}
    </>
  );
}