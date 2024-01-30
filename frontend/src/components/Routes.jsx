import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/root.css";
import sumerLogo from "../assets/Semer l'avenir - Logo.jpg";
import "../styles/logoNav.css";

const Routes = () => {
  const token = window.localStorage.getItem("tokenAdmin");
  const handleLogout = () => {
    try {
      window.localStorage.removeItem("tokenAdmin");
      window.location = "/";
    } catch (err) {
      return err;
    }
  };
  return (
    <>
      <header className="hearder_root">
        <div className="logo_sumer">
          <img src={sumerLogo} alt="logo sumer avenir" />
        </div>
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
          {token && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "is_active" : "")}
            >
              Dashboard
            </NavLink>
          )}
          {token && (
            <>
              <NavLink onClick={handleLogout}>Deconnexion</NavLink>
            </>
          )}
        </nav>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Routes;
