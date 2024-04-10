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
import { statusi } from "../../constants/offersConstants";
import OfferFormToPrint from "./OfferFormToPrint";
import { calculatePrice, formatNumber } from "../../utils/helper";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useFormHook from "../../hooks/useFormHook";

const OFFERS_API_URL = "/offers";

const paymentsMethods = [
  { _id: 1, name: "Virmanski", label: "Virmanski" },
  { _id: 2, name: "Gotovinski", label: "Gotovinski" },
  { _id: 3, name: "Avansno", label: "Avansno" },
];

const OfferForm = () => {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate(location);
  const navigate = useNavigate();
  const { id: offerId } = useParams();
  const { auth, setOfferPage } = useAuth();

  const isAdmin = auth.roles.indexOf(ROLES.Admin) !== -1;

  //ref fror printing
  const componentRef = useRef();

  const inicialState = {
    status: "Active",
    customer: "",
    address: "",
    pib: "",
    mib: "",
    contactPerson: "",
    contactEmail: "",
    contactTel: "",
    listOfProduct: [],
    totalPrice: 0,
    avans: 0,
    dateOfIssue: new Date().toISOString(),
    dateOfValidity: "",
    placeOfIssue: "Prijepolje",
    methodOfPayment: "Virmanski",
    note: "",
  };

  ///for folding addproduct widget
  const [foldAdd, setFoldAdd] = useState(offerId === "new" ? false : true);

  const schema = {
    _id: Joi.string(),
    status: Joi.string()
      .valid(statusi.map((obj) => obj.name))
      .required(),
    customer: Joi.string().min(2).max(100).required(),
    address: Joi.string().max(500).required(),
    pib: Joi.string().max(500).required(),
    mib: Joi.string().max(500).required(),
    contactPerson: Joi.string().min(2).max(100).required(),
    contactEmail: Joi.string().email().required(),
    contactTel: Joi.string().min(2).max(100).required(),
    listOfProduct: Joi.array().items().min(1).required(),
    avans: Joi.number().min(0),
    totalPrice: Joi.number().required(),
    note: Joi.string().max(1000).allow(""),
    dateOfIssue: Joi.date().required(),
    dateOfValidity: Joi.date().required(),
    placeOfIssue: Joi.string().max(50).required(),
    methodOfPayment: Joi.string().min(2).max(50).required(),
    offerId: Joi.number(), //moze doci od klijenta kad je put
  };

  useEffect(() => {
    if (offerId === "new") return;

    const populateOffer = async () => {
      try {
        const { data: offer } = await axiosPrivate.get(
          OFFERS_API_URL + "/" + offerId
        );
        form.setState(offer);
      } catch (err) {
        toast.error(`🤑 🤐 🤭 ${err?.message}`);
        navigate("/offers", { replace: true });
      }
    };

    populateOffer();
  }, []);

  const doSubmit = async () => {
    try {
      if (form.state._id) {
        //update scenario
        const body = { ...form.state };
        delete body._id;
        await axiosPrivate.put(
          OFFERS_API_URL + "/" + form.state._id,
          JSON.stringify(body)
        );
        toast.success(`Ponuda id:${form.state._id}, izmjenjena.`);
      } else {
        await axiosPrivate.post(OFFERS_API_URL, JSON.stringify(form.state));
        setOfferPage(1);
        toast.success("Nova ponuda kreirana.");
      }

      navigate("/offers");
    } catch (err) {
      toast.error(`🤑 🤐 🤭 ${err?.message}`);
    }
  };

  const form = useFormHook(inicialState, schema, doSubmit);

  /*-----HANDLERI---------- */
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => console.log("printed"),
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

    const deletedProducts = form.state.listOfProduct.filter(
      (o) => o.id !== product.id
    );

    form.setState({
      ...form.state,
      //recalculate price after deleticion
      totalPrice: calculatePrice(deletedProducts),
      listOfProduct: deletedProducts,
    });
  };

  const addProduct = (newProduct) => {
    const addedProducts = form.state.listOfProduct.concat(newProduct);

    //kada se doda jedan validan item u listu
    //obris greske u form.errors objektu
    const newError = { ...form.errors };
    delete newError["totalPrice"];
    delete newError["listOfProduct"];
    form.setErrors(newError);

    //sracunaj novu vrijendost totalPrice i
    //setuj nove vrijednosti za totalPrice i
    //listOfProducts
    form.setState({
      ...form.state,
      //recalculate price after addding
      totalPrice: calculatePrice(addedProducts),
      listOfProduct: addedProducts,
    });
  };

  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <OfferFormToPrint offer={form.state} ref={componentRef} />
      </div>

      <Container>
        <div className="btnRow">
          <button className="bttn yellow" onClick={() => navigate(`/offers`)}>
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
            onClick={(e) => handleDeleteItem(e, form.state, OFFERS_API_URL)}
          >
            <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
            <span>Obriši</span>
          </button>
        </div>

        <form onSubmit={form.handleSubmit}>
          <div className="row customer">
            <div>
              <Select
                name="status"
                label="Status"
                value={form.state.status}
                options={statusi}
                onChange={form.handleChange}
                error={form.errors.status}
              ></Select>
              <Input
                disabled={isAdmin ? false : true}
                name="customer"
                label="Korisnik"
                value={form.state.customer}
                onChange={form.handleChange}
                error={form.errors.customer}
              ></Input>
            </div>

            <TextArea
              disabled={isAdmin ? false : true}
              name="address"
              label="Adresa"
              value={form.state.address}
              onChange={form.handleChange}
              error={form.errors.address}
            ></TextArea>
          </div>
          <div className="row customer">
            <Input
              disabled={isAdmin ? false : true}
              name="contactPerson"
              label="Kontakt osoba"
              value={form.state.contactPerson}
              onChange={form.handleChange}
              error={form.errors.contactPerson}
            ></Input>
            <Input
              disabled={isAdmin ? false : true}
              name="contactEmail"
              label="Kontakt email"
              type="email"
              value={form.state.contactEmail}
              onChange={form.handleChange}
              error={form.errors.contactEmail}
            ></Input>
          </div>
          <div className="row customer">
            <Input
              disabled={isAdmin ? false : true}
              name="contactTel"
              label="Kontakt telefon"
              value={form.state.contactTel}
              onChange={form.handleChange}
              error={form.errors.contactTel}
            ></Input>

            <Input
              disabled={isAdmin ? false : true}
              name="pib"
              label="PIB"
              value={form.state.pib}
              onChange={form.handleChange}
              error={form.errors.pib}
            ></Input>
            <Input
              disabled={isAdmin ? false : true}
              name="mib"
              label="MB"
              value={form.state.mib}
              onChange={form.handleChange}
              error={form.errors.mib}
            ></Input>
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
            disabled={isAdmin ? false : true}
            fold={foldAdd}
            handleFold={handleFold}
          ></InputProduct>
          <ListOfProduct
            disabled={isAdmin ? false : true}
            items={form.state.listOfProduct}
            error={form.errors.listOfProduct}
            deleteProduct={deleteProduct}
          ></ListOfProduct>
          <div className="row prices">
            <Input
              disabled
              name="totalPrice"
              label="Ukupna Cena (RSD)"
              value={formatNumber(form.state.totalPrice)}
              error={form.errors.totalPrice}
              onChange={form.handleChange}
            ></Input>
            <Input
              disabled={isAdmin ? false : true}
              name="avans"
              label="Avans (RSD)"
              value={form.state.avans}
              error={form.errors.avans}
              onChange={form.handleChange}
            ></Input>
            <div className="forPayment">
              <label htmlFor="zaUplatu">Za Uplatu (RSD)</label>
              <input
                diasabled="true"
                readOnly
                name="zaUplatu"
                className="form-control"
                value={formatNumber(form.state.totalPrice - form.state.avans)}
              ></input>
            </div>
          </div>
          <TextArea
            disabled={isAdmin ? false : true}
            name="note"
            label="Napomena"
            value={form.state.note}
            error={form.errors.note}
            onChange={form.handleChange}
            rows="10"
            cols="50"
          ></TextArea>
          <div className="row dates">
            <Input
              disabled={isAdmin ? false : true}
              name="dateOfIssue"
              label="Datum Izdavanja ponude"
              type="date"
              value={form.state.dateOfIssue.substring(0, 10)}
              error={form.errors.dateOfIssue}
              onChange={form.handleChange}
            ></Input>
            <Input
              disabled={isAdmin ? false : true}
              name="dateOfValidity"
              label="Datum važenja ponude"
              type="date"
              value={form.state.dateOfValidity.substring(0, 10)}
              error={form.errors.dateOfValidity}
              onChange={form.handleChange}
            ></Input>
          </div>
          <div className="row dates">
            <Input
              disabled={isAdmin ? false : true}
              name="placeOfIssue"
              label="Mijesto Izdavanja"
              value={form.state.placeOfIssue}
              onChange={form.handleChange}
              error={form.errors.placeOfissue}
            ></Input>
            <Select
              disabled={isAdmin ? false : true}
              name="methodOfPayment"
              label="Način Plaćanja"
              options={paymentsMethods}
              value={form.state.methodOfPayment}
              error={form.errors.methodOfPayment}
              onChange={form.handleChange}
            ></Select>
          </div>
          <div className="btnSaveContainer">
            <button className="bttn yellow" onClick={() => navigate(`/offers`)}>
              <i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i>
              <span>Nazad</span>
            </button>
            <button disabled={!isAdmin} type="submit" className="bttn green">
              <i className="fa fa-floppy-o fa-lg" aria-hidden="true"></i>{" "}
              <span>SAČUVAJ</span>
            </button>
          </div>
        </form>
      </Container>
    </React.Fragment>
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
  .title {
    display: none;
    font-size: 3rem;
    letter-spacing: 4px;
    font-family: Jazz LET, fantasy;
    color: #795548;
    text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;
  }
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
      padding-right: calc(1rem * 0.5);
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
    .title {
      display: block;
    }
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

export default OfferForm;
