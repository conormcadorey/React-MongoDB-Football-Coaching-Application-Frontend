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

export default function Home() {

    const {userData} = useContext(UserContext);
    //const history = useHistory();

    /*
    useEffect(() => {
        //if userData undefined redirect to login 
        if (!userData.user) history.push("/login");
    });
    */

    //useEffect to clear oppTeam when match ends or match live = false

    /////////////////////////
    const useStyles = makeStyles({
        root: {
          //minWidth: 275,
        },
        pos: {
          marginBottom: 18,
        },
      });

    const classes = useStyles();
    /////////////////////////

return (
        <>
        {userData.user ? (
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
                    <Link to="/fixtures">
                        <button className="mainButton">Upcoming matches</button>
                    </Link>
                    <Link to="/fixtures">
                        <button className="mainButton">Previous matches</button>
                    </Link>
                    <Link to="/myteam">
                        <button className="mainButton">Your team</button>
                    </Link>
                    <Link to="/createplayer">
                        <button className="mainButton">Create a player</button>
                    </Link>
                </nav>
                </div>
            </Container>
        ) : (
        <RedirectToLogin/>
        )}
        </>
  );
}