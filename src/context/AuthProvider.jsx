import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [orderPage, setOrderPage] = useLocalStorage("Orderpage", 1);
  const [offerPage, setOfferPage] = useLocalStorage("Offerpage", 1);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        orderPage,
        setOrderPage,
        offerPage,
        setOfferPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
