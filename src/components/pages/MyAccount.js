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
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Fade from 'react-reveal/Fade';

export default function MyAccount() {

    const {userData} = useContext(UserContext)
    const [name, setName] = useState("");

    const id = userData.user.id;

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
            marginTop: theme.spacing(1),
          },
        button: {
            padding: 14,
            marginBottom: 16,
            '&:hover': {
                backgroundColor: '#31333b',
                color: '#FFF'
            }
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
          },
        header: {
            display: 'flex',
            alignItems: 'center',
            },
        paper: {
        display: 'flex',
        justifyContent: "center",
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '25%',
        },
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
            <div className="page">
            <div className="pageTitle">
            <Typography align="center">
            <Avatar src="/broken-image.jpg" className={classes.header} style={{ height: '60px', width: '60px' }}/>
            </Typography>
            
                        <h2>My account</h2>
            </div>
            

                        

            <Typography variant="body2">
                You can modify your personal information from this page. 
            </Typography>
            <br></br>
            <Divider/>
            <form className={classes.form} noValidate onSubmit={submitName}>
            <Typography variant="body2" color="textSecondary">
              Your name
            </Typography>
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
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disableElevation
                disabled
                >
                Save
                </Button>
            )}
            </form>

            <Button 
                className={classes.button}
                variant="outlined"          
                size="large"
                fullWidth={true}
                >
                    Change password
            </Button>
            <Button 
                className={classes.button}
                variant="outlined"          
                size="large"
                fullWidth={true}
                >
                    Change profile photo
            </Button>
            <Button 
                className={classes.button}
                variant="outlined"          
                size="large"
                fullWidth={true}
                >
                    Change team
            </Button>
            <ChangePassword/>
            </div>
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