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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const SearchForm = ({ handleSubmit, placeholder }) => {
  const [search, setSearch] = useState('')

  const searchSubmit = e => {
    e.preventDefault()
    handleSubmit(search)
  }
  return (
    <SearchFormStyle onSubmit={searchSubmit}>
      <SearchInput handleChange={setSearch} placeholder={placeholder} />
      <SearchButtonStyle disabled={search === ''} type="submit">Search</SearchButtonStyle>
    </SearchFormStyle>
  );
};

export default SearchForm;
