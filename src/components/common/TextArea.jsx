import React from "react";
import styled from "styled-components";

const TextArea = ({ name, label, value, error, onChange, ...rest }) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        className="form-control textarea"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  letter-spacing: 1.2px;
  font-weight: bolder;
  margin-bottom: 1rem;

  .alert {
    position: relative;
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
  .alert-danger {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
  }
`;

export default TextArea;
