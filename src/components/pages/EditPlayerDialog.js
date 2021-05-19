import React, { useState } from 'react';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    //minWidth: 275,
  },
  pos: {
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#31333b',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#31333b',
      color: '#FFF'
  }
  },
}));

export default function EditPlayerDialog(props) {

  //props
  const { name, position, number, id, onUpdate } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [changeName, setChangeName] = useState("");
  const [changePosition, setChangePosition] = useState(position);
  const [changeNum, setChangeNum] = useState("");
  const [openDrop, setOpenDrop] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setChangeName("");
    setChangeNum("");
    setChangePosition(position);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDrop = () => {
    setOpenDrop(false);
  };

  const handleOpenDrop = () => {
    setOpenDrop(true);
  };

  const handleNameChange = (e) => {
    setChangeName(e.target.value);
  }

  const handlePositionChange = (e) => {
    setChangePosition(e.target.value);
  }

  const handleNumChange = (e) => {
    setChangeNum(e.target.value);
  }

  //////////////////////////////////////////
  let token = localStorage.getItem("auth-token");
  const url = "http://localhost:5000/players";

  //CHANGE PLAYER NAME
  const submitName = async (e) => {
    e.preventDefault(); 
    try {
      await axios.put(`${url}/editname/${id}`, { name: changeName }, {
        headers: {
            "Authorization": token,
        }
    })
    .then(res => {
      setChangeName(res.data)
      //setOpen(false)
      onUpdate();
    })  
    } catch (err) {
      console.log(err)
    }
  }

  //CHANGE PLAYER POSITION
  const submitPosition = async (e) => {
    e.preventDefault();
    try {
      axios.put(`${url}/editposition/${id}`, { position: changePosition }, {
        headers: {
          "Authorization": token,
        }
      })
      .then(res => {
        setChangePosition(res.data)
        onUpdate();
      })
    } catch (err) {
      console.log(err)
    }
  }

  //CHANGE PLAYER NUMBER
  const submitNum = async (e) => {
    e.preventDefault(); 
    try {
      axios.put(`${url}/editnumber/${id}`, { number: changeNum }, {
        headers: {
            "Authorization": token,
        }
    })
    .then(res => {
      setChangeNum(res.data)
      //setOpen(false)
      onUpdate();
    })  
    } catch (err) {
      console.log(err)
    }
  }
  
  /////////////////////////////////////////

  return (
      <>
      <Tooltip title="Edit player" arrow>
        <Button 
        onClick={handleClickOpen}
        style={{ color: "#5541ba" }} 
        size="large"
        >
            <MoreVertIcon/>
        </Button>
        </Tooltip>

        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle><h2>Edit player, {name}</h2></DialogTitle>
          <DialogContent>
            <div className={classes.container}>
            <form className="editPlayerInput" onSubmit={submitName}>
              <Typography variant="body2" color="textSecondary">
                  Change this players name?
              </Typography>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      defaultValue={name}
                      id="change-player-name"
                      type="text"
                      onChange={handleNameChange}
                  />
                  {changeName ? (
                      <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      disableElevation
                      className={classes.button}
                      >
                        Update Name
                      </Button>
                  ) : (
                      <Button
                      size="medium"
                      disabled
                      variant="contained"
                      >
                        Update Name
                      </Button>
                  )}

                </form>

                <form className="editPlayerInput" onSubmit={submitPosition}>
                  <Typography variant="body2" color="textSecondary">
                      Change this players main position?
                  </Typography>

                      <FormControl>
                      <Select
                      variant="outlined"
                      id="update-player-position"
                      open={openDrop}
                      onClose={handleCloseDrop}
                      onOpen={handleOpenDrop}
                      value={changePosition}
                      onChange={handlePositionChange}
                      style={{ marginTop: '0.5rem' }} 
                      >
                      <MenuItem value={"N/A"}>N/A</MenuItem>
                      <MenuItem value={"Forward"}>Forward</MenuItem>
                      <MenuItem value={"Midfield"}>Midfield</MenuItem>
                      <MenuItem value={"Defence"}>Defence</MenuItem>
                      <MenuItem value={"Goal Keeper"}>Goal Keeper</MenuItem>
                      </Select>
                      </FormControl>

                    {changePosition !== position ? (
                      <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      className={classes.button}
                      disableElevation
                      style={{ display: 'block', marginTop: '0.5rem' }} 
                      >
                        Update Position
                      </Button>
                  ) : (
                      <Button
                      size="medium"
                      variant="contained"
                      disabled
                      style={{ display: 'block', marginTop: '0.5rem' }} 
                      >
                        Update Position
                      </Button>
                  )}
                  </form>

                  <form className="editPlayerInput" onSubmit={submitNum}>
                  <Typography variant="body2" color="textSecondary">
                      Change this players squad number?
                  </Typography>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      defaultValue={number}
                      id="change-player-number"
                      type="text"
                      onChange={handleNumChange}
                  />
                    {changeNum ? (
                      <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      className={classes.button}
                      disableElevation
                      >
                        Update Number
                      </Button>
                  ) : (
                      <Button
                      size="medium"
                      variant="contained"
                      disabled
                      >
                        Update Number
                      </Button>
                  )}
                  </form>
            </div>
          </DialogContent>
          <DialogActions>
            <IconButton size="small" onClick={handleClose} className={classes.button}>
              <CloseIcon/>
            </IconButton>
          </DialogActions>
        </Dialog>
      </>
  );
}