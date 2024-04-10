import React from "react";
import styled from "styled-components";

const ListOfProduct = ({ items, error, deleteProduct, disabled }) => {
  return (
    <Wrapper>
      <p>Lista proizvoda:</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {items.map((product, i) => {
        return (
          <div className="products" key={i}>
            <div className="product_name">{product.name}</div>
            <div className="product_info">
              <div>{product.price} RSD</div>
              <div>{product.quantity} Kom.</div>
              <div className="product_delete">
                <button
                  disabled={disabled}
                  className="product_delete-btn"
                  onClick={(e) => deleteProduct(e, product)}
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 2rem 0;
  .products {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    border-bottom: 3px solid white;
    margin-bottom: 1rem;
  }
  .product_name {
    padding-right: 0.3rem;
  }

  .product_info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }
  .product_delete {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .product_delete-btn {
    font-size: 35px;
    background: none;
    border: none;
    color: tomato;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;

    margin-left: 10px;
  }
  .product_delete-btn:active {
    transform: translateY(2px);
  }
  .alert {
    font-weight: bolder;
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

export default ListOfProduct;
