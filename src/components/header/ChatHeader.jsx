import React, { useEffect, useRef, useState } from "react";
import { Icon } from 'semantic-ui-react'
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { CHAT_UNSELECTED } from "../../reducers/transitionReducer";
import devices from "../../utils/devices";
import { useTransition } from "../../contexts/transitionContext";

const ChatHeaderStyle = styled.header`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  position: absolute;
  padding: 0 0 0 25px;
  margin: 0;
  top: 0;
  left: 0;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  color: black;

  & > .go-back {
    display: none;
  }

  & > h4 {
    padding: 0;
    margin: 0 0 0 15px;
  }

  & > .img-contact {
    width: 40px;
    line-height: 30px;
    border-radius: 50%;
    height: 40px;
    text-align: center;
    font-size: 2em;
    background-color: white;
    border: 2px solid #aaa;
    cursor: pointer;
  }

  & > .btn-option {
    text-align: center;
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    padding: 5px;
    margin: 0;
    font-size: 1.2em;
    border-radius: 4px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
    width: 40px;
    cursor: pointer;
  }

  & .header-typing {
    margin-left: 30px;
    font-style: italic;
  }

  @media ${devices.mobileL} {
    & > .go-back {
      display: inline-block;
      padding: 5px;
      border-radius: 4px;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
      width: 40px;
      cursor: pointer;
    }
  }
`;

const ChatHeader = ({ getHeaderPosition, isDisplayed, users }) => {
  const { useTransition, socket } = useAppHooks();

  const [chatSelected, dispatchTransition] = useTransition;

  const [isTyping, setTyping] = useState(false);
  const [isSelected, setSelected] = useState(false);

  const headerRef = useRef();

  const handleTransition = e => {
    dispatchTransition({ type: CHAT_UNSELECTED, payload: false });
  };

  const handleClick = e => {
    getHeaderPosition(
      !isDisplayed,
      headerRef.current.getBoundingClientRect().height
    );
  };

  socket.on("is-typing", data => setTyping(data));

  // useEffect(() => {
  //   if (localStorage.user) {
  //     setDest(chat.users.find(user => user.user !== localStorage.user));
  //   }
  // }, [localStorage.user, dest, chat.users]);

  useEffect(() => {
    setSelected(!isSelected);
  }, []);

  return (
    <ChatHeaderStyle ref={headerRef}>
      <span className="btn-option" onClick={handleClick}>
        +
      </span>
      <span className="go-back" onClick={handleTransition}>
        <Icon name='arrow left' />
      </span>
      {
        users.length > 1 && (
          <React.Fragment>
            <span className="img-contact">
              G
            </span>
            {
              users.slice(0, 2).map((user, i) => {
                if (i < 2) {
                  return <span key={i}>{user.name}{i < users.length - 1 && ', '}</span>
                }
                else {
                  return <h4 key={i}>+{users.length - 2}</h4>
                }
              })
            }
          </React.Fragment>
        )
      }
      {
        users.length === 1 && (
          <React.Fragment>
            {
              users.map(user => (
                <span className="img-contact" key={user.id}>
                  {user.name[0].toUpperCase()}
                </span>
              ))
            }
            {
              users.map(user => <h4 key={user.id}>{user.name}</h4>)
            }
          </React.Fragment>
        )
      }      
      {isTyping && <span className="header-typing">is typing...</span>}
    </ChatHeaderStyle>
  );
};

export default ChatHeader;
