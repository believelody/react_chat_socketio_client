import React from "react";
import { Button } from "semantic-ui-react";

const SearchUserIcon = ({ className }) => {
  return (
    <Button
      circular
      className={className}
      icon="users"
    />
  );
};

export default SearchUserIcon;
