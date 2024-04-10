import React from "react";
import styled from "styled-components";

const BtnPalet = ({ buttons, btnClick, widgets }) => {
  return (
    <>
      <DeskBtnPalet>
        {buttons.map(({ name, label, icon }, i) => {
          return (
            <button
              key={i}
              className="btn blue"
              onClick={() => btnClick(name)}
              style={{
                backgroundColor: widgets[name] ? "#3a4d56" : "inherit",
                color: widgets[name] ? "#fff" : "inherit",
                boxShadow: widgets[name]
                  ? "none"
                  : "0 0 10px 0 #3a4d56 inset, 0 0 10px 4px #3a4d56",
              }}
            >
              {label} {icon}
            </button>
          );
        })}
      </DeskBtnPalet>
      <MobBtnPalet>
        <input
          type="checkbox"
          className="menu-open"
          name="menu-open"
          id="menu-open"
        />

        <label className="menu-open-button" htmlFor="menu-open">
          <span className="hamburger hamburger-1"></span>
          <span className="hamburger hamburger-2"></span>
          <span className="hamburger hamburger-3"></span>
        </label>
        {buttons.map(({ name, icon }, i) => {
          return (
            <button
              className="menu-item"
              style={{
                backgroundColor: widgets[name]
                  ? "rgb(103, 179, 230)"
                  : "#777474",
                color: widgets[name] ? "#777474" : "rgb(103, 179, 230)",
              }}
              key={i}
              onClick={() => btnClick(name)}
            >
              {icon}
            </button>
          );
        })}
      </MobBtnPalet>
    </>
  );
};

const DeskBtnPalet = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  //margin-bottom: 1rem;
  .btn {
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    border: 2px solid #3a4d56;
    border-radius: 0.6em;
    color: #3a4d56;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 20px 0;
    margin-right: 20px;
    padding: 0.8em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    i {
      padding-left: 0.5rem;
    }

    &:hover {
      color: #fff;
      outline: 0;
    }
  }
  .blue {
    border-color: #3a4d56;
    color: #3a4d56;
    box-shadow: 0 0 10px 0 #3a4d56 inset, 0 0 10px 4px #3a4d56;
    transition: all 150ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px #3a4d56 inset, 0 0 0 0 #3a4d56;
    }
  }
  @media (min-width: 800px) {
    display: flex;
  }
`;

const MobBtnPalet = styled.nav`
  position: fixed;
  z-index: 700;
  bottom: 3%;
  left: 4%;
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: left;

  .menu-item,
  .menu-open-button {
    background-color: #777474;
    border-radius: 100%;
    width: 60px;
    height: 60px;
    position: absolute;
    color: rgb(103, 179, 230);
    text-align: center;
    font-size: 1.5rem;
    transform: translate3d(0, 0, 0);
    transition: transform ease-out 200ms;
    box-shadow: 10px 6px 18px 0px rgba(0, 0, 0, 0.7);
  }

  .menu-open {
    display: none;
  }

  .hamburger {
    width: 25px;
    height: 3px;
    background: rgb(103, 179, 230);
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -12.5px;
    margin-top: -1.5px;
    transition: transform 200ms;
  }

  .hamburger-1 {
    transform: translate3d(0, -8px, 0);
  }

  .hamburger-2 {
    transform: translate3d(0, 0, 0);
  }

  .hamburger-3 {
    transform: translate3d(0, 8px, 0);
  }

  .menu-open:checked + .menu-open-button .hamburger-1 {
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  .menu-open:checked + .menu-open-button .hamburger-2 {
    transform: translate3d(0, 0, 0) scale(0.1, 1);
  }
  .menu-open:checked + .menu-open-button .hamburger-3 {
    transform: translate3d(0, 0, 0) rotate(-45deg);
  }

  .menu-item:nth-child(3) {
    transition-duration: 180ms;
  }
  .menu-item:nth-child(4) {
    transition-duration: 180ms;
  }
  .menu-item:nth-child(5) {
    transition-duration: 180ms;
  }
  .menu-item:nth-child(6) {
    transition-duration: 180ms;
  }
  .menu-open-button {
    z-index: 2;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 400ms;
    transform: scale(1.1, 1.1) translate3d(0, 0, 0);
    cursor: pointer;
  }

  .menu-open-button:hover {
    transform: scale(1.2, 1.2) translate3d(0, 0, 0);
  }

  .menu-open:checked + .menu-open-button {
    transition-timing-function: linear;
    transition-duration: 200ms;
    transform: scale(0.8, 0.8) translate3d(0, 0, 0);
  }

  .menu-open:checked ~ .menu-item {
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .menu-open:checked ~ .menu-item:nth-child(3) {
    transition-duration: 190ms;
    transform: translate3d(0, -70px, 0);
  }
  .menu-open:checked ~ .menu-item:nth-child(4) {
    transition-duration: 290ms;
    transform: translate3d(0, -140px, 0);
  }
  .menu-open:checked ~ .menu-item:nth-child(5) {
    transition-duration: 390ms;
    transform: translate3d(0, -220px, 0);
  }
  .menu-open:checked ~ .menu-item:nth-child(6) {
    transition-duration: 490ms;
    transform: translate3d(0, -300px, 0);
  }
  @media (min-width: 800px) {
    display: none;
  }
`;

export default BtnPalet;
