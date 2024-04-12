import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage"
import {Spinner} from "../components/common"

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  //PERSIST SE ONDOSI NA TRUST THIS DEVICE
  //AKO JE TRUE ONDA KADA USER REFRESHUJE PAGE APLIKACIJA
  //OSTAJE GOGOVANA
  const [persist] = useLocalStorage("persist", false);

  //RUN WHEN BROWSER REFRESH I MORA BITI PRIJE
  //REQUIREAUTH COMPONMENTE
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error("PersistLogin component: ", err);
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
        <Spinner />
      ) : (
        <Outlet></Outlet>
      )}
    </>
  );
};

export default PersistLogin;
