import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import api from "../../api";
import AcceptIcon from "../icons/AcceptIcon";
import CloseIcon from "../icons/CloseIcon";

const RequestStyle = styled.li`
  margin: 0;
  padding: 8px 0;
  width: auto;
  height: 50px;
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

    & > .contact-action-accept {
        background-color: #8FBC8F;
        cursor: pointer;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        margin: 0px 4px;
    }

    & > .contact-action-close {
        background-color: indianred;
        cursor: pointer;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        margin: 0px 4px;
    }
  }
`;

const Request = ({ contact }) => {
    const { useAuth, socket  } = useAppHooks();
    const [{ user }, dispatchAuth] = useAuth;

    const confirmRequestDenied = () => {
        socket.on('delete-request-confirm', data => {
            if (data.error) {
                alert(data.error)
            }
            else {
                if (data.from === user.id) {
                    alert(data.msg)
                }
            }
        })
    }

    const confirmFriendAccepted = () => {
        socket.on('new-friend-confirm', data => {
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
        })
    }

    const acceptFriendRequest = async () => {
        socket.emit('new-friend', { contactId: contact.id, userId: user.id })
        confirmFriendAccepted()
        /* try {
            let res = await api.user.addFriend(contact.id, user.id);
            if (res.data) {
                alert(res.data.msg)
                handlePropsFromParent(res.data.requests)
            }
        } catch (error) {
            console.log(error);
        } */
    };

    const denyFriendRequest = async () => {
        socket.emit("delete-request", { contactId: contact.id, userId: user.id });
        confirmRequestDenied()
        /* try {
            const res = await api.user.deleteRequest(contact.id, user.id)
            if (res.data) {
                alert(res.data.msg)
                handlePropsFromParent(res.data.requests)
            }
        } catch (error) {
            console.log(error.response.data);
        } */
    };

    return (
        <RequestStyle>
            <span className="contact-name">{contact.name}</span>
            <span className="contact-actions">
                <AcceptIcon className='contact-action-accept' handleClick={acceptFriendRequest} />
                <CloseIcon className='contact-action-close' handleClick={denyFriendRequest} />
            </span>
        </RequestStyle>
    );
};

export default Request;
