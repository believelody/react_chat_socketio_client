import React from "react";
import { Button } from "semantic-ui-react";

const SettingIcon = ({ handleClick, className }) => {
    return (
        <Button circular className={className} onClick={handleClick} icon="setting" />
    );
};

export default SettingIcon;
