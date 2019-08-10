import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import api from "../../api";

const RequestsContainer = styled.div`
  padding: 0;
  margin: 0;

  & h4 {
    margin-left: 15px;
  }
`;

const RequestList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & > .request-label {
    width: 100%;
    height: 100%;
    padding: 4px;
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
                let f = await api.user.getRequestList(user.id)
                if (f.length > 0) setRequests(f)
            }
            setLoading(false)
        }

        getRequests()
    }, [user])

    return requests.length > 0 ?
        <RequestsContainer>
            <RequestList>
                <label className='request-label'>Friends request <span>{requests.length > 0 ? requests.length : 0}</span></label>
                {!loading && requests.length === 0 && <h4>You have no requests. Start search amazing people.</h4>}
                {!loading && requests.length > 0 && console.log(requests)}
            </RequestList>
        </RequestsContainer>
        :
        null
};

export default Requests;
