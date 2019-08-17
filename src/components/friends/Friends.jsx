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
  padding: 0px;

  &::-webkit-scrollbar {
    width: 8px;
    background: #2c3e50;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #243140;
  }
`;

const Friends = () => {
  const { useAuth, socket } = useAppHooks();
  const [{ user }, _] = useAuth;

  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true)

  socket.on('new-friend-confirm', data => {
    if (data.to.id === user.id) setFriends(data.to.friends)
    if (data.from.id === user.id) setFriends(data.from.friends)
  })

  socket.on('delete-friend-confirm', data => {
    if (data.to.id === user.id) setFriends(data.to.friends)
    if (data.from.id === user.id) setFriends(data.from.friends)
  })

  useEffect(() => {
    const getFriends = async () => {
      if (user) {
        let res = await api.user.getFriendList(user.id)
        setFriends(res.data)
      }
      setLoading(false)
    }

    getFriends()
  }, [])

  return (
    <FriendsContainer>
      <FriendList>
        {!loading && friends.length === 0 && <h4>You have no friends. Start search amazing people.</h4>}
        {!loading && friends.length > 0 && friends.map(friend => <Friend key={friend.id} friend={friend} />)}
      </FriendList>
      <Requests />
    </FriendsContainer>
  );
};

export default Friends;
