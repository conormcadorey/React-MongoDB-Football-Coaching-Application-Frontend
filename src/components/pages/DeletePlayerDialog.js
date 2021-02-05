import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';

export default function EditPlayerDialog(props) {

  //props
  const { name } = props;

  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <div className="deletePlayerButton">
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    disableElevation
                    >
                        Delete 
                </Button>
            </div>
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