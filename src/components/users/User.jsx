import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { CHAT_SELECTED } from "../../reducers/transitionReducer";
import isMobile from "../../utils/isMobile";
import api from "../../api";
import OpenChatIcon from "../icons/OpenChatIcon";
import FriendRequestIcon from "../icons/FriendRequestIcon";
import { CLOSE_MODAL } from "../../reducers/modalReducer";
import { socketOn, socketEmit } from "../../socket";

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

  & .contact-info {
    display: flex;
    flex-direction: column;

    & .contact-name {
      font-size: 1.5em;
      letter-spacing: 4px;
    }

    & .contact-email {
      font-style: italic;
    }
  }

  & .contact-actions {
    margin-left: auto;
    margin-right: 8px;

    & > .contact-actions-chat {
      background-color: #FFA500;
    }

    & > .contact-actions-request {
      background-color: ${props => props.cancel ? 'indianred' : '#8FBC8F'};
        cursor: pointer;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        margin: 0px 4px;
    }
  }
`;

const User = ({ contact }) => {
  const { useAuth, useTransition, useModal, history, socket } = useAppHooks();
  const [{ user }, dispatchAuth] = useAuth;
  const [transition, dispatchTransition] = useTransition;
  const [modal, dispatchModal] = useModal;

  const [requests, setRequests] = useState(contact.requests)
  const [cancel, setCancel] = useState(false)

  const closeModal = () => dispatchModal({ type: CLOSE_MODAL });

  const confirmAction = (data, user, cancel, display) => {
    if (data.error) {
      alert(data.error)
    }
    else if (data.from.id === user.id){
      setRequests(data.requests)
      setCancel(cancel)
      if (display) alert(data.from.msg)
    }
  }

  socketOn('new-request-confirm', socket, user, (data, user) => confirmAction(data, user, true, false))
  socketOn('cancel-request-confirm', socket, user, (data, user) => confirmAction(data, user, false, false))
  socketOn('delete-request-confirm', socket, user, (data, user) => confirmAction(data, user, false, false))

  const openChat = async () => {
    try {
      let users = [contact.id, user.id];
      let res = await api.chat.searchChatByUsers(contact.id, user.id);
      if (!res.data) {
        res = await api.chat.createChat(users)
      }
      closeModal();
      if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
      if (res.data && res.data.id) history.push(`/chats/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const sendFriendRequest = async () => {
    socketEmit('new-request', socket, {contactId: contact.id, userId: user.id})
  };

  const cancelFriendRequest = async () => {
    socketEmit('cancel-request', socket, { contactId: contact.id, userId: user.id })
  };

  const handleClick = () => {
    if (cancel) {
      cancelFriendRequest()
      setCancel(false)
    }
    else {
      sendFriendRequest()
      setCancel(true)
    }
  }

  socketOn('delete-request-confirm', socket, user, (data, user) => {
    if (user) {
      if (data.to.id === user.id) {
        setCancel(false)
      }
      else if (data.error) {
        alert(data.error.msg)
      }
    }
  })

  useEffect(() => {
    if (requests.length > 0) {
      let requester = requests.find(r => r.requesterId === user.id ? true : false)
      console.log(cancel)
      setCancel(!!requester)
    }
  }, [])

  return (
    <UserStyle cancel={cancel}>
      <span className='contact-info'>
        <span className="contact-name">{contact.name}</span>
        <span className="contact-email">{contact.email}</span>
      </span>
      <span className="contact-actions">
        <OpenChatIcon className='contact-actions-chat' handleClick={openChat} />
        <FriendRequestIcon
          className='contact-actions-request'
          cancel={cancel}
          handleClick={handleClick} 
        />
      </span>
    </UserStyle>
  );
};

export default User;
