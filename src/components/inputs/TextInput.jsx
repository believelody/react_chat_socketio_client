import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  color: white;
`;

const TextInput = ({ value, placeholder, handleChange, handleKeyPress, handleFocus }) => {
  return (
    <InputStyle
      type="text"
      value={value ? value : ""}
      placeholder={placeholder}
      onChange={e => handleChange(e.target.value)}
      onKeyPress={handleKeyPress}
      onFocus={handleFocus}
    />
  );
};

export default TextInput;
