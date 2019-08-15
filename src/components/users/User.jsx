import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { CHAT_SELECTED } from "../../reducers/transitionReducer";
import isMobile from "../../utils/isMobile";
import api from "../../api";
import OpenChatIcon from "../icons/OpenChatIcon";
import FriendRequestIcon from "../icons/FriendRequestIcon";
import { CLOSE_MODAL } from "../../reducers/modalReducer";

const UserStyle = styled.li`
  margin: 0;
  padding: 4px 0;
  cursor: pointer;
  width: auto;
  height: 40px;
  color: black;
  display: flex;
  align-items: center;
  transition: all 300ms ease-in;

  &:hover {
    background-color: #32465a;
    padding-left: 16px;
    border-right: 0.6em solid white;
    color: white;
  }

  & .contact-name {
    font-size: 1.5em;
    letter-spacing: 4px;
  }

  & .contact-actions {
    margin-left: auto;
    margin-right: 8px;
  }
`;

const User = ({ contact, match }) => {
  const { useAuth, useTransition, useModal, history } = useAppHooks();
  const [{ user }, dispatchAuth] = useAuth;
  const [transition, dispatchTransition] = useTransition;
  const [modal, dispatchModal] = useModal;

  const closeModal = () => dispatchModal({ type: CLOSE_MODAL });

  const openChat = async () => {
    try {
      let res = await api.chat.searchChatByUsers([contact.name, user.name]);
      if (!res.data) {
        res = await api.chat.createChat([contact.name, user.name])
      }
      closeModal();
      history.push(`/chats/${res.data.chatId}`);
      if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
    } catch (error) {
      console.log(error);
      closeModal()
    }
  };

  const sendFriendRequest = async () => {
    // socket.emit("new-chat", users);
    try {
      let res = await api.user.requestFriend(contact.id, user.id);
      if (res.data) {
        alert(res.data.msg)
      }
      closeModal();
    if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserStyle>
      <span className="contact-name">{contact.name}</span>
      <span className="contact-actions">
        <OpenChatIcon handleClick={openChat} />
        <FriendRequestIcon handleClick={sendFriendRequest} />
      </span>
    </UserStyle>
  );
};

export default User;
