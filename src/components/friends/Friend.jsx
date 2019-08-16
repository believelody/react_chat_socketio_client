import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { CHAT_SELECTED } from "../../reducers/transitionReducer";
import isMobile from "../../utils/isMobile";
import api from "../../api";
import OpenChatIcon from "../icons/OpenChatIcon";
import FriendRequestIcon from "../icons/FriendRequestIcon";

const FriendStyle = styled.li`
  margin: 0;
  padding: 4px 0;
  cursor: pointer;
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  transition: all 300ms ease-in;

  &:hover {
    background-color: #32465a;
    padding-left: 16px;
    border-right: 0.6em solid white;
    color: white;
  }

  & .friend-name {
    font-size: 1.8em;
    margin-left: 8px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
  }

  & .friend-actions {
    margin-left: auto;
    margin-right: 8px;

    & > .friend-actions-chat {
      background-color: #FFA500;
    }

    & > .friend-actions-unfriend {
      background-color: indianred;
        cursor: pointer;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        margin: 0px 4px;
    }
  }
`;

const Friend = ({ friend }) => {
  const { useAuth, useTransition, history, socket } = useAppHooks();
  const [{ user }, dispatchAuth] = useAuth;
  const [transition, dispatchTransition] = useTransition;

  const openChat = async () => {
    let users = [friend.id, user.id];
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

  const unfriend = () => {
    socket.emit('delete-friend', {contactId: friend.id, userId: user.id})
  }

  return <FriendStyle>
    <span className="friend-name">{friend.name}</span>
    <span className="friend-actions">
      <OpenChatIcon className='friend-actions-chat' handleClick={openChat} />
      <FriendRequestIcon
        className='friend-actions-unfriend'
        cancel={true}
        handleClick={unfriend}
      />
    </span>
  </FriendStyle>;
};

export default Friend;
