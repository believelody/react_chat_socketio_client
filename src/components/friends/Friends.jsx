import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import Friend from "./Friend";
import api from "../../api";
import Requests from "../request/Requests";

const FriendsContainer = styled.div`
  padding: 0;
  margin: 0;

  & h4 {
    margin-left: 15px;
  }
`;

const FriendList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 12px 0px;

  &::-webkit-scrollbar {
    width: 8px;
    background: #2c3e50;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #243140;
  }
`;

// const socket = io(":5000");

const Friends = () => {
  const { useAuth } = useAppHooks();
  const [{ user }, _] = useAuth;

  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getFriends = async () => {
      if (user) {
        let f = await api.user.getFriendList(user.id)
        if (f.length > 0) setFriends(f)
      }
      setLoading(false)
    }

    getFriends()
  }, [user])

  return (
    <FriendsContainer>
      <FriendList>
        {!loading && friends.length === 0 && <h4>You have no friends. Start search amazing people.</h4>}
        {!loading && friends.length > 0 && console.log(friends)}
      </FriendList>
      <Requests />
    </FriendsContainer>
  );
};

export default Friends;
