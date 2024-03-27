import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/dashboard.css";

export const AdminNavigation = () => {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <NavLink to="/dashboard/addformation">ajouterFormation</NavLink>
        <NavLink to="/dashboard/editformation">EditerFormation</NavLink>
      </nav>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};
