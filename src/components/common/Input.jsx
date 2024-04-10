import React from "react";
import styled from "styled-components";

const Input = ({ name, label, value, error, onChange, className, ...rest }) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{label}</label>
      <CustomInput
        {...rest}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        className={`form-control ${className}  `}
      ></CustomInput>
      {error && <div className="alert alert-danger">{error}</div>}
    </Wrapper>
  );
};

export const CustomInput = styled.input`
  &[type="date"]::-webkit-datetime-edit-text {
    color: transparent;
  }
  &[type="date"]::-webkit-datetime-edit,
  &[type="date"]::-webkit-inner-spin-button,
  &[type="date"]::-webkit-clear-button {
    position: relative;
  }

  &[type="date"]::-webkit-datetime-edit-year-field {
    position: absolute !important;
    border-left: 1px solid ;
    padding: 2px 4px;
    left: 56px;
  }

  &[type="date"]::-webkit-datetime-edit-month-field {
    position: absolute !important;
    border-left: 1px solid ;
    padding: 2px 4px;
    left: 26px;
  }

  &[type="date"]::-webkit-datetime-edit-day-field {
    position: absolute !important;
    padding: 2px;
    left: 1px;
  }
`;

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

export default Input;
