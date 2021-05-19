import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import RedirectLogin from "./RedirectLogin";
import ChangePassword from "./ChangePassword";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Fade from 'react-reveal/Fade';

export default function MyAccount() {

    const {userData} = useContext(UserContext)
    const [name, setName] = useState("");

    const id = userData.user._id;

    let token = localStorage.getItem("auth-token");
    const url = "http://localhost:5000/users";

    const submitName = async (e) => {
        e.preventDefault();
        try{
            await axios.put(`${url}/editname/${id}`, { userName: name }, {
                headers: {
                    "Authorization": token,
                }
            })
            .then(res => {
                setName(res.data)
                //onUpdate();
            })
        } catch (err) {
            console.log(err);
        }   
    }

    const useStyles = makeStyles((theme) => ({
        form: {
            width: '100%', // Fix IE 11 issue.
            //marginTop: theme.spacing(0),
          },
        button: {
            padding: 10,
            marginBottom: 16,
            '&:hover': {
                backgroundColor: '#31333b',
                color: '#FFF'
            }
        },
        submit: {
            margin: theme.spacing(1, 0, 4),
            backgroundColor: "#5541ba",
            '&:hover': {
                backgroundColor: '#31333b',
                color: '#FFF'
            }
          },
        header: {
            display: 'flex',
            alignItems: 'center',
            },
        paper: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        marginTop: '25%',
        },
        center: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
         }
      }));

    const classes = useStyles();

    return (
        <>
        {userData.user ? (
            <Fade left big>
            <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Card variant="outlined">
                <CardContent p={1}>
                    <Container className={classes.center}>
                    <Avatar src="/broken-image.jpg" className={classes.header} style={{ height: "60px", width: "60px"}}/>
                    </Container>
                    <Typography variant="h5" align="center">
                        My account
                    </Typography>
                        <Typography align="center" variant="body2">
                            Modify account information here
                        </Typography>
                        <br></br>
                        <Divider/>
                        <form className={classes.form} noValidate onSubmit={submitName}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="change-name"
                            type="text"
                            defaultValue={userData.user.userName}
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
                        {name ? (
                            <Button
                            type="submit"
                            size="large"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disableElevation
                        >
                            Save
                        </Button>
                        ) : (
                            <Button
                            size="large"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            disableElevation
                            disabled
                            >
                            Save
                            </Button>
                        )}
                        </form>

                        <ChangePassword/>

                        <Button 
                            className={classes.button}
                            variant="outlined"          
                            size="small"
                            fullWidth={true}
                            >
                                Change profile photo
                        </Button>
                        <Button 
                            className={classes.button}
                            variant="outlined"          
                            size="small"
                            fullWidth={true}
                            >
                                Change team
                        </Button>
                    </CardContent>
                </Card> 
            </div>
        </Container>
    </Fade>
        ) : (
            <RedirectLogin/>
        ) }
        </>
    );
}