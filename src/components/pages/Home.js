import React, { useContext } from 'react'
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import NewMatchDialog from "./NewMatchDialog";

import RedirectToLogin from "./RedirectLogin";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Fade from 'react-reveal/Fade';

export default function Home() {

    const {userData} = useContext(UserContext);

    /*
    useEffect(() => {
        //if userData undefined redirect to login 
        if (!userData.user) history.push("/login");
    });
    */

    const useStyles = makeStyles({
        root: {
          //minWidth: 275,
        },
        pos: {
          marginBottom: 18,
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
        <>
        {userData.user ? (
            <Fade left big>
            <Container component="main">
                <div className="page">
                <Card variant="outlined" className={`${classes.pos} ${classes.root}`}>
                        <Box display="flex" style={{backgroundColor: "#F4F4F4"}}>
                            <Box flexGrow={1}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Hello {userData.user.userName}!  
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2" component="p">
                                        Select from an option below to begin
                                    </Typography>
                                </CardContent>
                            </Box>
                            <Box p={2}><Avatar src="/broken-image.jpg"/></Box>      
                        </Box>
                </Card>

                <nav>
                    <NewMatchDialog myTeam={userData.user.team}/>
                    <br></br>
                        <Link to="/savedfixtures">
                        <Button 
                        className={classes.button}
                        variant="outlined"          
                        size="large"
                        fullWidth={true}
                        >
                            Upcoming matches
                        </Button>
                        </Link>

                        <Link to="/fixtures">
                        <Button 
                        className={classes.button}
                        variant="outlined"          
                        size="large"
                        fullWidth={true}
                        >
                            Previous matches
                        </Button>
                        </Link>

                        <Link to="/myteam">
                        <Button 
                        className={classes.button}
                        variant="outlined"          
                        size="large"
                        fullWidth={true}
                        >
                            Your team
                        </Button>
                        </Link>

                        <Link to="/createplayer">
                        <Button 
                        className={classes.button}
                        variant="outlined"          
                        size="large"
                        fullWidth={true}
                        >
                            Create a player
                        </Button>
                        </Link>
                    </nav>
                </div>
            </Container>
            </Fade>
        ) : (
        <RedirectToLogin/>
        )}
        </>
  );
}