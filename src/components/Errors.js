import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

/*
<div className="error-notice">
        <span>{props.message}</span>
        <button onClick={props.clearError}>X</button> 
    </div>
*/

//returns something from props
export default function ErrorNotice(props) {

    const [open, setOpen] = React.useState(true);
    const classes = useStyles();

    return (
    
        <div className={classes.root}>
      <Collapse in={open}>
        <Alert severity="error" variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.message}
        </Alert>
      </Collapse>
      
    </div>

    );
}