import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useHistory } from "react-router-dom";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      padding: theme.spacing(2, 3, 3),
    },
  }),
);

interface PopupMessages {
  message: string;
}


const PopupMessage  = (props: PopupMessages)  => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  console.log("props.message: "+ props.message);
  const [open, setOpen] = React.useState(true);

  let history = useHistory();
  
  const handleClose = () => {
    setOpen(false);
    history.push('/')
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">
        {props.message}
      </p>
    </div>
  );

  return (
    <div>
      {props.message !== '' ? (
      <Modal
        open={open}
        onClick={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         {body} 
      </Modal>
      ) : (
        ''
      )}
    </div>
  );
}

export default PopupMessage;
