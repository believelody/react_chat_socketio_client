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
    box-shadow: 2px 2px 4px rgba(0, 0, 0, .8), -2px -2px 4px rgba(0, 0, 0, .8);
    background-image: linear-gradient(102deg, rgba(249, 249, 249, 0.1) 0%, rgba(249, 249, 249, 0.1) 14%,rgba(161, 161, 161, 0.1) 14%, rgba(161, 161, 161, 0.1) 100%),linear-gradient(310deg, rgba(26, 26, 26, 0.03) 0%, rgba(26, 26, 26, 0.03) 71%,rgba(189, 189, 189, 0.03) 71%, rgba(189, 189, 189, 0.03) 100%),linear-gradient(133deg, rgba(132, 132, 132, 0.1) 0%, rgba(132, 132, 132, 0.1) 8%,rgba(95, 95, 95, 0.1) 8%, rgba(95, 95, 95, 0.1) 100%),linear-gradient(142deg, rgba(110, 110, 110, 0.03) 0%, rgba(110, 110, 110, 0.03) 46%,rgba(8, 8, 8, 0.03) 46%, rgba(8, 8, 8, 0.03) 100%),linear-gradient(346deg, rgba(231, 231, 231, 0.05) 0%, rgba(231, 231, 231, 0.05) 6%,rgba(71, 71, 71, 0.05) 6%, rgba(71, 71, 71, 0.05) 100%),linear-gradient(118deg, rgba(251, 251, 251, 0.07) 0%, rgba(251, 251, 251, 0.07) 72%,rgba(24, 24, 24, 0.07) 72%, rgba(24, 24, 24, 0.07) 100%),linear-gradient(338deg, rgba(75, 75, 75, 0.08) 0%, rgba(75, 75, 75, 0.08) 37%,rgba(213, 213, 213, 0.08) 37%, rgba(213, 213, 213, 0.08) 100%),linear-gradient(90deg, rgb(199, 202, 132),rgb(25, 94, 125));
    background-color: #192a56;
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
    const { useAuth } = useAppHooks();
    const [{ user }, _] = useAuth;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const getRequests = async () => {
        if (user) {
            let res = await api.user.getRequestList(user.id)
            if (res.data.length > 0) setRequests(res.data)
        }
        setLoading(false)
      }

      getRequests()
    }, [])

    console.log(requests)

    return (
      <RequestsContainer>
          <RequestList>
            <div className='request-label'>Friends request: <span>{requests.length > 0 ? requests.length : 0}</span></div>
            {!loading && requests.length === 0 && <h4>You have no requests. Start search amazing people.</h4>}
            {!loading && requests.length > 0 && requests.map(request => <Request key={request.id} request={request} />)}
          </RequestList>
      </RequestsContainer>
    )
};

export default Requests;
