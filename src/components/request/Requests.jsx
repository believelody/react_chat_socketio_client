import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import api from "../../api";
import Request from "./Request";

const RequestsContainer = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;

  & h4 {
    margin-left: 15px;
  }
`;

const RequestList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  color: black;

  & > .request-label {
    width: 100%;
    height: 100%;
    text-shadow: 2px 2px 4px rgba(255, 255, 255, .6);
    padding: 12px 8px;
    text-align: left;
    font-size: 1.2em;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .8), -1px -1px 2px rgba(0, 0, 0, .8);
    background-color: white;
    border-radius: 2px;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background: #2c3e50;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #243140;
  }
`;

const Requests = () => {
    const { useAuth, socket } = useAppHooks();
    const [{ user }, dispatchAuth] = useAuth;

  const [requests, setRequests] = React.useState([])

  socket.on('new-request-confirm', data => {
    if (data.to.id === user.id) setRequests(data.requests)
  })

  socket.on('cancel-request-confirm', data => {
    if (data.to.id === user.id) setRequests(data.requests)
  })

  socket.on('delete-request-confirm', data => {
    if (data.from.id === user.id) setRequests(data.requests)
  })

  socket.on('new-friend-confirm', data => {
    if (data.from.id === user.id) setRequests(data.from.requests)
  })

  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.user.getRequestList(user.id)
        setRequests(res.data.requests)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRequests()
  }, [])

    return (
      <RequestsContainer>
        {
          requests.length > 0 &&
          <RequestList>
            <div className='request-label'>Friends request: <span>{requests.length > 0 ? requests.length : 0}</span></div>
            {requests.map(request => <Request key={request.id} contact={request} />)}
          </RequestList>
        }
      </RequestsContainer>
    )
};

export default Requests;
