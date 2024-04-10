import React from "react";
import styled from "styled-components";

import SearchInput from "./SearchInput";
import SearchByBtn from "./SearchByBtn";

const SearchMobile = ({
  searchQuery,
  handleSearch,
  searchByColumn,
  searchBy,
  handleSearchBy,
}) => {
  return (
    <Container>
      <SearchInput value={searchQuery} onChange={handleSearch}></SearchInput>
      <SearchByBtn
        items={searchByColumn}
        searchBy={searchBy}
        onSearchBy={handleSearchBy}
      ></SearchByBtn>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 8px;
  padding: 0 8px;
  box-shadow: 0 0 10px 0 #f8f9fa inset, 0 0 10px 4px #f8f9fa;
  border-radius: 0.6em;
  @media (min-width: 800px) {
    display: none;
  }
  input {
    border-radius: 0.6em;
  }
  .searchBy {
    position: relative;
  }
  .btn {
    margin: 8px 0 8px 8px;
    text-transform: capitalize;
    color: rgb(103, 179, 230);
  }
  .lists {
    position: absolute;
    z-index: 500;
    left: 10px;
    top: 4rem;
    width: 90%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: 0.25rem;
  }

  .list-item:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  .list-item.active {
    z-index: 2;
    color: rgb(103, 179, 230);

    border-color: #0d6efd;
  }
`;

export default SearchMobile;
