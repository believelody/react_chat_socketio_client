import React from "react";
import { Button } from "semantic-ui-react";

const LogoutIcon = ({ handleClick, className }) => {
  return (
    <Button
      circular
      className={className}
      onClick={handleClick}
      icon="log out"
    />
  );
};

export default LogoutIcon;
