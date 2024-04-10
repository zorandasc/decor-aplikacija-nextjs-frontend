import React, { useState } from "react";
import styled from "styled-components";

import { formatNumber, calculateTotalPrice } from "../../../utils/helper";
import DragMove from "../../common/DragMove";
import StatisticMobile from "./StatisticMobile";

const StatisticWidget = ({ items, display, onClose }) => {
  //for resize
  const [width, setWidth] = useState(450);
  const [height, setHeight] = useState(160);

  //ukupna cena NE treba da zavisi od sortiranj ni od paginacije
  //pa se samo salje filtriranje
  const { totPrice, totAvans, totForPayment } = calculateTotalPrice(items);

  if (display) {
    return (
      <>
        <DragMove
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
        >
          <Container>
            <div className="movableClose" onClick={() => onClose("statistic")}>
              <i className="fa fa-times fa-lg" aria-hidden="true"></i>
            </div>
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>Ukupna Cena (RSD)</th>
                  <th>Ukupni Avans (RSD)</th>
                  <th>Ukupna Za Uplatu (RSD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {formatNumber(totPrice)} </td>
                  <td> {formatNumber(totAvans)} </td>
                  <td> {formatNumber(totForPayment)} </td>
                </tr>
              </tbody>
            </table>
          </Container>
        </DragMove>
        <StatisticMobile items={items}></StatisticMobile>
      </>
    );
  } else {
    return null;
  }
};

const Container = styled.div`
  .table {
    letter-spacing: 1.2px;
    border-collapse: collapse;
    .thead {
      background-color: #333;
    }
    td,
    th {
      border: 1px solid #3e5151;
      text-align: left;
      padding: 8px;
      font-weight: bold;
    }
    th {
      color: #f8f9fa;
    }
  }
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

export default StatisticWidget;
