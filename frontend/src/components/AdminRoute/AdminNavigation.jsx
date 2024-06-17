import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/dashboard.css";

export const AdminNavigation = () => {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <NavLink to="/dashboard">ajouter_une_Formation</NavLink>
        <NavLink to="/dashboard/editformation">Editer_une_Formation</NavLink>
        <NavLink to="/dashboard/editfooter">Editer_le_Footer</NavLink>
      </nav>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};
