import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/dashboard.css";

export const AdminNavigation = () => {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <NavLink to="/dashboard">ajouter une Formation</NavLink>
        <NavLink to="/dashboard/editformation">Editer une Formation</NavLink>
        <NavLink to="/dashboard/editfooter">Editer le Footer</NavLink>
      </nav>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};
