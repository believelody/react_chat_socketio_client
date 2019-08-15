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

  & .request-name {
    font-size: 1.5em;
    margin-left: 8px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
  }

  & .request-actions {
    margin-left: auto;
    margin-right: 8px;

    & > .request-action-accept {
        background-color: #8FBC8F;
        cursor: pointer;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
    }

    & > .request-action-close {
        background-color: indianred;
        cursor: pointer;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
    }
  }
`;

const Request = ({ request }) => {
    const { useAuth  } = useAppHooks();
    const [{ user }, dispatchAuth] = useAuth;

    const acceptFriendRequest = async () => {
        try {
            let res = await api.user.addFriend(request.id, user.id);
            if (res.data) {
                alert(res.data.msg)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const denyFriendRequest = async () => {
        try {
            alert("Denied")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <RequestStyle>
            <span className="request-name">{request.name}</span>
            <span className="request-actions">
                <AcceptIcon className='request-action-accept' handleClick={acceptFriendRequest} />
                <CloseIcon className='request-action-close' handleClick={denyFriendRequest} />
            </span>
        </RequestStyle>
    );
};

export default Request;
