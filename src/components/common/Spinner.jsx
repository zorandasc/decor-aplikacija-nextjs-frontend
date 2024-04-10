import React from "react";
import styled, { keyframes } from "styled-components";

import spinner from "../../logo.svg";
import { FaSpinner } from "react-icons/fa";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = ({ icon }) => {
  return (
    <>
      {icon ? (
        <IconWrapper>
          <FaSpinner className="spinner-icon"></FaSpinner>
        </IconWrapper>
      ) : (
        <ImgWrapper>
          <img src={spinner} className="spinner-img" alt="Loading..." />
          <h1>Loading ... </h1>
        </ImgWrapper>
      )}
    </>
  );
};

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  color: rgb(103, 179, 230);
  .spinner-icon {
    color: rgb(103, 179, 230);
    margin: auto;
    animation: ${spin} 3s linear infinite;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  color: rgb(103, 179, 230);
  .spinner-img {
    color: rgb(103, 179, 230);
    width: 340px;
    margin: auto;
    display: block;
    animation: ${spin} 3s linear infinite;
  }
`;

export default Spinner;
