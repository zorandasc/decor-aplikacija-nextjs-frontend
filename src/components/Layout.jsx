import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <Navbar toggleSidebar={() => setSidebar(!sidebar)}></Navbar>
      {sidebar && (
        <Sidebar toggleSidebar={() => setSidebar(!sidebar)}></Sidebar>
      )}
      <main className="container">
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
