import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {closeSaveDialog, saveCredentials} from "../actions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const SavePasswordDialog = () => {
  const classes = useStyles();

  const save = () => {
    saveCredentials();
  }

  const close = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      closeSaveDialog(tabs[0].id);
    });
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary">
          New login detected
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Save credential for this page?
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={save}>
          Save
        </Button>
        <Button size="small" color="primary" onClick={close}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
