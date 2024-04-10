import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import { Spinner } from "./common";

//CHECK FOR EXSISTANCE OF REFRESH TOKEN
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);

  //RUN WHEN BROWSER REFRESH I MORA BITI PRIJE
  //REQUIREAUTH COMPONMENTE
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(" from PersistLogin component: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    //console.log(`isLoading: ${isLoading}`);
    //console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {!persist ? ( //IF PERSIST FALSE, DONT CHECK accessToken EXSISTENCE
        <Outlet></Outlet>
      ) : isLoading ? (
        <Spinner></Spinner>
      ) : (
        <Outlet></Outlet>
      )}
    </>
  );
};

export default PersistLogin;
