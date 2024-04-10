import React from "react";
import styled from "styled-components";

const DeleteDialog = ({ handleClick }) => {
  return (
    <Wrapper>
      <h2>Jeste li Sigurni? 💀 🐷</h2>
      <div className="buttons">
        <button className="btn1 red" onClick={() => handleClick(true)}>
          Da
        </button>
        <button className="btn1" onClick={() => handleClick(false)}>
          Ne
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: #f8f9fa;

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    .btn1 {
      font-size: 1.1rem;
      background: transparent;
      border-color: rgba(70, 175, 227, 1);
      color: rgba(70, 175, 227, 1);
      box-shadow: 0 0 10px 0 rgb(70 175 227) inset, 0 0 10px 4px rgb(70 175 227);
      padding: 1rem 2rem;
    }
    .red {
      border-color: #eb5368;
      color: #eb5368;
      box-shadow: 0 0 10px 0 #eb5368 inset, 0 0 10px 4px #eb5368;
    }
  }
`;

export default DeleteDialog;
