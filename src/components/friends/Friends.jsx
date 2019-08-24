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

  & > .friend-label {
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
        setFriends(res.data.friends)
      }
      setLoading(false)
    }

    if (user) getFriends()
  }, [user])

  return (
    <FriendsContainer>
      {!loading && friends.length === 0 && <h4>You have no friends. Start search amazing people.</h4>}
      {
        !loading && friends.length > 0 &&
        <FriendList>
        <div className='request-label'>
          Your Friends: <span>{friends.length > 0 ? friends.length : 0}</span>
        </div>
        {friends.map(friend => <Friend key={friend.id} friend={friend} />)}
        </FriendList>
      }
      <Requests />
    </FriendsContainer>
  );
};

export default Friends;
