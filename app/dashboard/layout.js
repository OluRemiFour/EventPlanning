import React from "react";
import DashboardHeader from "./components/DashboradHeader";
import Sidebar from "./components/Sidebar";

function Dashboard({ children }) {
  return (
    <div className="flex w-[100%]">
      <div className="w-[15%]">
        <Sidebar />
      </div>
      <div className="w-[85%]">
        <DashboardHeader />
        <main className="bg-[#f0f0f0] min-h-screen">{children}</main>
      </div>
    </div>
  );
}

export default Dashboard;
