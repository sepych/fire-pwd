import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MuiCard from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {closeDialog, CredentialsDialogStyle, saveCredentials} from "../actions";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton, withStyles} from "@material-ui/core";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

const styles = (theme) => ({
  card: {
    width: CredentialsDialogStyle.width,
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Card = withStyles(styles)((props) => {
  const {children, classes, ...other} = props;
  return (
    <MuiCard className={classes.card} {...other}>
      {children}
    </MuiCard>
  );
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon/>
      </IconButton>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const SavePasswordDialog = () => {
  // const classes = useStyles();

  const close = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      closeDialog(tabs[0].id);
    });
  }

  const save = () => {
    saveCredentials();
    close();
  }

  return (
    <Card>
      <DialogTitle id="customized-dialog-title" onClose={close}>
        New login detected
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Save credential for this page?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={save}>
          Save
        </Button>
        <Button color="primary" onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Card>

    // <Card className={classes.root}>
    //   <CardContent>
    //     <Typography color="textSecondary">
    //       New login detected
    //     </Typography>
    //     <Typography variant="body2" color="textSecondary" component="p">
    //       Save credential for this page?
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small" color="primary" onClick={save}>
    //       Save
    //     </Button>
    //     <Button size="small" color="primary" onClick={close}>
    //       Cancel
    //     </Button>
    //   </CardActions>
    // </Card>
  )
    ;
}
