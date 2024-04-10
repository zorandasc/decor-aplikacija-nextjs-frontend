import React, { useState } from "react";
import Joi from "joi-browser";
import styled from "styled-components";
import uuid from "react-uuid";

import Input from "./Input";

const InputProduct = ({ addProduct, disabled, fold, handleFold }) => {
  const [form, setState] = useState({
    name: "",
    price: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState({});

  const schema = {
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    quantity: Joi.number().min(1).required(),
  };

  const validate = () => {
    const result = Joi.validate(form, schema, { abortEarly: false });

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  //validacija na onchange jednog input field
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const parcialSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, parcialSchema);

    //VRATI NULL ILI MESSAGE
    return error ? error.details[0].message : null;
  };

  const handleChange = (e) => {
    const newError = { ...errors };

    const errorMessage = validateProperty(e.target);

    //IF MESAGE POSTOJI SETUJ U OBJEKAT
    if (errorMessage) newError[e.target.name] = errorMessage;
    //AKO NE POSTOJI IZBRISI PROPERTU IZ ERROR OBJEKTA
    else delete newError[e.target.name];

    setState({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(newError);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    //VRACA NULL ILI ERROR OBJEKAT
    const errors = validate();

    //AKO JE NULL SETUJ PRAZANA OBJEKAT
    setErrors(errors || {});

    //AKO JE NULL NE SALJI NA SERVER VEC IZACI
    if (errors) return;

    form.id = uuid();

    addProduct(form);

    setState({ name: "", price: "", quantity: 1 });
  };

  return (
    <Wrapper fold={fold}>
      <Input
        name="name"
        label="Proizvod"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        type="text"
        className="add-description"
      ></Input>
      <div className="price-container">
        <Input
          name="price"
          label="Cena (RSD)"
          value={form.price}
          onChange={handleChange}
          error={errors.price}
          type="number"
          className="add-value"
          placeholder="Cena"
        ></Input>
        <Input
          name="quantity"
          label="Količina"
          value={form.quantity}
          onChange={handleChange}
          error={errors.quantity}
          type="number"
          className="add-value"
          placeholder="Value"
        ></Input>
      </div>
      <div className="btn-wrapper">
        <button
          disabled={disabled}
          className="bttn yellow btn-custom hide-desktop"
          onClick={handleFold}
        >
          <i className="fa fa-angle-double-up" aria-hidden="true"></i>
        </button>
        <button
          disabled={disabled}
          className="bttn green btn-custom"
          onClick={(e) => handleAdd(e)}
        >
          <i className="fa fa-check-circle-o" aria-hidden="true"></i>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${(props) => (props.fold ? `display:none` : `display:grid`)};
  grid-template-columns: 2fr;
  padding: 0.3rem 1rem;
  padding-bottom: 0;
  background-color: #6f767d;
  margin: 0 auto;
  border-radius: 0.25rem;
  box-shadow: 10px 6px 18px 0px rgb(0 0 0 / 70%);
  label {
    color: #f8f9fa;
  }

  .price-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
  }

  .add-description,
  .add-value {
    font-weight: bold;
    border: 1px solid #3e5151;
    color: #f8f9fa;
    background-color: #333;
    font-family: inherit;
    font-size: 14px;
    padding: 12px 15px;
    border-radius: 5px;
    transition: border 0.3s;
  }

  .btn-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .btn-custom {
    width: 5em;
    height: 3em;
    padding: 0.4em 1em !important;
  }
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    gap: 1rem;
    background-color: #f8f9fa;
    label {
      color: #333;
    }
    .btn-wrapper {
      justify-content: center;
    }
    .hide-desktop {
      display: none !important;
    }
    .add-description,
    .add-value {
      background-color: #fff;
      color: #3e5151;
    }
  }
`;

export default InputProduct;
