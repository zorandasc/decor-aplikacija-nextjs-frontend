import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { ToastContainer } from "react-toastify";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";


if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer theme="colored" />
        <Routes>
          <Route path="/*" element={<App></App>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();