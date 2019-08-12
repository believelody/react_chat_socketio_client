import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { CHAT_SELECTED } from "../../reducers/transitionReducer";
import isMobile from "../../utils/isMobile";
import api, { baseUrl } from "../../api";
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

const User = ({ contact }) => {
  const { useAuth, useTransition, useModal, history, socket } = useAppHooks();
  const [{ user }, dispatchAuth] = useAuth;
  const [transition, dispatchTransition] = useTransition;
  const [modal, dispatchModal] = useModal;

  const closeModal = () => dispatchModal({ type: CLOSE_MODAL });

  const openChat = async () => {
    // socket.emit("new-chat", users);
    try {
      console.log(contact);
      console.log(user);
      const res = await api.chat.createChat([contact, user]);
      let chat = res.data;
      console.log(await chat);
      // let users = [contact, user];
      // let res = await api.chat.createChat(users);
      // console.log(res.data);
      // let chatRequest = res.data;
      // if (chatRequest) {
      // console.log(chatRequest);
      // history.push(`/chats/${chatRequest.id}`);
      // } else {
      // let res = await api.chat.createChat(users);
      // let chat = res.data;
      // if (chat) {
      //   history.push(`/chats/${chat.id}`);
      // }
      // }
      closeModal();
      if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
    } catch (error) {
      throw error;
    }
  };

  const sendFriendRequest = async () => {
    alert("Friend Request");
    // socket.emit("new-chat", users);
    // try {
    //   let users = [contact.name, user.name];
    //   let res = await api.chat.searchChatByUsers(users);
    //   let chatRequest = res.data;
    //   if (chatRequest) {
    //     history.push(`/chats/${chatRequest.id}`);
    //   } else {
    //     let res = await api.chat.createChat(users);
    //     let chat = res.data;
    //     if (chat) {
    //       history.push(`/chats/${chat.id}`);
    //     }
    //   }
    //   closeModal();
    // if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
    // } catch (error) {
    //   throw error;
    // }
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
