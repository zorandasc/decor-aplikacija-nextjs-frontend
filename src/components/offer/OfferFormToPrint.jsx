import React, { Component } from "react";
import styled from "styled-components";
import { formatNumber, formatDate } from "../../utils/helper";


class OfferFormToPrint extends Component {
  render() {
    const { offer } = this.props;
    return (
      <Container>
        <div className="header">
          <div className="header-title">
            <h1 className="title">DECORWOOD</h1>
            <h2>
              PONUDA BR. {offer.offerId}-{new Date().getFullYear()}
            </h2>
          </div>
          <div className="header-content">
            <div>
              <div className="text-row">
                <strong>Preduzetnik: </strong>
                <p>Dobrivoje Joksimovic </p>
              </div>

              <div className="text-row">
                <strong>Adresa: </strong>
                <p>6 aprila bb, Prijepolje</p>
              </div>

              <div className="text-row">
                <strong>PIB: </strong>
                <p> 112739516,</p>
                <strong>MB:</strong>
                <p>66321606</p>
              </div>

              <div className="text-row">
                <strong>Tekući račun: </strong>
                <p> 160-6000001266508-15</p>
              </div>

              <div className="text-row">
                <strong>Email: </strong>
                <p> graviranjedecorwood@gmail.com</p>
              </div>

              <div className="text-row">
                <strong>Tel: </strong>
                <p>064-15-25-222</p>
              </div>
            </div>
            <div>
              <div className="text-row">
                <strong>Datum ponude:</strong>
                <p>{formatDate(offer.dateOfIssue)}</p>
              </div>
              <div className="text-row">
                <strong>Datum važenja ponude: </strong>
                <p> {formatDate(offer.dateOfValidity)}</p>
              </div>

              <div className="text-row">
                <strong>Mesto izdavanja ponude: </strong>
                <p>{offer.placeOfIssue}</p>
              </div>

              <div className="text-row">
                <strong>Način plaćanja: </strong>
                <p> {offer.methodOfPayment}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="receiver">
          <h2>PRIMALAC PONUDE:</h2>
          <div className="row">
            <strong>Naziv:</strong>
            <p>{offer.customer}</p>
          </div>
          <div className="row">
            <strong>Adresa: </strong>
            <p>{offer.address}</p>
          </div>
          <div className="row">
            <strong>PIB:</strong>
            <p>{offer.pib}</p>
          </div>
          <div className="row">
            <strong>MB:</strong>
            <p>{offer.mib}</p>
          </div>
          <div className="row">
            <strong>Kontakt osoba:</strong>
            <p>{offer.contactPerson}</p>
          </div>
          <div className="row">
            <strong>Kontakt email:</strong>
            <p>{offer.contactEmail}</p>
          </div>
          <div className="row">
            <strong>Kontakt telefon:</strong>
            <p>{offer.contactTel}</p>
          </div>
        </div>

        <div className="products-list">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>R.br</th>
                <th>Vrsta - naziv dobara/usluga</th>
                <th>Količina</th>
                <th>Cena</th>
              </tr>
            </thead>

            <tbody>
              {offer.listOfProduct.map((product, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price} RSD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="total">
          <div className="total-col">
            <div className="total-row">
              <p>Ukupan Iznos</p>
              <p>{offer.totalPrice} RSD</p>
            </div>
            <div className="total-row">
              <p>Avansno uplaćeno</p>
              <p>{offer.avans} RSD</p>
            </div>
            <div className="total-row">
              <p>UKUPNO ZA PLAĆANJE</p>
              <p>{formatNumber(offer.totalPrice - offer.avans)} RSD</p>
            </div>
          </div>
        </div>

        <div className="note ">
          <h3>NAPOMENA</h3>
          <p>{offer.note}</p>
        </div>

        <div className="signature">
          <p>Potpis izdavaoca računa</p>
          <p>Potpis primaoca računa</p>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 1rem;
  margin: 2rem auto;
  width: 90%;

  .header {
    display: flex;
    margin-bottom: 4rem;
    flex-direction: column;
    .header-title,
    .header-content {
      display: flex;
      justify-content: space-between;
    }
    .header-title {
      align-items: flex-end;
      h2 {
        padding-right: 2.8rem;
      }
    }
  }
  .text-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:2.5rem ;
    p {
      padding-left: 1rem;
    }
  }

  .title {
    font-size: 3rem;
    letter-spacing: 2px;
    font-family: Jazz LET, fantasy;
    color: #333;
    text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;
  }
  .receiver {
    width: 100%;
    margin-bottom: 2rem;
    page-break-after: always;
    .row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed black;
      align-items: flex-end;
    }
  }
  .products-list {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  table,
  img,
  svg {
    break-inside: avoid;
  }
  .table {
    letter-spacing: 1.2px;
    padding: 1rem;
    width: 100%;

    vertical-align: top;
    border-color: #333;
    caption-side: bottom;
    border-collapse: collapse;

    & > :not(:last-child) > :last-child > * {
      border-bottom-color: currentColor;
      margin-bottom: 1rem;
    }
    & > :not(caption) > * > * {
      padding: 0.5rem 0.5rem;
      background-color: transparent;
      border-bottom-width: 1px;
    }
    td {
      vertical-align: middle;
    }
    & > tbody {
      vertical-align: inherit;
    }
    .thead {
      background-color: #333;
      vertical-align: bottom;
      color: #f8f9fa;

      th {
        text-align: left;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    }
  }

  .total {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    .total-row {
      display: flex;
      justify-content: space-between;
      p {
        font-weight: bold;
        padding-left: 1rem;
      }
    }
  }
  .signature {
    display: flex;
    justify-content: space-between;
  }
`;

export default OfferFormToPrint;
