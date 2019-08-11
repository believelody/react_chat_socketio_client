import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { CHAT_SELECTED } from "../../reducers/transitionReducer";
import isMobile from "../../utils/isMobile";
import api from "../../api";

const FriendStyle = styled.li`
  margin: 0;
  padding-left: 8px;
  transition: all 300ms ease-in;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: #32465a;
    padding-left: 24px;
    border-right: 2px solid #2c3e50;
  }
`;

const Friend = ({ contact }) => {
  const { useAuth, useTransition, history, socket } = useAppHooks();
  const [{ user }, dispatchAuth] = useAuth;
  const [transition, dispatchTransition] = useTransition;

  const handleClick = async () => {
    let users = [contact.id, user.id];
    socket.emit("new-chat", users);
    if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
    // try {
    //   let chatRequest = await api.chat.searchChatByFriends(users);

    //   if (chatRequest) {
    //     history.push(`/chats/${chatRequest.id}`);
    //   } else {
    //     let chat = await api.chat.createChat(users);
    //     if (chat) {
    //       history.push(`/chats/${chat.id}`);
    //     }
    //   }
    // } catch (error) {
    //   throw error;
    // }
  };

  return <FriendStyle onClick={handleClick}>{contact.username}</FriendStyle>;
};

export default Friend;
