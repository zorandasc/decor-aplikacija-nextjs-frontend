import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Input, Spinner } from "./common";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useToggle from "../hooks/useToggle";
import useFormHook from "../hooks/useFormHook";
import decodeToken from "../utils/decodeToken";

const LOGIN_URL = "/login";

const Login = () => {
  const inicialState = { username: "", password: "" };
  const [check, toggleCheck] = useToggle("persist", false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/orders";

  const { setAuth, setOrderPage, setOfferPage } = useAuth();

  const schema = {
    username: Joi.string().alphanum().min(4).max(50).label("Username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  };

  const doSubmit = async () => {
    setOrderPage(1);
    setOfferPage(1);
    setLoading(true);
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(form), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const accessToken = response?.data?.accessToken;

      const { roles } = decodeToken(accessToken);

      setAuth({ username: form.username, roles, accessToken });

      toast.success(`🦄🤑😁 Welcome ${form.username} `);

      setLoading(false);

      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false);

      if (!err?.response) return toast.error(`🤐😳😱 No Server Response`);
      if (!err?.response?.data) return toast.error(`🤐😳😱 ${err?.message}`);

      toast.error(`🤐😳😱 ${err?.response?.data}`);
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
      <React.Fragment>
        <h1 className="text-center">
          DOBRO DOŠLI U APLIKACIJU BAZA DEKORATIVNIH NARUDŽBI 🤗 😜 🤭
        </h1>
        <form onSubmit={handleSubmit} autoComplete="on" disabled={loading}>
          <Input
            name="username"
            label="Korisničko Ime"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
          ></Input>
          <Input
            //type="password"
            name="password"
            label="Šifra"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          ></Input>

          <button type="submit" className="btn11" disabled={loading}>
            Login {loading ? <Spinner icon={true}></Spinner> : null}
          </button>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={toggleCheck}
              checked={check}
            ></input>
            <label htmlFor="persist">Trust this device</label>
          </div>
        </form>
      </React.Fragment>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 1.5rem auto;
  background: #53626f;
  color: #f8f9fa;
  padding: 3rem;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  h1 {
    font-size: 1.1em;
  }
  label {
    font-size: 1.1em;
    font-weight: normal;
  }

  .text-center {
    text-align: center;
  }
  form {
    margin-top: 1.5rem;
  }
  .btn11 {
    box-sizing: border-box;
    appearance: none;
    background-color: #333;
    color: #fff;
    border-radius: 0.6em;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 40px 0;
    margin-right: 40px;
    padding: 0.8em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    box-shadow: 0 0 10px 0 #fff inset, 0 0 10px 4px #fff;
    transition: all 150ms ease-in-out;
    &:hover {
      background-color: transparent;
      box-shadow: 0 0 40px 40px #333 inset, 0 0 0 0 #333;
      color: #fff;
    }
  }

  .persistCheck {
    font-size: 0.75rem;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }

  .persistCheck label {
    margin: 0;
  }

  [type="checkbox"] {
    height: 20px;
    width: 20px;
    margin: 0 5px 2px 2px;
  }

  @media (min-width: 800px) {
    background: #333;
    width: 100%;
    h1 {
      font-size: 2em;
    }
  }
`;

export default Login;
