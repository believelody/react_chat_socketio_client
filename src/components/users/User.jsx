import React, { useEffect, useState } from "react";
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

  const confirmAction = (data, cancel, display) => {
    if (data.error) {
      alert(data.error)
    }
    else {
      setRequests(data.requests)
      setCancel(cancel)
      if (display) alert(data.from.msg)
    }
  }

  socket.on('new-request-confirm', data => {
    console.log(data)
    if (data.from.id === user.id) confirmAction(data, true, false)
  })

  socket.on('cancel-request-confirm', data => {
    if (data.from.id === user.id) confirmAction(data, false, false)
  })

  socket.on('delete-request-confirm', data => {
    console.log(data)
    if (data.to.id === user.id) confirmAction(data, false, false)
  })

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
    }
  };

  const sendFriendRequest = async () => {
    socket.emit("new-request", { contactId: contact.id, userId: user.id });
    // try {
    //   let res = await api.user.requestFriend(contact.id, user.id);
    //   if (res.data) {
    //     // alert(res.data.msg)
    //     setRequests(res.data.requests)
    //   }
    //   // setCancel(true)
    // if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const cancelFriendRequest = async () => {
    socket.emit("cancel-request", { contactId: contact.id, userId: user.id});
    // try {
    //   let res = await api.user.cancelFriendRequest(contact.id, user.id);
    //   if (res.data) {
    //     // alert(res.data.msg)
    //     setRequests(res.data.requests)
    //   }
    //   // setCancel(false)
    // if (isMobile) dispatchTransition({ type: CHAT_SELECTED, payload: true });
    // } catch (error) {
    //   console.log(error.response.data);
    // }
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

  useEffect(() => {
    console.log(requests)
    setCancel(requests.length > 0 ? requests.find(r => r.id === user.id) : false)
  }, [requests, cancel])

  return (
    <UserStyle cancel={cancel}>
      <span className="contact-name">{contact.name}</span>
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
