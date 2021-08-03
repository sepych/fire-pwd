import {Grid, styled, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';


const Icon = styled(VerifiedUserTwoToneIcon)({
  color: '#4aad05',
  fontSize: '24px',
});

const Text = styled(Typography)({
  color: '#4aad05',
  fontSize: '12px',
  display: 'inline',
  margin: 0,
  padding: 0,
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
});

export const Credentials = withStyles(styles)((props) => {
  const {classes, login, password} = props;
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      <Grid item justifyContent="center">
        <Icon></Icon>
      </Grid>
      <Grid item>
        <Text>{login}</Text><br/>
        <Text>{password}</Text>
      </Grid>
    </Grid>
  );
});
