import {styled} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import WhatshotTwoToneIcon from "@material-ui/icons/WhatshotTwoTone";

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

export const LogoView = () => {
  return (
    <div><LogoIcon/><LogoText>FirePwd</LogoText></div>
  );
};
