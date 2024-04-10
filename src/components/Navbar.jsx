import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Navbar = ({ toggleSidebar }) => {
  const { auth } = useAuth();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    toast.dark("🦄🙃 Buy, Buy!");
  };

  const user = auth?.username;

  const activeColor = ({ isActive }) => ({
    color: isActive ? "rgb(103 179 230)" : "#fff",
  });

  return (
    <Container>
      <div className="logo">
        <h1>BAZA NARUDŽBI DEKORATIVNIH PREDMETA</h1>
        <div className="hamburger" onClick={toggleSidebar}>
          <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
        </div>
      </div>
      <ul>
        {!user && (
          <li>
            <NavLink to="/login" style={activeColor}>
              Login
            </NavLink>
          </li>
        )}

        {user && (
          <React.Fragment>
            <li>
              <NavLink to="/orders" style={activeColor}>
                Narudžbe
              </NavLink>
            </li>
            <li>
              <NavLink to="/offers" style={activeColor}>
                Ponude
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" style={activeColor}>
                Korisnici
              </NavLink>
            </li>

            <li>
              <NavLink to="/me" style={activeColor}>
                <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>{" "}
                {user}
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogout} to="/login">
                Logout
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0;
  border-bottom: 2px solid rgb(103 179 230);
  background: #333;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  position: sticky;
  top: 0;
  z-index: 600;
  h1,
  h2,
  h3,
  a {
    color: #fff;
    display: block;
    padding: 0.5rem 1.2rem;
    font-weight: 600;
    letter-spacing: 1.2px;
    font-size: 1.1rem;
    transition: transform 0.4s;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    transform: scale(1.2);
  }
  .logo {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .logo h1 {
    padding: 0 0.8rem;
    font-size: 1.2rem;
  }

  .hamburger {
    color: whitesmoke;
    font-size: 2rem;
    margin: 0 0.8rem;
  }
  ul {
    display: none;
    margin: 0;
    margin-bottom: 1rem;
    padding: 0;
    list-style: none;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  /* ================================= 
  Media Queries
==================================== */
  //FOR DESKTOP VIEWS
  @media (min-width: 800px) {
    margin: 0 auto;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 0;
    h1,
    h2,
    h3,
    a {
      font-size: 1.5rem;
    }
    .main-nav {
      display: flex;
    }
    .logo h1 {
      font-size: 1.5rem;
    }
    ul {
      display: flex;
      margin-bottom: 0;
    }
    .hamburger {
      display: none;
    }
  }

  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default Navbar;
