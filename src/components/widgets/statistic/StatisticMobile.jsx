import React from "react";
import styled from "styled-components";

import { formatNumber, calculateTotalPrice } from "../../../utils/helper";

const StatisticMobile = ({ items }) => {
  //ukupna cena NE treba da zavisi od sortiranj ni od paginacije
  //pa se samo salje filtriranje
  const { totPrice, totAvans, totForPayment } = calculateTotalPrice(items);

  return (
    <Container>
      <table className="table1">
        <thead>
          <tr>
            <th>Cena (RSD)</th>
            <th>Avans (RSD)</th>
            <th>Za Uplatu (RSD)</th>
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
  );
};

const Container = styled.div`
  margin: 8px;
  border-radius: 0.6em;
  box-shadow: 0 0 10px 0 #f8f9fa inset, 0 0 10px 4px #f8f9fa;
  justify-content: center;
  align-items: center;
  color: rgb(103, 179, 230);
  background-color: #222;
  @media (min-width: 800px) {
    display: none;
  }
  .table1 {
    letter-spacing: 1.2px;
    border-collapse: collapse;
    border-radius: 0.6em;
    overflow: hidden;
    thead {
      background-color: transparent;
    }
    td,
    th {
      border: 1px solid #3e5151;
      text-align: left;
      padding: 8px;
      font-weight: bold;
      background-color: transparent;
    }
  }
`;

export default StatisticMobile;
