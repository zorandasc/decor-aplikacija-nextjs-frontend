import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const USERS_API_URL = "/users";

const Users = () => {
  const [users, setUsers] = useState();

  const location = useLocation();
  const axiosPrivate = useAxiosPrivate(location);

  const getUsers = async () => {
    try {
      const { data: users } = await axiosPrivate.get(USERS_API_URL);
      setUsers(users);
    } catch (err) {
      toast.error(`🤑 🤐 🤭 ${err?.message}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (user) => {
    try {
      const result = await axiosPrivate.delete(USERS_API_URL + "/" + user._id);
      toast.warning(`${result.data} Status:${result.status}`);
      const deletedUsers = users.filter((u) => u._id !== user._id);
      setUsers(deletedUsers);
    } catch (err) {
      toast.error(`🤑 🤐 🤭 ${err?.message}`);
    }
  };

  return (
    <Container>
      <div className="header">
        <h2>Lista Korinsika</h2>
        <Link to="/register" className="btnAdd">
          Novi Korisnik
        </Link>
      </div>

      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i} className="user">
              {user.username}
              <button onClick={() => deleteUser(user)} className="btnClose">
                <i className="fa fa-close fa-lg"></i>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users</p>
      )}
    </Container>
  );
};

const Container = styled.article`
  width: 90%;
  max-width: 900px;
  margin: 1.5rem auto;
  background: #53626f;
  color: #f8f9fa;
  padding: 3rem;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);

  h2 {
    font-weight: bolder;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
  ul {
    padding: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: calc(1.275rem + 0.3vw);
    margin-top: 1.5rem;
    border-bottom: 1px solid #dee2e6;
    color: #f8f9fa;
  }
  .btnAdd {
    box-sizing: border-box;
    appearance: none;
    background-color: #fff;
    border: 2px solid #fff;
    border-radius: 0.6em;
    color: #3e5151;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 20px;
    padding: 0.4em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    box-shadow: 0 0 10px 0 #fff inset, 0 0 10px 4px #fff;
    transition: all 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px #333 inset, 0 0 0 0 #333;
      color: #fff;
    }
  }
  .btnClose {
    cursor: pointer;
    font-size: 1.33333333em;
    line-height: 0.75em;

    background-color: #dc3545;
    border-color: #dc3545;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    &:hover {
      background-color: #bb2d3b;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    i {
      color: #fff;
    }
    &:disabled {
      background-color: #bb2d3b;
      cursor: initial;
    }
  }

  @media (min-width: 800px) {
    background: #333;
    width: 100%;
    .btnAdd {
      margin: 40px 0;
      padding: 0.8em;
    }
  }
`;

export default Users;
