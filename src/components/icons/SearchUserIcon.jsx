import React from "react";
import { Button } from "semantic-ui-react";

const SearchUserIcon = ({ handleClick, className }) => {
  return (
    <Button
      circular
      className={className}
      onClick={e => handleClick("user")}
      icon="users"
    />
  );
};

export default SearchUserIcon;