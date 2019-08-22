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
    padding-left: 8px;
    padding-right: 16px;
    margin-left: 16px;
  }

  & .chat-count-unread {
    position: absolute;
    font-size: 1.5em;
    right: 5%;
    top: 50%;
    border: 1px solid white;
    border-radius: 50%;
    padding: 4px;
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
    const [lastMsg, setLastMsg] = useState()
    const [nbUnread, setUnread] = useState(0)

    const openChat = async () => {
        if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
        history.push(`/chats/${chat.id}`);
    };

    socketOn('count-unread-message', socket, chat, (data, chat) => {
      if (data && data.unread && data.users.find(u => u.id === user.id) && data.chat.id === chat.id) {
        setUnread(prevUnread => prevUnread + 1)
      }
      else {
        setUnread(prevUnread => prevUnread === 1 ? 0 : prevUnread - 1)
      }

      if (data && data.message) {
        setLastMsg(data.message.text)
      }
    })

    useEffect(() => {
      if (chat.messages.length > 0) setLastMsg(chat.messages.reverse()[0].text)
      if (chat.unreads.length > 0 && chat.unreads.find(u => u.authorId !== user.id)) setUnread(chat.unreads.length)
    }, [])

    // console.log(chat)

    return <ChatItemStyle handleClick={openChat}>
        {nbUnread > 0 && <span className='chat-count-unread'>{nbUnread}</span>}
        {contact && <span className="chat-name">{contact.name}</span>}
        <span className="chat-text">{lastMsg}</span>
    </ChatItemStyle>;
};

export default ChatItem;
