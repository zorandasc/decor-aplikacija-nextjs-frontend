import React from "react";
import styled from "styled-components";

import useAuth from "../hooks/useAuth";

const Me = () => {
  const { auth } = useAuth();
  return (
    <Container>
      <div className="about-wrapper">
        <div className="about-left">
          <div className="about-left-content">
            <div>
              <div className="shadow">
                <div className="about-img">
                  <i
                    className="fa fa-user-circle-o fa-10x"
                    style={{ fontSize: "10rem" }}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <h2>{auth?.username}</h2>
              <h3>Korisnik Aplikacije</h3>
            </div>

            <ul className="icons">
              <li>
                <i className="fa fa-facebook-f"></i>
              </li>
              <li>
                <i className="fa fa-twitter"></i>
              </li>
              <li>
                <i className="fa fa-linkedin"></i>
              </li>
              <li>
                <i className="fa fa-instagram"></i>
              </li>
            </ul>
          </div>
        </div>

        <div className="about-right">
          <h1>
            Hello<span>!</span>
          </h1>
          <h2>Here's who I am & what I do</h2>
          <div className="about-para">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              aspernatur possimus ullam quaerat, laboriosam ex voluptate aliquid
              laborum, obcaecati ratione accusamus! Ea nisi modi dolor nam
              numquam? Temporibus, molestias amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
              iure tempora alias laudantium sapiente impedit!
            </p>
          </div>
          <div className="credit">
            Made with <span style={{ color: "tomato" }}>❤</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .about-wrapper {
    height: 100vh;
  }
  .about-left {
    background-color: #21d4fd;
    background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #fff;
  }
  .about-left-content > div {
    background: #12192c;
    padding: 4rem 4rem 2.5rem 5rem;
    text-align: center;

    border-radius: 12px 12px 0 0;
  }
  .about-left-content {
    box-shadow: 0px 0px 18px -1px rgba(0, 0, 0, 0.39);
    -webkit-box-shadow: 0px 0px 18px -1px rgba(0, 0, 0, 0.39);
    -moz-box-shadow: 0px 0px 18px -1px rgba(0, 0, 0, 0.39);
    border-radius: 12px;
    width: 80%;
  }
  .about-img img {
    display: block;
    width: 200px;
  }
  .about-img {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    transition: all 0.5s ease-in-out;
  }
  .shadow {
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    width: 200px;
    height: 200px;
  }

  .about-left-content h2 {
    font-size: 2rem;
    margin: 2.2rem 0 0.6rem 0;
    line-height: 1.2;
    padding-bottom: 1rem;
    border-bottom: 2px solid #b721ff;
  }
  .about-left-content h3 {
    text-transform: uppercase;
    font-weight: 300;
    letter-spacing: 5px;
    margin-top: 1.2rem;
  }
  .icons {
    background: #12192c;
    display: flex;
    justify-content: center;
    padding: 0.8rem 0;
    border-radius: 0 0 12px 12px;
  }
  .icons li {
    list-style-type: none;
    background: #b721ff;
    color: #fff;
    width: 40px;
    height: 40px;
    margin: 0 0.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
  .icons li:hover {
    background: #edffec;
    color: #000;
  }
  .about-right {
    background: #12192c;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 5rem;
    text-align: center;
    color: #fff;
  }
  .about-right h1 {
    font-size: 5rem;
    text-transform: uppercase;
  }
  .about-right h1 span {
    color: #b721ff;
  }
  .about-right h2 {
    font-weight: 600;
  }
  .about-btns {
    display: flex;
    margin: 2rem 0;
  }
  .btn {
    border: none;
    font-size: 0.9rem;
    text-transform: uppercase;
    border: 2px solid #fff;
    border-radius: 20px;
    padding: 0.55rem 0;
    width: 130px;
    font-weight: 600;
    background: transparent;
    margin: 0 0.5rem;
    cursor: pointer;
    color: #fff;
  }
  .btn.btn-pink {
    background: #b721ff;
    color: #fff;
    border-color: #b721ff;
    transition: all 0.5s ease-in-out;
  }
  .btn.btn-pink:hover {
    background: transparent;
    border-color: #fff;
    color: #fff;
  }
  .btn.btn-white {
    transition: all 0.5s ease-in-out;
  }
  .btn.btn-white:hover {
    background: #b721ff;
    border-color: #b721ff;
    color: #fff;
  }
  .about-para p {
    font-weight: 300;
    padding: 0.5rem;
    opacity: 0.8;
  }

  @media screen and (min-width: 992px) {
    .about-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 2fr);
    }

    .about-left {
      position: relative;
    }
    .about-left-content {
      position: absolute;
      width: 80%;
    }
  }
  .credit {
    text-align: center;
    color: #fff;
  }
  .credit a {
    text-decoration: none;
    color: #b721ff;
    font-weight: bold;
  }
`;

export default Me;
