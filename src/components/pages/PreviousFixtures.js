import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import EditPlayerDialog from "./EditPlayerDialog";
import DeletePlayerDialog from "./DeletePlayerDialog";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

export default function PreviousFixtures(props) {

const [matches, setMatches] = useState([]);
const { team, myId } = props;

const url = "http://localhost:5000/match";

useEffect(() => {
    upcomingMatches();
}, [])

const upcomingMatches = async () => {
    try {
        await axios.get(`${url}/allmatches/${team}`)
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
                const { myTeam, oppTeam, myGoals, oppGoals, homeAway, duration, createdAt, userId } = match || {};
                return (
                    <Card variant="outlined" key={match._id} className={`${classes.pos} ${classes.root}`}>
                        <CardContent pt={1} style={{backgroundColor: "#F4F4F4"}}>
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
                                {duration} | {moment(createdAt).format("DD/MM/YYYY")}
                            </Typography>
                        </CardContent>
                        <CardContent style={{backgroundColor: "#F4F4F4", paddingBottom: "2rem"}}>
                        {homeAway ? (
                            <Typography align="center" variant="h4" color="textSecondary">
                                {myGoals} | {oppGoals}
                            </Typography>
                        ) : (
                            <Typography align="center" variant="h4" color="textSecondary">
                                {oppGoals} | {myGoals}
                            </Typography>
                        )}
                        </CardContent>
                        <Box display="flex" justifyContent="flex-end">
                            <CardActions>
                                {userId === myId ? 
                                (
                                    <>
                                    <EditPlayerDialog />
                                    <DeletePlayerDialog />
                                    </>
                                ) : (
                                    <>
                                    <Tooltip title="Cannot edit this match. Update your Admin privileges" arrow>
                                    <span>
                                        <Button 
                                        disabled
                                        size="large"
                                        >
                                            <MoreVertIcon/>
                                        </Button>
                                    </span>
                                    </Tooltip>
                                    <Tooltip title="Cannot delete this match. Update your Admin privileges" arrow>
                                    <span>
                                        <Button disabled size="large">
                                            <DeleteIcon/>
                                        </Button>
                                    </span>
                                    </Tooltip> 
                                    </>
                                )}   
                            </CardActions>
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