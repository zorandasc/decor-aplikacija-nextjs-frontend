import React from "react";
import styled from "styled-components";

const SearchInput = ({ value, onChange }) => {
  return (
    <Container>
      <input
        type="search"
        name="query"
        className="form-control"
        placeholder="Pretraga . . ."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      ></input>
    </Container>
  );
};

const Container = styled.div`
  .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    font-family: inherit !important;
    color: #f8f9fa;
    background-color: #333;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  @media (min-width: 800px) {
    .form-control {
      width: 150%;
      padding: 0.375rem 0.75rem;
      font-weight: 400;
      color: #212529;
      background-color: #fff;
      border: 1px solid #3e5151;
      -webkit-appearance: none;
      appearance: none;
      box-shadow: 0 0 10px 0 #3e5151 inset, 0 0 10px 4px #3e5151;
    }
  }
`;

export default SearchInput;
