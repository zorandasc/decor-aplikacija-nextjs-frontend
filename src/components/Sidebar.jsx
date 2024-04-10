import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const activeColor = ({ isActive }) => ({
  color: isActive ? "rgb(103 179 230)" : "#fff",
});

const Sidebar = ({ toggleSidebar }) => {
  const { auth } = useAuth();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    toast.dark("🦄🙃 Buy, Buy!");
  };

  const user = auth?.username;

  return (
    <Wrapper>
      <div className="logo">
        <div className="close" onClick={toggleSidebar}>
          <i className="fa fa-times-circle fa-lg" aria-hidden="true"></i>
        </div>
      </div>
      <ul className="links">
        {!user && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {user && (
          <React.Fragment>
            <li onClick={toggleSidebar}>
              <NavLink to="/orders" style={activeColor}>
                Narudžbe
              </NavLink>
            </li>
            <li onClick={toggleSidebar}>
              <NavLink to="/offers" style={activeColor}>
                Ponude
              </NavLink>
            </li>
            <li onClick={toggleSidebar}>
              <NavLink to="/users" style={activeColor}>
                Korisnici
              </NavLink>
            </li>
            <li onClick={toggleSidebar}>
              <NavLink to="/me" style={activeColor}>
                <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>{" "}
                {user}
              </NavLink>
            </li>
            <li onClick={toggleSidebar}>
              <NavLink onClick={handleLogout} to="/login">
                Logout
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  height: 100vh;
  z-index: 900;
  padding: 0;
  background-color: rgba(100, 100, 100, 0.8);
  border-left: 2px solid rgb(103 179 230);
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.9);
  .logo {
    border: 1px solid black;
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .close {
    color: whitesmoke;
    font-size: 2rem;
    margin: 0 0.8rem;
  }
  .links {
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-bottom: 1rem;
    padding: 0;
    list-style: none;
    justify-content: center;
    align-items: center;
    a {
      color: #fff;
      display: block;
      padding: 1.7rem 1.2rem;
      font-weight: 600;
      letter-spacing: 1.2px;
      font-size: 1.3rem;
      transition: transform 0.4s;
    }
    a {
      text-decoration: none;
    }

    a:hover {
      transform: scale(1.2);
    }
  }
  @media (min-width: 800px) {
    display: none;
  }
`;

export default Sidebar;
