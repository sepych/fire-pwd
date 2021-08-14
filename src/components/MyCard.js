import {withStyles} from "@material-ui/core";
import MuiCard from "@material-ui/core/Card";
import React from "react";


const styles = (theme) => ({
  root: {
    margin: '10px',
  },
});

export const MyCard = withStyles(styles)((props) => {
  const {children, classes} = props;
  return (
    <MuiCard elevation={10} className={classes.root}>
      {children}
    </MuiCard>
  );
});

