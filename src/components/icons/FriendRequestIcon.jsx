import React from "react";
import { Button } from "semantic-ui-react";

const FriendRequestIcon = ({ handleClick, className }) => {
  return (
    <Button
      circular
      className={className}
      onClick={handleClick}
      icon="user plus"
    />
  );
};

export default FriendRequestIcon;
