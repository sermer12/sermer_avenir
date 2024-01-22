import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Routes = () => {
  return (
    <>
      <header>
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
