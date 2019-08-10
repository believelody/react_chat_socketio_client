import React from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { OPEN_MODAL } from "../../reducers/modalReducer";

const HeaderStyle = styled.header`
  text-align: center;
  text-transform: uppercase;

  & .search-contact {
    margin-left: auto;
    cursor: pointer;
  }
`;

const SidenavHeader = () => {
  const { useModal } = useAppHooks()
  const [_, dispatch] = useModal

  const handleClick = e => {
    dispatch({ type: OPEN_MODAL })
  }

  return (
    <HeaderStyle>
      <h4>SocketIO Chat</h4>
      <span className='search-contact' onClick={handleClick}>
        <i className='fas fa-user-plus'></i>
      </span>
    </HeaderStyle>
  );
};

export default SidenavHeader;
