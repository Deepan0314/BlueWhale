import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Layout() {
  return (
    <div>
      
      <main>
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
