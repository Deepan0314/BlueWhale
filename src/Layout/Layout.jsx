import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />

      <main className={isHomePage ? "" : "pt-20"}>
        <Outlet />
      </main>
    </>
  );
}