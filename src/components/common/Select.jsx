import React from "react";
import styled from "styled-components";

const Select = ({ name, label, value, onChange, options, error, ...rest }) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{label}</label>
      <select
        {...rest}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="" />
        {options.map((option, i) => (
          <option key={i} value={option.name}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  letter-spacing: 1.2px;
  font-weight: bolder;
  margin-bottom: 0.5rem;

  option {
    font-size: 1rem;
    font-weight: 600;
  }
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
  @media (min-width: 800px) {
    margin-bottom: 2rem;
  }
`;

export default Select;
