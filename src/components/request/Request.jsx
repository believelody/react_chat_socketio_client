import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import api from "../../api";
import AcceptIcon from "../icons/AcceptIcon";
import CloseIcon from "../icons/CloseIcon";
import { socketEmit, socketOn } from "../../socket";

const RequestStyle = styled.li`
  margin: 0;
  padding: 8px 0;
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, .4);
  transition: all 300ms ease-in;

  &:hover {
    background-color: rgba(50, 70, 90, .6);
    padding-left: 16px;
    border-right: 0.6em solid white;
  }

  & .contact-name {
    font-size: 1.2em;
    margin-left: 8px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
  }

  & .contact-actions {
    margin-left: auto;
    margin-right: 8px;

    & > .contact-action-btn {
        width: 30px;
        height: 30px;
        cursor: pointer;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        margin: 0px 4px;
        padding: 0;
    }

    & > .accept {
        background-color: #8FBC8F;
    }

    & > .close {
        background-color: indianred;
    }
  }
`;

const Request = ({ contact }) => {
    const { useAuth, socket  } = useAppHooks()
    const [{ user }, dispatchAuth] = useAuth

    const confirmFriendAccepted = (data, user) => {
        if (data.error) {
            alert(data.error)
        }
        else {
            if (data.from === user.id) {
                alert(data.msgToReceiverRequest)
            }
            else if (data.to === user.id) {
                alert(data.msgToSenderRequest)
            }
        }
    }

    const confirmRequestDenied = (data, user) => {
        console.log(user)
        if (data.error) {
            alert(data.error)
        }
        else {
            if (data.from.id === user.id) {
                alert(data.from.msg)
            }
        }
    }

    const acceptFriendRequest = async () => {
        socketEmit('new-friend', socket, { contactId: contact.id, userId: user.id })
        socketOn('new-friend-confirm', socket, user, (data, user) => confirmFriendAccepted(data, user))
    };

    const denyFriendRequest = async () => {
        socketEmit('delete-request', socket, { contactId: contact.id, userId: user.id })
        socketOn('delete-request-confirm', socket, user, (data, user) => confirmRequestDenied(data, user))
    };

    return (
        <RequestStyle>
            <span className="contact-name">{contact.name}</span>
            <span className="contact-actions">
                <AcceptIcon className='contact-action-btn accept' handleClick={acceptFriendRequest} />
                <CloseIcon className='contact-action-btn close' handleClick={denyFriendRequest} />
            </span>
        </RequestStyle>
    );
};

export default Request;
