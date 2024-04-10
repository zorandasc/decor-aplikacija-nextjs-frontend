import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const BtnNew = ({ title, linkTo, total }) => {
 
  return (
    <>
      <BtnNewDesk>
        <Link to={linkTo} className="glow">
          Nova {title} <i className="fa fa-gift fa-lg" aria-hidden="true"></i>
        </Link>
      </BtnNewDesk>
      <BtnNewMob>
        <Link to={linkTo}>{total}</Link>
      </BtnNewMob>
    </>
  );
};

const glowing = keyframes`
   0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
`;

const BtnNewDesk = styled.div`
  min-width: 220px;
  display: none;
  .glow {
    padding: 1em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    width: 220px;

    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
  }

  .glow:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${glowing} 20s linear infinite;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  .glow:active {
    color: #000;
  }

  .glow:active:after {
    background: transparent;
  }

  .glow:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, 0.4);
    left: 0;
    top: 0;
    border-radius: 10px;
    transition: 400ms all;
  }
  .glow:hover:after {
    background: transparent;
  }
  @media (min-width: 800px) {
    display: block;
  }
`;

const BtnNewMob = styled.div`
  cursor: pointer;
  position: fixed;
  z-index: 700;
  bottom: 3%;
  right: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f44336;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  outline: none;

  transition: all 0.4s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: 10px 6px 18px 0px rgba(0, 0, 0, 0.7);
  &:focus,
  &:hover {
    transform: scale(1.1);
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #cbc81a,
      #55c728,
      #00ffd5,
      #384ba8,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${glowing} 20s linear infinite;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    border: 4px solid #fff;
    border-radius: 50px;
  }
  a {
    color: whitesmoke;
    font-size: 36px;
    &:link {
      text-decoration: none;
    }
  }
  @media (min-width: 800px) {
    display: none;
  }
`;

export default BtnNew;
