import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Input } from "./common";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFormHook from "../hooks/useFormHook";

const REGISTER_URL = "/register";

const RegisterScreen = () => {
  const inicialState = { username: "", password: "" };

  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate(location);

  const schema = {
    username: Joi.string().alphanum().min(4).max(50).label("Username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  };

  const doSubmit = async () => {
    try {
      await axiosPrivate.post(REGISTER_URL, JSON.stringify(form));
      toast.success(`Korisnik ${form.username} registrovan.`);
      navigate("/users");
    } catch (err) {
      console.log("err", err);
      toast.error(`🤑 🤐 🤭 ${err}`);
    }
  };

  const {
    state: form,
    errors,
    handleChange,
    handleSubmit,
  } = useFormHook(inicialState, schema, doSubmit);

  return (
    <Container>
      <h1>
        REGISTRUJTE NOVOG KORISNIKA <span>🤡 👽 👺 🤖</span>
      </h1>
      <form onSubmit={handleSubmit} className="form">
        <Input
          name="username"
          label="Korisničko Ime"
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        ></Input>
        <Input
          name="password"
          label="Šifra"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        ></Input>
        <button className="btnRegister">Register</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 1.5rem auto;
  background: #53626f;
  color: #f8f9fa;
  padding: 3rem 1rem;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);

  h1 {
    margin-bottom: 1.5rem;
  }
  .form {
    border-bottom: 1px solid #dee2e6;
  }
  .btnRegister {
    box-sizing: border-box;
    appearance: none;
    background-color: #fff;
    border: 2px solid #fff;
    border-radius: 0.6em;
    color: #3e5151;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 40px 0;
    padding: 0.8em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    box-shadow: 0 0 10px 0 #fff inset, 0 0 10px 4px #fff;
    transition: all 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px #3e5151 inset, 0 0 0 0 #3e5151;
      color: #fff;
    }
  }

  @media (min-width: 800px) {
    background: #333;
    width: 100%;
  }
`;

export default RegisterScreen;
