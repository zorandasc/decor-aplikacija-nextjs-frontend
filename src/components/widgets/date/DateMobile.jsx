import React from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";

const DateMobile = ({ dateRange, handleDateRange }) => {
  return (
    <Container>
      {Object.entries(dateRange).map(([key, value]) => (
        <DatePicker
          key={key}
          placeholderText=" Početni - Krajnji"
          selectsRange={true}
          startDate={value.dates[0]}
          endDate={value.dates[1]}
          onChange={(update) => {
            handleDateRange(key, update);
          }}
          isClearable={true}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
  font-size: 14px;
  margin: 8px;
  padding: 8px 8px;
  box-shadow: 0 0 10px 0 #f8f9fa inset, 0 0 10px 4px #f8f9fa;
  border-radius: 0.6em;
  @media (min-width: 800px) {
    display: none;
  }

  input {
    width: 100%;
    padding: 8px 0;
    text-align: center;
    color: #f8f9fa;
    background-color: #333;
    border-radius: 0.6em;
    font-size: 14px;

    border-color: #f8f9fa;
    &::placeholder {
      color: #f8f9fa;
      font-size: 14px;
    }
  }
`;

export default DateMobile;
