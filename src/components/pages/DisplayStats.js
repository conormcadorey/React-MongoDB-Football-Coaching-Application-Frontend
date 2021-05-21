import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import Fade from 'react-reveal/Fade';

export default function DisplayStats(props) {

    const {myTeam} = props;

    const [total, setTotal] = useState(0)
    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)
    const [draws, setDraws] = useState(0)

    const url = "http://localhost:5000/match";

    useEffect(() => {
        getTotal();
        getWins();
        getLosses();
        getDraws();
    },[])

    const getTotal = async () => {
        try {
            await axios
            .get(`${url}/length/${myTeam}`)
            .then( res => {
                setTotal(res.data)
            });
        } catch(err) {
            console.error(err);
        }
    };

    const getWins = async () => {
        try {
            await axios
            .get(`${url}/wins/${myTeam}`)
            .then( res => {
                setWins(res.data)
            });
        } catch(err) {
            console.error(err);
        }
    };

    const getLosses = async () => {
        try {
            await axios
            .get(`${url}/losses/${myTeam}`)
            .then( res => {
                setLosses(res.data)
            });
        } catch(err) {
            console.error(err);
        }
    };

    const getDraws = async () => {
        try {
            await axios
            .get(`${url}/draws/${myTeam}`)
            .then( res => {
                setDraws(res.data)
            });
        } catch(err) {
            console.error(err);
        }
    };

    const winPerc = () => {
        const answer = wins/total * 100;
        return answer 
    }

    const lossPerc = () => {
        const answer = losses/total * 100;
        return answer 
    }

    const drawPerc = () => {
        const answer = draws/total * 100;
        return answer 
    }

    const useStyles = makeStyles({
        root: {
          //minWidth: 275,
        },
        pos: {
          marginBottom: 18,
          backgroundColor: "#F4F4F4"
        },
        button: {
            padding: 14,
            marginBottom: 16,
            backgroundColor: '#FFF',
            '&:hover': {
                backgroundColor: '#31333b',
                color: '#FFF'
            }
        },
      });

    const classes = useStyles();

    return (
        <div className="page">
            <Fade left big>
            <Card variant="outlined" className={`${classes.pos} ${classes.root}`}>
                <CardContent>
                    <Typography variant="h6" component="h2" align="center">
                        Total games played 
                    </Typography>
                        <Typography align="center" variant="h1" color="textSecondary">
                            {total}
                        </Typography>
                        <Typography color="textSecondary" variant="body2" component="p" align="center">
                            You have played {total} games 
                        </Typography>
                        <Divider style={{margin: "2rem"}}/>
                    <Typography variant="h6" component="h2" align="center">
                        Win percentage | Total wins 
                    </Typography>
                        <Typography align="center" variant="h1" color="textSecondary">
                            {winPerc()}%
                        </Typography>
                        <Typography color="textSecondary" variant="body2" component="p" align="center">
                            You have {wins} total wins 
                        </Typography>
                        <Divider style={{margin: "2rem"}}/>
                    <Typography variant="h6" component="h2" align="center">
                        Loss percentage | Total losses 
                    </Typography>
                        <Typography align="center" variant="h1" color="textSecondary">
                            {lossPerc()}%
                        </Typography>
                        <Typography color="textSecondary" variant="body2" component="p" align="center">
                            You have {losses} total losses
                        </Typography>
                        <Divider style={{margin: "2rem"}}/>
                    <Typography variant="h6" component="h2" align="center">
                        Draw percentage | Total draws
                    </Typography>
                        <Typography align="center" variant="h1" color="textSecondary">
                            {drawPerc()}%
                        </Typography>
                        <Typography color="textSecondary" variant="body2" component="p" align="center">
                            You have {draws} total draws
                        </Typography>
                </CardContent>
            </Card>
            </Fade>
        </div>
    )
}