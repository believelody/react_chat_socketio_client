import React from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { OPEN_USER } from "../../reducers/modalReducer";

const HeaderStyle = styled.header`
  text-align: center;
  text-transform: uppercase;

  & .search-contact {
    border-radius: 50%;
    border: 1px solid black;
    padding: 4px 8px;
    margin-left: auto;
    cursor: pointer;
  }
`;

const SidenavHeader = () => {
  const { useModal } = useAppHooks()
  const [_, dispatch] = useModal

  const handleClick = label => {
    dispatch({ type: OPEN_USER, payload: label })
  }

  return (
    <HeaderStyle>
      <h4>SocketIO Chat</h4>
      <span className='search-contact' onClick={e => handleClick('user')}>
        <i className='fas fa-user-plus'></i>
      </span>
    </HeaderStyle>
  );
};

export default SidenavHeader;
