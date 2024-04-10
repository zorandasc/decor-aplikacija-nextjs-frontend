import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import Layout from "./components/Layout";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Me from "./components/Me";
import Register from "./components/Register";
import Users from "./components/Users";
import Orders from "./components/order/Orders";
import OrderForm from "./components/order/OrderForm";
import ROLES from "./constants/Roles";
import Offers from "./components/offer/Offers";
import OfferForm from "./components/offer/OfferForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        
        {/* public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin></PersistLogin>}>
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Admin, ROLES.User]}
              ></RequireAuth>
            }
          >
            <Route path="me" element={<Me></Me>}></Route>
            <Route path="orders">
              <Route index element={<Orders></Orders>}></Route>
              <Route path=":id" element={<OrderForm></OrderForm>}></Route>
            </Route>
            <Route path="offers">
              <Route index element={<Offers></Offers>}></Route>
              <Route path=":id" element={<OfferForm></OfferForm>}></Route>
            </Route>
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin]}></RequireAuth>}
          >
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="users" element={<Users></Users>}></Route>
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
