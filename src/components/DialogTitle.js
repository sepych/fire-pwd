import {IconButton, styled, withStyles} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import {LogoView} from "./LogoView";


const styles = (theme) => ({
  root: {
    margin: 0,
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.grey[50]
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.grey[700],
  },
});


export const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <LogoView/>
      <Typography variant="h6">{children}</Typography>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon/>
      </IconButton>
    </MuiDialogTitle>
  );
});
