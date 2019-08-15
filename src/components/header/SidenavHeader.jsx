import React from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { OPEN_USER } from "../../reducers/modalReducer";
import SearchUserIcon from "../icons/SearchUserIcon";
import SettingIcon from "../icons/SettingIcon";

const HeaderStyle = styled.header`
  text-align: center;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  padding: 10px 0px;

  & > h4 {
    width: 100%;
    padding: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
  }

  & .action-contact {
    border-radius: 50%;
    padding: 4px 8px;
    margin-left: auto;
    margin-right: 8px;
    cursor: pointer;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
  }
`;

const SidenavHeader = () => {
  const { useModal } = useAppHooks();
  const [_, dispatch] = useModal;

  const searchContact = label => {
    dispatch({ type: OPEN_USER, payload: label });
  };

  const settingUser = label => {
    alert('settings')
  };

  return (
    <HeaderStyle>
      <h4>SocketIO Chat</h4>
      <SearchUserIcon className="action-contact" handleClick={searchContact} />
      <SettingIcon className="action-contact" handleClick={settingUser} />
    </HeaderStyle>
  );
};

export default SidenavHeader;
