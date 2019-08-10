import React, { useState } from "react";
import styled from "styled-components";
import SearchInput from "../inputs/SearchInput";

const SearchFormStyle = styled.form`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 10px 0px;
  justify-content: center;
`;

const SearchButtonStyle = styled.button`
  padding: 2px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px -2px 4px rgba(0, 0, 0, 0.3);
`;

const SearchForm = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <SearchFormStyle onSubmit={handleSubmit}>
      <SearchInput value={search} handleChange={setSearch} placeholder="Search a contact" />
      <SearchButtonStyle type="submit">Search</SearchButtonStyle>
    </SearchFormStyle>
  );
};

export default SearchForm;
