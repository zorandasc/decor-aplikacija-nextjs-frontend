import React, { Component } from "react";
import styled from "styled-components";

import { formatNumber, formatDate } from "../../utils/helper";

class OrderFormToPrint extends Component {
  render() {
    const { order } = this.props;

    return (
      <Container>
        <form>
          <p>ID Narudžbe: {order.orderId}</p>
          <div className="row">
            <div>
              <label htmlFor="status">Status</label>
              <input
                name="status"
                className="form-control"
                readOnly
                value={order.status}
              ></input>
            </div>
            <div>
              <label htmlFor="developer">Izvođač</label>
              <input
                name="developer"
                className="form-control"
                readOnly
                value={order.developer}
              ></input>
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="customer">Korisnik</label>
              <input
                name="customer"
                className="form-control"
                value={order.customer}
                readOnly
              ></input>
            </div>
            <div>
              <label htmlFor="address">Adresa</label>
              <textarea
                name="address"
                className="form-control"
                readOnly
                value={order.address}
                row="2"
              ></textarea>
            </div>
          </div>
          <p>Lista proizvoda:</p>
          <div className="product_label_info">
            <p>Proizvod</p>
            <p>Cena</p>
            <p>Količina</p>
          </div>
          {order.listOfProduct.map((product, i) => {
            return (
              <div className="product_info" key={i}>
                <div>{product.name}</div>
                <div>{product.price} RSD</div>
                <div>{product.quantity} Kom.</div>
              </div>
            );
          })}
          <div className="row">
            <div>
              <label htmlFor="totalPrice">Ukupna Cena(RSD)</label>
              <input
                name="totalPrice"
                className="form-control"
                readOnly
                value={formatNumber(order.totalPrice)}
              ></input>
            </div>
            <div>
              <label htmlFor="avans">Avans (RSD)</label>
              <input
                name="avans"
                className="form-control"
                readOnly
                value={formatNumber(order.avans)}
              ></input>
            </div>
            <div>
              <label htmlFor="avans">Za Uplatu (RSD)</label>
              <input
                name="forPayment"
                className="form-control"
                readOnly
                value={formatNumber(order.totalPrice - order.avans)}
              ></input>
            </div>
          </div>

          <div>
            <label htmlFor="note">Napomena</label>
            <textarea
              name="note"
              readOnly
              className="form-control textarea"
              rows="10"
              cols="50"
              value={order.note}
            ></textarea>
          </div>
          <div className="row">
            <div>
              <label htmlFor="orderDate">Kreiran</label>
              <input
                name="orderDate"
                className="form-control"
                readOnly
                value={formatDate(order.orderDate)}
              ></input>
            </div>
            <div>
              <label htmlFor="deliveryTime">Rok</label>
              <input
                name="deliveryTime"
                className="form-control"
                readOnly
                value={formatDate(order.deliveryTime)}
              ></input>
            </div>
          </div>
        </form>
      </Container>
    );
  }
}

const Container = styled.div`
  max-width: 900px;
  margin: 1.5rem auto;
  padding: 1rem;
  label {
    font-weight: bold;
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
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-top: calc(0 * -1);
    margin-right: calc(1.5rem * -0.5);
    margin-left: calc(1.5rem * -0.5);
    & > * {
      flex-shrink: 0;
      width: 100%;
      max-width: 100%;
      padding-right: calc(1.5rem * 0.5);
      padding-left: calc(1.5rem * 0.5);
      margin-top: 0;
    }

    & > div {
      flex: 1;
    }
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }
  .product_label_info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .product_info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 1rem;
  }
  .textarea {
    padding: 3px;
    transition: all 0.5s ease;
    margin-bottom: 1rem;
    & > label {
      margin-top: 2rem;
    }
  }
`;

export default OrderFormToPrint;
