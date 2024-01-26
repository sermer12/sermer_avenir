import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/root.css";

const Routes = () => {
  const token = window.localStorage.getItem("tokenAdmin");
  return (
    <>
      <header className="hearder_root">
        <div className="logo_sumer">LOGO</div>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "is_active" : "")}
          >
            HomePage
          </NavLink>
          <NavLink
            to="/Qui sommes-nous"
            className={({ isActive }) => (isActive ? "is_active" : "")}
          >
            Qui sommes-nous
          </NavLink>
          <NavLink
            to="/Nos formations"
            className={({ isActive }) => (isActive ? "is_active" : "")}
          >
            Nos formations
          </NavLink>
          {token && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "is_active" : "")}
            >
              dashboard
            </NavLink>
          )}
          <NavLink
            to="/Nos actualites"
            className={({ isActive }) => (isActive ? "is_active" : "")}
          >
            Nos actualités
          </NavLink>

          <NavLink
            to="/Contact"
            className={({ isActive }) => (isActive ? "is_active" : "")}
          >
            Contact
          </NavLink>
        </nav>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Routes;
