import React from "react";
import moment from "moment";
import Moment from "react-moment";
import styled from "styled-components";
import devices from "../../utils/devices";

const MessageStyle = styled.li`
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  background-image: ${props =>
    props.isYou
      ? "linear-gradient(45deg, #eee, #fff)"
      : "linear-gradient(45deg, #06beb6, #48b1bf)"};
  padding: 0px 5px 2px;
  max-width: 40%;
  position: relative;
  left: ${props => (!props.isYou ? "0px" : "60%")};
  /* right: ${props => (props.isYou ? "0px" : "40%")}; */
  & .message-author {
    padding: 0;
    margin: 0;
  }

  & .message-text {
    overflow-wrap: break-word;
    word-break: break-all;
  }

  & .message-date {
    float: right;
    font-size: .8em;
    font-style: oblique;
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
  console.log(message);
  return (
    <MessageStyle isYou={message.author === localStorage.username}>
      <h5 className="message-author">
        {message.author === localStorage.username ? "You" : contact.username}
      </h5>
      <p className="message-text">{message.text}</p>
      <span className="message-date">
        - <Moment date={message.date} fromNow /> -
      </span>
    </MessageStyle>
  );
};

export default MessageItem;
