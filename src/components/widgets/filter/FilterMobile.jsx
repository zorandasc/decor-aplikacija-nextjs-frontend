import React from "react";
import styled from "styled-components";

import { SwipeTrack } from "../../common";

const FilterMobile = ({ filterGroups, filterBy, handleFiltering }) => {
  return (
    <SwipeTrack>
      <Container>
        {filterGroups.map(({ filterKey, itemsToFilter }, i) => {
          let selectedItem =
            filterBy && filterBy[filterKey] ? filterBy[filterKey] : "";
          return (
            <FilterGroup key={i}>
              {itemsToFilter.map((item, i) => {
                return (
                  <button
                    key={i}
                    className="btn"
                    onClick={() => handleFiltering(filterKey, item.name)}
                    style={{
                      color:
                        item.name === selectedItem
                          ? "rgb(103, 179, 230)"
                          : "#f8f9fa",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </FilterGroup>
          );
        })}
      </Container>
    </SwipeTrack>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (min-width: 800px) {
    display: none;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .btn {
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    margin: 0;
    margin-right: 0.5rem;
    box-shadow: 0 0 10px 0 #f8f9fa inset, 0 0 10px 4px #f8f9fa;
    border-radius: 0.6em;
    color: #f8f9fa;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 1;
    padding: 0.8em;
    text-decoration: none;
    text-align: center;
    text-transform: capitalize;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
  }
`;

export default FilterMobile;
