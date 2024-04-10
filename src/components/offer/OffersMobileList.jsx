import React from "react";
import styled from "styled-components";

import OffersMobileListItem from "./OffersMobileListItem";

const OffersMobileList = ({ items, handleEdit, handleStatusChange }) => {
  return (
    <Container>
      <ul className="list">
        {items.map((item, i) => {
          return (
            <OffersMobileListItem
              key={i}
              item={item}
              onEdit={() => handleEdit(item)}
              onStatusChange={(status) => handleStatusChange(item, status)}
            ></OffersMobileListItem>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .list {
    list-style: none;
    padding: 0;
    width: 100%;
  }
  @media (min-width: 800px) {
    display: none;
  }
`;

export default OffersMobileList;
