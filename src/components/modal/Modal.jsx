import React, { useRef } from "react";
import styled from "styled-components";
import devices from "../../utils/devices";
import { useAppHooks } from "../../contexts";
import { CLOSE_MODAL } from "../../reducers/modalReducer";
import Users from "../users/Users";
import { RESET_CONTENT } from "../../reducers/searchReducer";
import CloseIcon from "../icons/CloseIcon";

const Content = styled.section``;

const ErrorContentStyle = styled.div``;

const Dimmer = styled.div`
  top: 0;
  left: 0;
  border: 1px solid black;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: ${props => (props.isOpen ? 99 : -1)};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  padding: 0;
  margin: 0;
  transition: all 500ms ${props => (props.isOpen ? 0 : 200)}ms ease-in-out;

  & ${Content} {
    position: absolute;
    top: ${props => (props.isOpen ? 50 : 0)}%;
    left: ${props => (props.isOpen ? 50 : 0)}%;
    transform: translate3d(-50%, -50%, 0);
    width: ${props => (props.isOpen ? 40 : 0)}%;
    height: ${props => (props.isOpen ? 95 : 0)}%;
    transition: all 500ms ${props => (!props.isOpen ? 0 : 200)}ms ease-in-out;

    & > .close {
      display: none;
    }
  }

  @media ${devices.mobileL} {
    & ${Content} {
      width: ${props => (props.isOpen ? 98 : 0)}%;

      & > .close {
        color: black;
        position: absolute;
        right: 8px;
        top: 4px;
        display: block;
        font-size: 1.2em;
        cursor: pointer;
      }
    }
  }
`;

const ErrorContent = () => {
  return <ErrorContentStyle>Oups!!! Something's wrong!!!</ErrorContentStyle>;
};

const Modal = () => {
  const ContentRef = useRef();

  const { useModal, useSearch } = useAppHooks();
  const [{ isOpen, label }, dispatchModal] = useModal;
  const [searchState, dispatchSearch] = useSearch;

  const handleClick = e => {
    if (!ContentRef.current.contains(e.target)) {
      dispatchSearch({ type: RESET_CONTENT });
      dispatchModal({ type: CLOSE_MODAL });
    }
  };

  const closeModal = () => dispatchModal({ type: CLOSE_MODAL });

  const renderContent = () => {
    switch (label) {
      case "user":
        return <Users />;

      default:
        return null;
    }
  };

  return (
    <Dimmer isOpen={isOpen} onClick={handleClick}>
      <Content ref={ContentRef}>
        <CloseIcon className="close" handleClick={closeModal} />
        {renderContent()}
      </Content>
    </Dimmer>
  );
};

export default Modal;
