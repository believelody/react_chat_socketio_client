import React from "react";
import { Button } from "semantic-ui-react";

const OpenChatIcon = ({ handleClick, className }) => {
  return (
    <Button circular className={className} onClick={handleClick} icon="chat" />
  );
};

export default OpenChatIcon;
