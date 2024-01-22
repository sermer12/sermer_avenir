import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/root.css"

const Routes = () => {
  return (
    <>
      <header className="hearder_root">
        <div className="logo_sumer">
          LOGO
        </div>
        <nav>
          <NavLink to="/">HomePage</NavLink>
          <NavLink to="/Qui sommes-nous">Qui sommes-nous</NavLink>
          <NavLink to="/Nos formations">Nos formations</NavLink>
          <NavLink to="/Nos actualites">Nos actualités</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/Contact">Contact</NavLink>
        </nav>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Routes;
