import React, { useState } from 'react';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

export default function EditPlayerDialog(props) {

  //props
  const { name, id, onUpdate } = props;

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let token = localStorage.getItem("auth-token");
  const url = "http://localhost:5000/players";

  const deletePlayer = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${url}/delete/${id}`, {
        headers: {
            "Authorization": token,
        }
      })
      .then(res => {
        onUpdate(id);
        setOpen(false)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: '#FFF',
        '&:hover': {
            backgroundColor: '#31333b',
            color: '#FFF'
        }
    },
  }));

  const classes = useStyles();

  return (
    <>
    <Tooltip title="Delete player" arrow>
         <Button onClick={handleDelete} size="large"><DeleteIcon/></Button>
     </Tooltip> 

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle><h2>Delete player, {name}?</h2></DialogTitle>
        <DialogContent align="center">
            <Typography variant="body2" color="textSecondary">
                Permanently delete this player? You cannot undo this action!
            </Typography>
            <form onSubmit={deletePlayer}>
            <div className="deletePlayerButton">
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    style={{
                      backgroundColor: '#31333b',
                      color: '#FFF',
                      '&:hover': {
                          backgroundColor: '#FFF',
                          color: '#31333b'
                      }
                    }}
                    disableElevation
                    fullWidth
                    >
                        Delete 
                </Button>
            </div>
            </form>
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