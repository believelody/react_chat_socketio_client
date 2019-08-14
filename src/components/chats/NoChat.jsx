import React from 'react'
import styled from "styled-components";

const NoChatStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NoChat = () => {
    return (
        <NoChatStyle>
            Select a chat or create one by choosing one of your contact
        </NoChatStyle>
    )
}

export default NoChat
