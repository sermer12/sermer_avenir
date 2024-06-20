import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/root.css";
import sumerLogo from "../assets/semerlavenir_newlogo.png";
import "../styles/logoNav.css";
import { FormationsContext } from "../context/FormationsContext";
import { useAppState } from "../repository/AppRepository.js";

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
    <FormationsContext.Provider value={useAppState()}>
      <header className="hearder_root">
        <div className="logo_sumer">
          <a href="/"><img src={sumerLogo} alt="Semer l'avenir" /></a>
        </div>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "is_active" : "")}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/Qui-sommes-nous"
            className={({ isActive }) => (isActive ? "is_active" : "")}
          >
            Qui sommes-nous
          </NavLink>
          <NavLink
            to="/Nos-formations"
            className={({ isActive }) => (isActive ? "is_active" : "")}
          >
            Nos formations
          </NavLink>
          <NavLink
            to="/Nos-actualites"
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
    </FormationsContext.Provider>
  );
};

export default Routes;
