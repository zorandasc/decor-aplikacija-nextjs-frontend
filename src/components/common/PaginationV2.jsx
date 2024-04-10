import React from "react";
import styled from "styled-components";

import { usePagination, DOTS } from "../../utils/usePagination";

const PaginationV2 = (props) => {
  const {
    totalCount,
    pageSize,
    currentPage,
    siblingCount = 1,
    onPageChange,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  //we shall not render the component
  if (currentPage === 0 || !totalCount) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <Wrapper>
      <li onClick={onPrevious} className={currentPage === 1 ? "disabled" : ""}>
        <div className="arrow">
          <i className="fa fa-angle-double-left fa-3x" aria-hidden="true"></i>
        </div>
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li key={i} className="dots">
              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
            </li>
          );
        }
        return (
          <li
            key={i}
            onClick={() => onPageChange(pageNumber)}
            className={pageNumber === currentPage ? "item selected" : "item"}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        onClick={onNext}
        className={currentPage === lastPage ? "disabled" : ""}
      >
        <div className="arrow">
          <i className="fa fa-angle-double-right fa-3x" aria-hidden="true"></i>
        </div>
      </li>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  .item {
    background-color: #f8f9fa;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0.2rem;
    border: 1px solid #3e5151;
    border-radius: 50px;
    padding: 0.6rem 1rem;
    cursor: pointer;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .arrow {
    color: #f8f9fa;
    cursor: pointer;
  }

  .dots {
    color: #f8f9fa;
    font-weight: bold;
    font-size: 1.2rem;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .disabled {
    pointer-events: none;
    display: none;
  }

  .selected {
    color: #f8f9fa;
    background-color: #53626f;
  }
  //desktop verzion
  @media (min-width: 800px) {
    width: 50%;
    .item {
      font-size: 1.2rem;
      margin: 0.5rem;
      padding: 0.6rem 1rem;
    }
    .arrow {
      color: #3e5151;
    }
    .dots {
      color: #3e5151;
      padding: 0.6rem 1rem;
    }
  }
`;

export default PaginationV2;
