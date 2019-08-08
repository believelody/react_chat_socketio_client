import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import Friend from "./Friend";

const FriendsContainer = styled.div`
  padding: 0;
  margin: 0;

  & h4 {
    margin-left: 15px;
  }
`;

const FriendList = styled.ul`
  list-style: none;

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
  const { authReducer, socket } = useAppHooks();
  const [{ user }, _] = authReducer;

  const [friends, setFriends] = useState([]);

  socket.on("fetch-friends", data => {
    console.log(user);
    setFriends(data);
  });

  console.log(friends);

  return (
    <FriendsContainer>
      <FriendList>
        {friends.length > 0 &&
          friends.map(friend => <Friend key={friend.id} contact={friend} />)}
      </FriendList>
    </FriendsContainer>
  );
};

export default Friends;
