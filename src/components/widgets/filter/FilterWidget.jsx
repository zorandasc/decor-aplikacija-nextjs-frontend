import React, { useState } from "react";
import styled from "styled-components";

import { DragMove } from "../../common";
import FilterMobile from "./FilterMobile";

const FilterWidget = ({
  filterGroups,
  filterBy,
  handleFiltering,
  onClose,
  display,
}) => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(90);

    if (display) {
      return (
        <>
          <DragMove
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
            display={display}
          >
            <Container>
              <div className="movableClose" onClick={() => onClose("filter")}>
                <i className="fa fa-times fa-lg" aria-hidden="true"></i>
              </div>
              {/*We have two filterGrouyps:developers, statuses */}
              {/*filterGrouyp is of type(Objects{filterKey:"", itemsToFilter:[]})*/}
              {filterGroups.map(({ filterKey, itemsToFilter }, i) => {
                return (
                  <FilterGroup
                    key={i}
                    items={itemsToFilter}
                    filterKey={filterKey}
                    selectedItem={
                      filterBy && filterBy[filterKey] ? filterBy[filterKey] : ""
                    }
                    onItemSelect={handleFiltering}
                  ></FilterGroup>
                );
              })}
            </Container>
          </DragMove>

          <FilterMobile
            filterGroups={filterGroups}
            filterBy={filterBy}
            handleFiltering={handleFiltering}
          ></FilterMobile>
        </>
      );
    } else {
      return null;
    }
};


const FilterGroup = ({ items, filterKey, selectedItem, onItemSelect }) => {
  return (
    <GroupContainer>
      {items.map((item, i) => {
        return (
          <li
            key={i}
            onClick={() => onItemSelect(filterKey, item.name)}
            className={
              item.name === selectedItem ? "list-item active" : "list-item "
            }
          >
            {item.label}
          </li>
        );
      })}
    </GroupContainer>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .movableClose {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -10px;
    top: -10px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 #3e5151 inset, 0 0 10px 4px #3e5151;
    background-color: rgba(0, 0, 0, 0.5);
    color: whitesmoke;
    cursor: pointer;
    z-index: 100;
  }
  .movableClose i {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const GroupContainer = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 0;
  border-radius: 0.25rem;
  margin: 0.5rem 0;
  text-decoration: none;

  .list-item {
    position: relative;
    display: block;
    padding: 0.9em;
    text-decoration: none;
    background-color: #fff;
    color: #3e5151;
    box-shadow: 0 0 10px 0 #3e5151 inset, 0 0 10px 4px #3e5151;
    border-color: #3e5151;
    cursor: pointer;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
  }

  .list-item:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .list-item.active {
    z-index: 2;
    color: #fff;
    background-color: #3e5151;
    border-color: #3e5151;
  }
`;

export default FilterWidget;
