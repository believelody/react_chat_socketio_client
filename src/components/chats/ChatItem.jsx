import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { CHAT_SELECTED } from "../../reducers/transitionReducer";
import isMobile from "../../utils/isMobile";
import api from "../../api";
import OpenChatIcon from "../icons/OpenChatIcon";
import { socketEmit, socketOn } from "../../socket";

const ChatItemStyle = styled.li`
  margin: 0;
  padding: 4px 0;
  width: auto;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  transition: all 300ms ease-in;
  border-bottom: 2px solid rgba(255, 255, 255, .4);

  &:hover {
    background-color: #32465a;
    padding-left: 16px;
    border-right: 0.6em solid white;
    color: white;
  }

  & .chat-name {
    font-size: 1.5em;
    margin-left: 8px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
  }

  & .chat-text {
    font-size: 1.2em;
    padding: 4px 0px;
    margin-left: 16px;
  }

  & .chat-actions {
    margin-left: auto;
    margin-right: 8px;

    & > .chat {
      background-color: #FFA500;
    }

    & > .chat-actions-btn {
      cursor: pointer;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
      box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
      margin: 0px 4px;
    }
  }
`;

const ChatItem = ({ chat }) => {
    const { useAuth, useTransition, history, socket } = useAppHooks();
    const [{ user }, dispatchAuth] = useAuth;
    const [transition, dispatchTransition] = useTransition;

    const [contact, setContact] = useState(chat.users.find(u => u.id !== user.id))
    const [lastMsg, setLastMsg] = useState(chat.messages[0].text)
    const [unreads, setUnread] = useState(0)

    const openChat = async () => {
        if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
        history.push(`/chats/${chat.id}`);
    };

    socketOn('count-unread-message', socket, chat, (data, chat) => {

    })

    console.log(chat)

    return <ChatItemStyle handleClick={openChat}>
        {contact && <span className="chat-name">{contact.name}</span>}
        <span className="chat-text">{lastMsg}</span>
        {/* <span className="chat-actions">
            <OpenChatIcon className='chat-actions-btn chat' />
            {<ChatItemRequestIcon
                className='chat-actions-btn unchat'
                cancel={true}
            />}
        </span> */}
    </ChatItemStyle>;
};

export default ChatItem;
