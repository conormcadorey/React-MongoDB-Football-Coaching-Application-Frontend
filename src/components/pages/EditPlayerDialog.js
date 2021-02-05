import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

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
}));

export default function EditPlayerDialog(props) {

  //props
  const { name, position, number } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [changeName, setChangeName] = useState("");
  const [changePosition, setChangePosition] = useState("");
  const [changeNum, setChangeNum] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <>
    <Tooltip title="Edit player" arrow>
      <Button 
      onClick={handleClickOpen}
      style={{ color: 'blue' }} 
      size="large"
      >
          <MoreVertIcon/>
      </Button>
      </Tooltip>

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle><h2>Edit player, {name}</h2></DialogTitle>
        <DialogContent>
          <form className={classes.container}>
          <div className="editPlayerInput">
            <Typography variant="body2" color="textSecondary">
                Change this players name?
            </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label={name}
                    id="change-player-name"
                    type="text"
                    onChange={handleNameChange}
                />
                {changeName ? (
                    <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="primary"
                    disableElevation
                    >
                      Update Name
                    </Button>
                ) : (
                    <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled
                    >
                      Update Name
                    </Button>
                )}
              </div>

              <div className="editPlayerInput">
                <Typography variant="body2" color="textSecondary">
                    Change this players main position?
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label={position}
                    id="change-player-position"
                    type="text"
                    onChange={handlePositionChange}
                />
                  {changePosition ? (
                    <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="primary"
                    disableElevation
                    >
                      Update Position
                    </Button>
                ) : (
                    <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled
                    >
                      Update Position
                    </Button>
                )}
                </div>

                <div className="editPlayerInput">
                <Typography variant="body2" color="textSecondary">
                    Change this players squad number?
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label={number}
                    id="change-player-number"
                    type="text"
                    onChange={handleNumChange}
                />
                  {changeNum ? (
                    <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="primary"
                    disableElevation
                    >
                      Update Number
                    </Button>
                ) : (
                    <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled
                    >
                      Update Number
                    </Button>
                )}
                </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}