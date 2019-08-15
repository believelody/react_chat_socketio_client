import React from "react";
import { Button } from "semantic-ui-react";

const AcceptIcon = ({ handleClick, className }) => {
    return (
        <Button
            circular
            className={className}
            onClick={handleClick}
            icon="check"
        />
    );
};

export default AcceptIcon;
