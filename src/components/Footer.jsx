import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <p>
        &copy; {new Date().getFullYear()} Created By Nazor. All rights reserved.
        Built with React.js
      </p>
      <h3>Naši Partneri</h3>
      <div className="links">
        <a target="_blank" rel="noreferrer" href="https://www.svadbenicvet.com">
          SvadbeniCvet
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://decorwood.netlify.app"
        >
          DecorWood
        </a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  margin-top: 4rem;
  background: #333;
  text-align: center;
  padding: 1rem;
  color: whitesmoke;
  letter-spacing: 1.2px;
  p {
    margin-bottom: 0;
  }
  .links {
    display: flex;
    flex-direction: column;
  }
  .links a {
    letter-spacing: 1.2px;
    font-size: 1.4rem;
    color: rgb(103 179 230);
    margin: 1rem;
  }

  @media (min-width: 800px) {
    margin: 0 auto;
    max-width: 1400px;
    .links {
      display: block;
    }
    p {
      font-size: 0.75rem;
    }
  }
`;

export default Footer;
