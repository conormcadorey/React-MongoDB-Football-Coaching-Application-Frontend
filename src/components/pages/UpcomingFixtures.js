import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DeleteMatchDialog from "./DeleteMatchDialog";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

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
}));

    const classes = useStyles();

return (
    <>
    <div className="pageTitle"><h1>Upcoming fixtures</h1></div>
    <Typography variant="body2">
        Below, are all of your upcoming saved fixtures. Just select from a fixture to begin a new match instantly! 
        <br></br><br></br>
    </Typography>

        {matches ? 
            (matches.map(match => {
                const { myTeam, oppTeam, homeAway, complete, createdAt, _id } = match || {};
                return (
                    <>
                    {complete === "N" ? (       
                        <>
                        {homeAway ? (
                            <Card variant="outlined" key={match._id} className={`${classes.pos} ${classes.root}`}>
                                <CardContent pt={1} style={{backgroundColor: "#F4F4F4"}}>
                                    <Typography align="center" variant="h5" component="h2">
                                        {myTeam} v {oppTeam}
                                    </Typography>  
                                    <Typography align="center" variant="body2" component="p">
                                        Match saved: {moment(createdAt).format("DD/MM/YYYY")}
                                    </Typography>
                                </CardContent>
                                <Button 
                                    size="large" 
                                    style={{width: "80%", paddingTop: "1.3rem", paddingBottom: "1.3rem"}}
                                    type="submit"
                                >
                                    <Link style={{color: "#3e5096"}}><h3>START MATCH NOW</h3></Link>
                                </Button>
                                <Button size="large"
                                    style={{width: "20%", paddingTop: "1rem", paddingBottom: "1rem"}}
                                    type="submit"
                                >
                                    <DeleteMatchDialog myTeam={myTeam} oppTeam={oppTeam} id={_id} />
                                </Button>
                            </Card>
                        ) : (
                            <Card variant="outlined" key={match._id} className={`${classes.pos} ${classes.root}`}>
                                <CardContent pt={1} style={{backgroundColor: "#F4F4F4"}}>
                                    <Typography align="center" variant="h5" component="h2">
                                        {oppTeam} v {myTeam}
                                    </Typography>  
                                    <Typography align="center" variant="body2" component="p">
                                        Match saved: {moment(createdAt).format("DD/MM/YYYY")}
                                    </Typography>
                                </CardContent>
                                <Button 
                                    size="large" 
                                    style={{width: "80%", paddingTop: "1.3rem", paddingBottom: "1.3rem"}}
                                    type="submit"
                                >
                                    <Link style={{color: "#3e5096"}}><h3>START MATCH NOW</h3></Link>
                                </Button>
                                <Button size="large"
                                    style={{width: "20%", paddingTop: "1rem", paddingBottom: "1rem"}}
                                    type="submit"
                                >
                                    <DeleteMatchDialog/>
                                </Button>
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