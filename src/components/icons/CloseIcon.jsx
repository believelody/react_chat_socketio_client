import React from "react";
import { Button } from "semantic-ui-react";

const CloseIcon = ({ handleClick, className }) => {
  return (
    <Button circular className={className} onClick={handleClick} icon="close" />
  );
};

export default CloseIcon;
