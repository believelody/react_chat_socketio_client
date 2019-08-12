import React from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { OPEN_USER } from "../../reducers/modalReducer";
import SearchUserIcon from "../icons/SearchUserIcon";

const HeaderStyle = styled.header`
  text-align: center;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  padding: 10px 0px;

  & > h4 {
    width: 100%;
    padding: 0;
  }

  & .search-contact {
    border-radius: 50%;
    padding: 4px 8px;
    margin-left: auto;
    cursor: pointer;
  }
`;

const SidenavHeader = () => {
  const { useModal } = useAppHooks();
  const [_, dispatch] = useModal;

  const handleClick = label => {
    dispatch({ type: OPEN_USER, payload: label });
  };

  return (
    <HeaderStyle>
      <h4>SocketIO Chat</h4>
      <SearchUserIcon className="search-contact" handleClick={handleClick} />
    </HeaderStyle>
  );
};

export default SidenavHeader;
