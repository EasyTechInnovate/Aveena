import RevenueDashboard from "../../components/partnerDashboard/RevenueDashboard";
import Sidebar from "../../components/partnerDashboard/Sidebar";
import React from "react";

const Revenue = () => {
  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-20 max-w-7xl w-full p-4 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
        <RevenueDashboard />
      </div>
    </div>
  );
};

export default Revenue;

