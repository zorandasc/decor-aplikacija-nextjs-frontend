import React, { useState } from "react";
import styled from "styled-components";

import DragMove from "../../common/DragMove";
import SearchInput from "./SearchInput";
import SearchByBtn from "./SearchByBtn";
import SearchMobile from "./SearchMobile";

const SearchWidget = ({
  searchQuery,
  handleSearch,
  searchByColumn,
  searchBy,
  handleSearchBy,
  onClose,
  display,
}) => {
  //for resize
  const [width, setWidth] = useState(550);
  const [height, setHeight] = useState(100);

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
            <div className="movableClose" onClick={() => onClose("search")}>
              <i className="fa fa-times fa-lg" aria-hidden="true"></i>
            </div>
            <SearchInput
              value={searchQuery}
              onChange={handleSearch}
            ></SearchInput>
            <SearchByBtn
              items={searchByColumn}
              searchBy={searchBy}
              onSearchBy={handleSearchBy}
            ></SearchByBtn>
          </Container>
        </DragMove>
        <SearchMobile
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          searchByColumn={searchByColumn}
          searchBy={searchBy}
          handleSearchBy={handleSearchBy}
        ></SearchMobile>
      </>
    );
  } else {
    return null;
  }
};
const Container = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export default SearchWidget;
