import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function UpcomingFixtures() {

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
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        minWidth: 120,
        },
    }));

    const classes = useStyles();

return (
    <>
    <div className="pageTitle"><h1>Previous fixtures</h1></div>

        {matches ? 
            (matches.map(match => {
                const { myTeam, oppTeam, myGoals, oppGoals, homeAway, complete, duration, _id } = match || {};
                return (
                    <>
                    {complete === "Y" ? (       
                        <>
                        {homeAway ? (
                            <Card variant="outlined" key={match._id} className={`${classes.pos} ${classes.root}`}>
                                <CardContent pt={1} style={{backgroundColor: "#F4F4F4"}}>
                                    <Typography align="center" variant="h4" component="h2">
                                        {myTeam} v {oppTeam}
                                    </Typography>  
                                </CardContent>
                                <CardActions>
                                <Typography color="textSecondary">
                                    {myGoals} | {oppGoals}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {duration}
                                    <br />
                                </Typography>
                                </CardActions>
                            </Card>
                        ) : (
                            <span>
                            <h1>{oppTeam} v {myTeam}</h1>
                            <p>{oppGoals} | {myGoals}</p>
                            <p>{duration}</p>
                            </span>
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