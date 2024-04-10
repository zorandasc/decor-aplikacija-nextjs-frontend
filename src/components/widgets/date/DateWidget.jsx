import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

import DragMove from "../../common/DragMove";
import DateMobile from "./DateMobile";

const DateWidget = ({ dateRange, handleDateRange, onClose, display }) => {
  //for resize
  const [width, setWidth] = useState(550);
  const [height, setHeight] = useState(120);

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
            <div className="close" onClick={() => onClose("dateFilter")}>
              <i className="fa fa-times fa-lg" aria-hidden="true"></i>
            </div>

            {Object.entries(dateRange).map(([key, value]) => (
              <DateContainer key={key}>
                <li className="list-item active">{value.label}</li>
                <li className="list-item">
                  <DatePicker
                    placeholderText=" Početni - Krajnji"
                    selectsRange={true}
                    startDate={value.dates[0]}
                    endDate={value.dates[1]}
                    onChange={(update) => handleDateRange(key, update)}
                    isClearable={true}
                  />
                </li>
              </DateContainer>
            ))}
          </Container>
        </DragMove>
        <DateMobile
          dateRange={dateRange}
          handleDateRange={handleDateRange}
        ></DateMobile>
      </>
    );
  } else {
    return null;
  }
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  .close {
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
  .close i {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const DateContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  border-radius: 0.25rem;
  text-decoration: none;
  flex: 1;
  margin: 0.5rem;
  text-align: center;

  .list-item {
    position: relative;
    display: block;
    padding: 0.5rem;
    border-color: #3e5151;
    color: #3e5151;
    box-shadow: 0 0 10px 0 #3e5151 inset, 0 0 10px 4px #3e5151;
    text-decoration: none;
    background-color: #fff;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    cursor: pointer;
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
    cursor: inherit;
  }
  @media (min-width: 800px) {
  }
`;

export default DateWidget;
