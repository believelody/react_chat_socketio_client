import React from "react";
import { Button } from "semantic-ui-react";

const FriendRequestIcon = ({ handleClick, className, cancel }) => {
  return (
    <Button
      circular
      className={className}
      onClick={handleClick}
      icon={ cancel ? "user cancel" :"user plus"}
    />
  );
};

export default FriendRequestIcon;
