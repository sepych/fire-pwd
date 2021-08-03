import {IconButton, styled, withStyles} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import React from "react";


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[700],
  },
});

const LogoIcon = styled(WhatshotTwoToneIcon)({
  color: '#f73b7d',
  fontSize: '14px',
});

const LogoText = styled(Typography)({
  color: '#f73b7d',
  fontSize: '12px',
  display: 'inline',
  margin: 0,
  padding: 0,
});

export const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div><LogoIcon/><LogoText>FirePwd</LogoText></div>
      <Typography variant="h6">{children}</Typography>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon/>
      </IconButton>
    </MuiDialogTitle>
  );
});
