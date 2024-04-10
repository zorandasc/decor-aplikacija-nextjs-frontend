import React, { useState } from "react";
import styled from "styled-components";

const SearchByBtn = ({ items, searchBy, onSearchBy, className }) => {
  const [showMenu, setShowMenu] = useState(false);

  //OTVORI ZATVORI MENU
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSearchBySelect = (item) => {
    //zatvori menu
    setShowMenu(!showMenu);
    //posalji searchby to parent
    onSearchBy(item);
  };

  return (
    <Container>
      <button onClick={handleMenu} className="btn1">
        <i className="fa fa-search fa-lg" aria-hidden="true"></i>
        {searchBy.label}
        <i className="fa fa-caret-down fa-lg" aria-hidden="true"></i>
      </button>
      {showMenu && (
        <ul className="lists">
          {items.map((item) => (
            <li
              className={
                item.id === searchBy.id ? "list-item active" : "list-item"
              }
              onClick={() => {
                handleSearchBySelect(item);
              }}
              key={item.id}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .btn1 {
    margin: 8px 0px 8px 8px;
    text-transform: capitalize;
    color: rgb(103, 179, 230);
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    border-radius: 0.6em;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    padding: 1em;
    text-decoration: none;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    border-color: #3e5151;
    box-shadow: 0 0 10px 0 #3e5151 inset, 0 0 10px 4px #3e5151;
    text-tranform: capitalize;
  }
  .lists {
    position: absolute;
    z-index: 500;
    left: 10px;
    top: 3rem;
    width: 90%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: 0.25rem;
  }

  .list-item {
    position: relative;
    display: block;
    padding: 0.8rem;
    text-decoration: none;
    border-color: #3e5151;
    color: #f8f9fa;
    background-color: #333;
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    letter-spacing: 1.2px;
  }

  .list-item:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  .list-item.active {
    z-index: 2;
    color: rgb(103, 179, 230);

    border-color: #0d6efd;
  }

  //ZA DESKTOP
  @media (min-width: 800px) {
    .btn1 {
      color: #3e5151;
    }
    .lists {
      position: absolute;
      z-index: 500;
      left: 0;
      top: 3rem;
      width: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      padding-left: 0;
      margin-bottom: 0;
      border-radius: 0.25rem;
    }
    .list-item {
      padding: 0.8rem 1rem;
      border-color: #3e5151;
      color: #3e5151;
      background-color: whitesmoke;
      box-shadow: 0 0 10px 0 #3e5151 inset, 0 0 10px 4px #3e5151;
      font-family: "Montserrat", sans-serif;
      
    }
    .list-item.active {
      z-index: 2;
      color: whitesmoke;
      background-color: #3e5151;
      border-color: #0d6efd;
    }
  }
`;

export default SearchByBtn;
