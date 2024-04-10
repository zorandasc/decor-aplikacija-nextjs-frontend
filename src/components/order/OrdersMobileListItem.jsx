import React, { useState } from "react";
import styled from "styled-components";

import useAuth from "../../hooks/useAuth";
import { formatNumber, formatDate } from "../../utils/helper";
import { statusi } from "../../constants/orderConstants";
import ROLES from "../../constants/Roles";

const OrdersMobileListItem = ({ item, onEdit, onStatusChange }) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [leftEdge, setLeftEdge] = useState(0);
  const [rightEdge, setRightEdge] = useState(0);

  const { auth } = useAuth();
  const isAdmin = auth.roles.indexOf(ROLES.Admin) !== -1;

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 150) {
      // do your stuff here for left swipe
      moveHandLeft();
    }

    if (touchStart - touchEnd < -150) {
      // do your stuff here for right swipe
      moveHandRight();
    }
  }

  const moveHandRight = () => {
    rightEdge === 0 ? setLeftEdge(100) : setRightEdge(0);
  };
  const moveHandLeft = () => {
    leftEdge === 0 ? setRightEdge(-100) : setLeftEdge(0);
  };

  const handleStatusChange = (statusObj) => {
    setRightEdge(0);
    onStatusChange(statusObj);
  };

  return (
    <Container
      statusColor={item.statusObj.color}
      developerColor={item.developer}
      onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
      onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
      onTouchEnd={() => handleTouchEnd()}
    >
      <div
        className="rightDiv"
        style={{ transform: `translateX(${rightEdge}%)` }}
        onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
        onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
        onTouchEnd={() => handleTouchEnd()}
      >
        {statusi.map((statusObj, i) => (
          <StatusButton
            key={i}
            color={statusObj.color}
            onClick={() => handleStatusChange(statusObj)}
            disabled={!isAdmin || item.status === statusObj.name}
          >
            {statusObj.icon}
          </StatusButton>
        ))}
      </div>
      <div
        className="leftDiv"
        style={{ transform: `translateX(${leftEdge}%)` }}
        onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
        onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
        onTouchEnd={() => handleTouchEnd()}
      >
        <table>
          <thead>
            <tr>
              <th>Prizvod</th>
              <th>Cena (RSD)</th>
              <th>Kvantitet (kom.)</th>
            </tr>
          </thead>
          <tbody>
            {item.listOfProduct.map(({ name, price, quantity }, i) => {
              return (
                <tr key={i}>
                  <td>{name} </td>
                  <td>{price} </td>
                  <td>{quantity} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <span className="ribbon1">
        <span>{item.developer}</span>
      </span>
      <div className="numberContainer">
        <div className="statusIcon">{item.statusObj.icon}</div>
        <span className="number">{item.orderId}</span>
      </div>
      <div className="icons">
        <i className="fa fa-user-circle" aria-hidden="true"></i>
        <i className="fa fa-home" aria-hidden="true"></i>
        <i className="fa fa-calendar" aria-hidden="true"></i>
      </div>

      <div className="content" onClick={onEdit}>
        <div className="name">
          <p>{item.customer}</p>
        </div>

        <div className="address" onClick={onEdit}>
          <p>{item.address}</p>
        </div>

        <div className="dates">
          <p>{formatDate(item.orderDate)}</p>
          <p>-</p>
          <p>{formatDate(item.deliveryTime)}</p>
        </div>
      </div>
      <div className="prices">
        <p>Cena RSD</p>
        <p>{formatNumber(item.totalPrice)}</p>
        <p>- {formatNumber(item.avans)}</p>
        <p>= {formatNumber(item.totalPrice - item.avans)}</p>
      </div>
    </Container>
  );
};

const StatusButton = styled.button`
  --color: ${(props) => props.color};
  pointer-events: initial;
  box-sizing: border-box;
  background-color: transparent;
  border: 2px solid #3e5151;
  border-radius: 0.6em;
  color: #3e5151;
  cursor: pointer;
  display: flex;
  align-self: center;
  font-size: 1.4rem;
  line-height: 1;
  padding: 0.7em;
  border-color: var(--color);
  color: var(--color);
  box-shadow: 0 0 10px 0 var(--color) inset, 0 0 10px 4px var(--color);
  &:disabled {
    background-color: var(--color);
    cursor: initial;
    box-shadow: none;
    color: #333;
  }
`;

const Container = styled.li`
  --statusColor: ${(props) => props.statusColor};
  --developerBg: ${(props) =>
    props.developerColor === "Decorwood" ? `#7c604a` : `#e3e5e7`};
  --developerColor: ${(props) =>
    props.developerColor === "Decorwood" ? `#f8f9fa` : `#28211c`};
  --developerAfter: ${(props) =>
    props.developerColor === "Decorwood" ? `#a38e7d;` : `#9e9186;`};
  border-left: 3px solid var(--statusColor);
  border-bottom: 2px solid #333;
  margin-bottom: 0.6rem;
  background: #53626f;
  color: #f8f9fa;
  display: grid;
  grid-template-columns: 0.2fr 0.5fr 3fr 1fr;
  gap: 0;
  position: relative;

  .leftDiv {
    padding: 14px;
    position: absolute;
    left: -100%;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgb(18, 18, 18, 0.8);
    transition: 600ms all;
    overflow-y: scroll;
    border-right: 3px solid var(--statusColor);

    table {
      width: 95%;
      margin: 0 auto;
    }
    td,
    th {
      font-weight: normal;
      border: 1px solid #3e5151;
      text-align: center;
      padding: 4px 2px;
      background-color: transparent;
    }
  }
  .rightDiv {
    position: absolute;
    right: -100%;
    top: 0;
    height: 100%;
    width: 100%;
    transition: 600ms all;
    background-color: rgb(18, 18, 18, 0.6);
    color: #333;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-left: 3px solid var(--statusColor);
  }
  .ribbon1 {
    position: absolute;
    top: -6.1px;
    right: 80px;
  }
  .ribbon1 span {
    background-color: var(--developerBg);
    color: var(--developerColor);
    position: relative;
    display: block;
    text-align: center;
    font-size: 14px;
    line-height: 1;
    padding: 4px 4px 6px;
    border-top-right-radius: 8px;
    width: 90px;
  }
  .ribbon1 span:before,
  .ribbon1 span:after {
    position: absolute;
    content: "";
  }
  .ribbon1 span:before {
    height: 6px;
    width: 6px;
    left: -6px;
    top: 0;
    background-color: var(--developerBg);
  }
  .ribbon1 span:after {
    height: 6px;
    width: 8px;
    left: -8px;
    top: 0;
    border-radius: 8px 8px 0 0;
    background-color: var(--developerAfter);
  }

  p {
    margin: 0;
  }
  .numberContainer {
    background-color: #333;
    display: flex;
    padding-left: 0.4rem;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .number {
      min-width: 25px;
    }
    .statusIcon {
      background-color: var(--statusColor);
      position: absolute;
      top: 0;
      left: 0;
      width: 37px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.4rem;
      padding-left: 0;
      color: #333;
      border: 1px solid var(--statusColor);
      border-bottom-right-radius: 20px;
    }
  }

  .content {
    padding: 0.5rem;
    padding-top: 0.7rem;

    & > div {
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
    }
    .name {
      font-size: 22px;

      width: auto;
      overflow: hidden;
    }
    .address {
      font-size: 14px;
      font-weight: normal;
    }
    .dates {
      font-size: 14px;
      justify-content: start;
      p {
        margin-right: 1rem;
      }
    }
  }

  .icons,
  .prices {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .prices {
    font-size: 14px;
    padding-right: 0.4rem;
  }
  .icons {
    font-size: 16px;
    background-color: #333;
    color: var(--statusColor);
  }
`;

export default OrdersMobileListItem;
