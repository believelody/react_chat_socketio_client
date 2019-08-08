import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  color: white;
`;

const EmailInput = ({ value, placeholder, handleChange, handleKeyPress }) => {
  return (
    <InputStyle
      type="email"
      value={value ? value : ""}
      placeholder={placeholder}
      onChange={e => handleChange(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
};

export default EmailInput;
