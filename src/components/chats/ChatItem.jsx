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
  position: relative;

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

  & .chat-count-unreads {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translate3d(0, -50%, 0);
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
    const [nbUnread, setUnread] = useState(chat.unreads.length)

    const openChat = async () => {
        if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
        history.push(`/chats/${chat.id}`);
    };

    socketOn('count-unread-message', socket, chat, (data, chat) => {
      if (data && data.unread && data.unread.userId === user.id && data.unread.chatId === chat.id) {
        setUnread(prevUnread => prevUnread + 1)
      }
      else {
        setUnread(prevUnread => prevUnread === 1 ? 0 : prevUnread - 1)
      }
    })

    console.log(chat)

    return <ChatItemStyle handleClick={openChat}>
        {contact && <span className="chat-name">{contact.name}</span>}
        <span className="chat-text">{lastMsg}</span>
        {nbUnreads > 0 && <span className='count-unread'>{nbUnreads}</span>}
    </ChatItemStyle>;
};

export default ChatItem;
