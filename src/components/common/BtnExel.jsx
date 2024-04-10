import React from "react";
import { CSVLink } from "react-csv";
import styled from "styled-components";

const BtnExel = ({ data, headers, className, children, ...props }) => {
  return (
    <Container>
      <CSVLink
        filename={`${new Date().toString()}.csv`}
        headers={headers}
        data={data}
        separator={";"}
        className={className}
        {...props}
      >
        {children}
      </CSVLink>
    </Container>
  );
};

const Container = styled.div`
  display: none;

  /*--MEDIA QUERIES------------- */
  @media (min-width: 800px) {
    display: block;
  }
`;

export default BtnExel;
