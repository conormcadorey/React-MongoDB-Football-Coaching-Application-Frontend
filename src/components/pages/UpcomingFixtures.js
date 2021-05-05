import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DeleteMatchDialog from "./DeleteMatchDialog";

import { useDispatch } from "react-redux";
import { addOpposition } from "./../../redux/oppositionSlice";
import { useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function UpcomingFixtures() {

const [matches, setMatches] = useState([]);

//redux
const oppositionData = useSelector(
    (state) => state.opposition.oppositionName
);

const dispatch = useDispatch();
const url = "http://localhost:5000/match";
//const history = useHistory();

//let token = localStorage.getItem("auth-token");

useEffect(() => {
    upcomingMatches();
}, [])

//get all upcoming matches
const upcomingMatches = async () => {
    try {
        await axios.get(`${url}/upcomingmatches`)
    .then( res => setMatches(res.data))
    } catch(err) {
        console.error(err);
    }
}

//initialise new match with saved data
/*
const handleClick = async (e) => {
    e.preventDefault();
};
*/

const handleUpdate = () => {
    upcomingMatches();
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
                const { myTeam, oppTeam, homeAway, createdAt, _id } = match || {};
                return (
                    <Card variant="outlined" key={match._id} className={`${classes.pos} ${classes.root}`}>
                        <CardContent pt={1} style={{backgroundColor: "#F4F4F4", padding: "2rem"}}>
                            {homeAway ? (
                                <Typography align="center" variant="h5" component="h2">
                                {myTeam} v {oppTeam}
                            </Typography>  
                            ) : (
                                <Typography align="center" variant="h5" component="h2">
                                    {oppTeam} v {myTeam}
                            </Typography>  
                            )}
                            <Typography align="center" variant="body2" component="p">
                                Match saved: {moment(createdAt).format("DD/MM/YYYY")}
                            </Typography>
                        </CardContent>
                        <Box display="flex" justifyContent="flex-end">
                        <Button 
                            size="medium" 
                            type="submit"
                            onClick={() => dispatch(addOpposition(oppTeam))}
                        >
                            <Link style={{color: "#3e5096"}}><h3>START MATCH NOW</h3></Link>
                        </Button>
                        <Button size="large"
                            type="submit"
                        >
                            <DeleteMatchDialog myTeam={myTeam} oppTeam={oppTeam} id={_id} onUpdate={() => handleUpdate()}/>
                        </Button>
                        </Box>
                        
                    </Card>
                )
            })
        ) : (
            <CircularProgress />
        )}
    </>
  );
}