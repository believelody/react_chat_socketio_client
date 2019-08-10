import React from "react";
import styled from "styled-components";

const SearchInputStyle = styled.input`
  margin-right: 10px;
  border-radius: 10px;
`;

const SearchInput = ({ value, handleChange, placeholder }) => {
  return (
    <SearchInputStyle
      value={value}
      type="search"
      placeholder={placeholder}
      onChange={e => handleChange(e.target.value)}
    />
  );
};

export default SearchInput;
