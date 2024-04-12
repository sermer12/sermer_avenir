import React from "react";
import { AdminNavigation } from "../components/AdminRoute/AdminNavigation";

const Dashboard = () => {
  return (
    <div>
      <h1 className="title-amin">
        Vous pouvez administrer vos formations ici !
      </h1>
      <AdminNavigation />
    </div>
  );
};

export default Dashboard;
