import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";

export const Landing = () => {
  const openPopup = () => {
    chrome.tabs.create({url : "index.html#login"});
    window.close();
  }

  return (
    <div style={{width: '300px'}}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign in
          </Typography>

          <Button variant="outlined" color="secondary" onClick={openPopup}>
            Sign in with Google
          </Button>
        </Box>
      </Container>
    </div>
  )
}
