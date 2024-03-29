import React from "react";
import moment from "moment";
import Moment from "react-moment";
import styled from "styled-components";
import devices from "../../utils/devices";
import { useAppHooks } from "../../contexts";

const MessageStyle = styled.li`
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  background-image: ${props =>
    props.isYou
      ? "linear-gradient(45deg, #eee, #fff)"
      : "linear-gradient(45deg, #06beb6, #48b1bf)"};
  padding: 8px 5px;
  margin: 4px 0px;
  max-width: 40%;
  position: relative;
  color: black;
  left: ${props => (!props.isYou ? "0px" : "60%")};
  /* right: ${props => (props.isYou ? "0px" : "40%")}; */

  & .message-author {
    padding: 0;
    margin: 4px 0;
  }

  & .message-text {
    overflow-wrap: break-word;
    word-break: break-all;
  }

  & .message-date {
    float: right;
    font-size: .8em;
    font-style: oblique;
    position: absolute;
    right: 5%;
    bottom: 0;
  }

  @media ${devices.tablet} {
    max-width: 55%;
    left: ${props => (!props.isYou ? "0px" : "45%")};
    margin: 5px 0;
  }

  @media ${devices.mobileL} {
    max-width: 65%;
    left: ${props => (!props.isYou ? "0px" : "35%")};
    margin: 5px 0;
  }
`;

const MessageItem = ({ message, contact }) => {
  const { useAuth } = useAppHooks()
  const [{user}, dispatchAuth] = useAuth

  return (
    <MessageStyle isYou={message.authorId === user.id}>
      <h5 className="message-author">
        {message.authorId === user.id ? "You" : contact.name}
      </h5>
      <p className="message-text">{message.text}</p>
      <span className="message-date">
        - <Moment format="HH:mm" date={message.createdAt} /> -
      </span>
    </MessageStyle>
  );
};

export default MessageItem;
