import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";

import ROLES from "../../constants/Roles";
import {
  Input,
  Select,
  TextArea,
  InputProduct,
  ListOfProduct,
  DeleteDialog,
} from "../common";
import { statusi, developeri } from "../../constants/orderConstants";
import OrderFormToPrint from "./OrderFormToPrint";
import { calculatePrice, formatNumber } from "../../utils/helper";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useFormHook from "../../hooks/useFormHook";

const ORDERS_API_URL = "/orders";

const OrderForm = () => {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate(location);
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const { auth, setOrderPage } = useAuth();

  const isAdmin = auth.roles.indexOf(ROLES.Admin) !== -1;

  //ref fror printing
  const componentRef = useRef();

  const inicialState = {
    status: "Active",
    developer: "Decorwood",
    customer: "",
    address: "",
    listOfProduct: [],
    orderDate: new Date().toISOString(),
    deliveryTime: "",
    totalPrice: 0,
    avans: 0,
    note: "",
  };

  //for folding addproduct widget
  const [foldAdd, setFoldAdd] = useState(orderId === "new" ? false : true);

  const schema = {
    _id: Joi.string(),
    status: Joi.string()
      .valid(statusi.map((obj) => obj.name))
      .required(),
    developer: Joi.string()
      .valid(developeri.map((obj) => obj.name))
      .required(),
    customer: Joi.string().min(2).max(50).required(),
    address: Joi.string().max(500).required(),
    listOfProduct: Joi.array().items().min(1).required(),
    avans: Joi.number().min(0),
    totalPrice: Joi.number().required(),
    orderDate: Joi.date().required(),
    deliveryTime: Joi.date().required(),
    note: Joi.string().max(1000).allow(""),
    orderId: Joi.number(), //moze doci od klijenta kad je put
  };

  useEffect(() => {
    if (orderId === "new") return;

    const populateOrder = async () => {
      try {
        const { data: order } = await axiosPrivate.get(
          ORDERS_API_URL + "/" + orderId
        );
        setState(order);
      } catch (err) {
        toast.error(`🤑 🤐 🤭 ${err?.message}`);
        navigate("/orders", { replace: true });
      }
    };
    populateOrder();
  }, []);

  const doSubmit = async () => {
    try {
      if (form._id) {
        //update scenario
        const body = { ...form };
        delete body._id;
        await axiosPrivate.put(
          ORDERS_API_URL + "/" + form._id,
          JSON.stringify(body)
        );
        toast.success(`Narudžba id:${form._id}, izmjenjena.`);
      } else {
        await axiosPrivate.post(ORDERS_API_URL, JSON.stringify(form));
        //posto je uspijesno dodata order prebaci na prvu stranu
        setOrderPage(1);
        toast.success("Nova narudžba kreirana.");
      }

      navigate("/orders");
    } catch (err) {
      toast.error(`🤑 🤐 🤭 ${err?.message}`);
    }
  };

  const {
    state: form,
    setState,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  } = useFormHook(inicialState, schema, doSubmit);

  /*-----HANDLERI---------- */

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleFold = (e) => {
    e.preventDefault();
    setFoldAdd(!foldAdd);
  };

  const handleDeleteItem = async (e, item, basePath) => {
    e.preventDefault();

    const handleClick = async (answer) => {
      if (!answer) return;
      try {
        await axiosPrivate.delete(basePath + "/" + item._id);
        toast.warning(`🤑Predmet sa id:${item._id}. Obrisan.`);
      } catch (err) {
        toast.error(`🤐 🤭 Error ocured: ${err?.message}`);
      } finally {
        navigate(basePath, { replace: true });
      }
    };

    toast(<DeleteDialog handleClick={handleClick} />, {
      autoClose: false,
      theme: "dark",
    });
  };

  const deleteProduct = (e, product) => {
    e.preventDefault();

    const deletedProducts = form.listOfProduct.filter(
      (o) => o.id !== product.id
    );

    setState({
      ...form,
      //recalculate price after deleticion
      totalPrice: calculatePrice(deletedProducts),
      listOfProduct: deletedProducts,
    });
  };

  const addProduct = (newProduct) => {
    const addedProducts = form.listOfProduct.concat(newProduct);

    const newError = { ...errors };
    //delete newError["totalPrice"];
    //New order, posto se listOproduct nemjenja na
    //promjenu samog sebe, vec preko InputProduct
    //elementa, ovdije se mora obrisati greska
    delete newError["listOfProduct"];
    setErrors(newError);

    //sracunaj novu vrijendost totalPrice i
    //setuj nove vrijednosti za totalPrice i
    //listOfProducts
    setState({
      ...form,
      //recalculate price after addding
      totalPrice: calculatePrice(addedProducts),
      listOfProduct: addedProducts,
    });
  };

  return (
    <Container>
      <div style={{ display: "none" }}>
        <OrderFormToPrint order={form} ref={componentRef} />
      </div>
      <div className="btnRow">
        <button className="bttn yellow" onClick={() => navigate(`/orders`)}>
          <i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i>
          <span>Nazad</span>
        </button>
        <button onClick={handlePrint} className="bttn blue">
          <i className="fa fa-print fa-lg" aria-hidden="true"></i>
          <span>Print</span>
        </button>
        <button
          disabled={!isAdmin}
          className="bttn red"
          onClick={(e) => handleDeleteItem(e, form, ORDERS_API_URL)}
        >
          <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
          <span>Obriši</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <p>ID Narudžbe: {orderId}</p>
        <div className="row">
          <Select
            name="status"
            label="Status"
            value={form.status}
            options={statusi}
            onChange={handleChange}
            error={errors.status}
          ></Select>
          <Select
            name="developer"
            label="Izvođač"
            value={form.developer}
            options={developeri}
            onChange={handleChange}
            error={errors.developer}
          ></Select>
        </div>
        <div className="row customer">
          <Input
            name="customer"
            label="Korisnik"
            value={form.customer}
            onChange={handleChange}
            error={errors.customer}
          ></Input>
          <TextArea
            name="address"
            label="Adresa"
            value={form.address}
            onChange={handleChange}
            error={errors.address}
          ></TextArea>
        </div>
        <div className="fold-container">
          <button
            style={{
              display: foldAdd ? "block" : "none",
            }}
            className="bttn blue fold"
            onClick={handleFold}
          >
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </button>
        </div>
        <InputProduct
          addProduct={addProduct}
          fold={foldAdd}
          handleFold={handleFold}
        ></InputProduct>

        <ListOfProduct
          disabled={false}
          items={form.listOfProduct}
          error={errors.listOfProduct}
          deleteProduct={deleteProduct}
        ></ListOfProduct>
        <div className="row prices">
          <Input
            disabled
            name="totalPrice"
            label="Ukupna Cena (RSD)"
            value={formatNumber(form.totalPrice)}
            error={errors.totalPrice}
            onChange={handleChange}
          ></Input>
          <Input
            name="avans"
            label="Avans (RSD)"
            value={form.avans}
            error={errors.avans}
            onChange={handleChange}
          ></Input>
          <div className="forPayment">
            <label htmlFor="zaUplatu">Za Uplatu (RSD)</label>
            <input
              diasabled="true"
              readOnly
              name="zaUplatu"
              className="form-control"
              value={formatNumber(form.totalPrice - form.avans)}
            ></input>
          </div>
        </div>
        <TextArea
          name="note"
          label="Napomena"
          value={form.note}
          error={errors.note}
          onChange={handleChange}
          rows="10"
          cols="50"
        ></TextArea>
        <div className="row dates">
          <Input
            name="orderDate"
            label="Kreiran"
            type="date"
            value={form.orderDate.substring(0, 10)}
            error={errors.orderDate}
            onChange={handleChange}
          ></Input>
          <Input
            name="deliveryTime"
            label="Rok"
            type="date"
            value={form.deliveryTime.substring(0, 10)}
            error={errors.deliveryTime}
            onChange={handleChange}
          ></Input>
        </div>
        <div className="btnSaveContainer">
          <button className="bttn yellow" onClick={() => navigate(`/orders`)}>
            <i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i>
            <span>Nazad</span>
          </button>
          <button disabled={!isAdmin} type="submit" className="bttn green">
            <i className="fa fa-floppy-o fa-lg" aria-hidden="true"></i>
            <span>SAČUVAJ</span>
          </button>
        </div>
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  max-width: 900px;
  background: #53626f;
  color: #f8f9fa;
  margin: 1.5rem auto;
  padding: 1rem;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  border-radius: 0.25rem;
  .btnRow {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .bttn {
    box-sizing: border-box;
    background-color: #333;
    border: 1px solid transparent;
    border-radius: 0.6em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 1rem;
    padding: 1.3em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    i {
      font-size: 2rem;
    }
    span {
      display: none;
      padding-left: 0.5rem;
    }
  }
  .blue {
    border-color: rgba(70, 175, 227, 1);
    color: rgba(70, 175, 227, 1);
    box-shadow: 0 0 10px 0 rgba(70, 175, 227, 1) inset,
      0 0 10px 4px rgba(70, 175, 227, 1);
    transition: all 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px rgba(70, 175, 227, 1) inset,
        0 0 0 0 rgba(70, 175, 227, 1);
      color: #f8f9fa;
    }
  }
  .yellow {
    border-color: #ffffb4;
    color: #ffffb4;
    box-shadow: 0 0 10px 0 #ffffb4 inset, 0 0 10px 4px #ffffb4;
    transition: all 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px #ffffb4 inset, 0 0 0 0 #ffffb4;
      color: #333;
    }
  }
  .red {
    border-color: #eb5368;
    color: #eb5368;
    box-shadow: 0 0 10px 0 #eb5368 inset, 0 0 10px 4px #eb5368;
    transition: all 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px #eb5368 inset, 0 0 0 0 #eb5368;
      color: #333;
    }
    &:disabled {
      background-color: #bb2d3b;
      cursor: initial;
      box-shadow: none;
      color: #333;
    }
  }
  .green {
    border-color: #70bf53;
    color: #70bf53;
    box-shadow: 0 0 10px 0 #70bf53 inset, 0 0 10px 4px #70bf53;
    transition: all 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px #70bf53 inset, 0 0 0 0 #70bf53;
      color: #f8f9fa;
    }
    &:disabled {
      background-color: #4e8938;
      cursor: initial;
      box-shadow: none;
      color: #70bf53;
    }
  }
  .fold {
    width: 100%;
    border-radius: 5px;
    padding: 0;
  }
  p {
    letter-spacing: 1.2px;
    font-weight: bolder;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-top: calc(0 * -1);
    margin-right: calc(1.5rem * -0.5);
    margin-left: calc(1.5rem * -0.5);
    & > div {
      flex: 1 0;
      width: 100%;
      padding-right: calc(1.5rem * 0.5);
      padding-left: calc(1.5rem * 0.5);
      margin-top: 0;
    }
  }
  .customer > div {
    flex: 1 auto;
  }

  .prices > div {
    flex: 1 auto;
  }

  .dates > div {
    width: 50%;
  }

  .forPayment {
    letter-spacing: 1.2px;
    font-weight: bolder;
    margin-bottom: 1rem;
  }
  .btnSaveContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  /*-------MEDIA QUERIES FOR DESKTOP--------- */
  @media (min-width: 800px) {
    width: 100%;
    background: #333;
    .btnRow {
      margin-bottom: 1.5rem;
    }
    .bttn {
      margin: 20px 0;
      margin-right: 20px;
      padding: 0.8em;
      background-color: transparent;

      span {
        display: inline;
      }
    }
    .fold-container {
      display: none;
    }
    .customer > div,
    .prices > div {
      flex: 1 0;
    }
  }
`;

export default OrderForm;
