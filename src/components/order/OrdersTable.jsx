import React from "react";
import styled from "styled-components";

import { formatNumber, formatDate } from "../../utils/helper";

const OrdersTable = ({
  columns,
  items,
  count,
  handleSort,
  renderSortIcon,
  handleEdit,
}) => {
  return (
    <Container>
      <span className="totNumber">{count}</span>
      <table className="table">
        <thead className="thead">
          <tr>
            {columns.map((column) => {
              if (column.key === "note") return null;
              return (
                <th key={column.key} onClick={() => handleSort(column.key)}>
                  {column.label} {renderSortIcon(column)}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {items.map((order, i) => {
            return (
              <tr
                key={order._id}
                onClick={() => handleEdit(order)}
                className="tbodyRow"
              >
                <td>{order.orderId}</td>
                <td
                  style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    paddingBottom: "1.8rem",
                    color: order.statusObj.color,
                  }}
                >
                  {order.statusObj.icon}
                  <p>{order.statusObj.label}</p>
                </td>
                <td>{order.developer}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>
                  <div className="table-cell-products">
                    {order.products.split(",").map((product, i) => (
                      <p key={i}>{product}</p>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="table-cell-products">
                    {order.listOfProduct.map((product, i) => (
                      <p key={i}>{product.quantity}</p>
                    ))}
                  </div>
                </td>
                <td>{formatNumber(order.totalPrice)}</td>
                <td>{formatNumber(order.avans)}</td>
                <td>{formatNumber(order.totalPrice - order.avans)}</td>
                <td>{formatDate(order.orderDate)}</td>
                <td>{formatDate(order.deliveryTime)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};

const Container = styled.div`
  .totNumber {
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 35px;
    height: 35px;
    margin: 2rem 1rem 1rem 0.3rem;
    border-radius: 20%;
    box-shadow: 0 0 10px 0 #53626f inset, 0 0 10px 4px #53626f;
    background-color: #53626f;
    color: #f8f9fa;
    cursor: pointer;
    z-index: 100;
    font-size: 1.5em;
  }

  .table {
    display: none;
    letter-spacing: 1.2px;
    background: #2c3b42;
    color: #f8f9fa;
    padding: 1rem;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
    width: 100%;
    margin-bottom: 1rem;
    vertical-align: top;
    border-color: #dee2e6;
    caption-side: bottom;
    border-collapse: collapse;

    & > :not(:last-child) > :last-child > * {
      border-bottom-color: currentColor;
    }
    & > :not(caption) > * > * {
      padding: 0.5rem 0.5rem;
      background-color: transparent;
      border-bottom-width: 1px;
      box-shadow: inset 0 0 0 9999px transparent;
    }
    td {
      vertical-align: middle;
    }
    & > tbody {
      vertical-align: inherit;
    }
    .thead {
      background-color: #333;
      vertical-align: bottom;

      th {
        cursor: pointer;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    }
    .tbodyRow {
      font-weight: bolder;
      &:hover {
        background-color: cornsilk;
        color: #3e5151;
        cursor: pointer;
      }
      .table-cell-products {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 110px;
        padding-top: 1rem;
        overflow-y: scroll;
      }

      .table-cell-products p {
        padding-right: 0.4rem;
      }
    }
  }

  /*--MEDIA QUERIES------------- */
  @media (min-width: 800px) {
    .table {
      display: table;
    }
    .totNumber {
      display: inline-flex;
      box-shadow: 0 0 10px 0 #3e5151 inset, 0 0 10px 4px #3e5151;
      background-color: rgba(0, 0, 0, 0.6);
      color: whitesmoke;
      margin-left: 0;
      width: 50px;
      height: 50px;
      font-size: 1.6rem;
    }
  }
`;

export default OrdersTable;
