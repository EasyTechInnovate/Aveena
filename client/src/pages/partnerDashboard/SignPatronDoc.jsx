import Sidebar from "../../components/partnerDashboard/Sidebar";
import React from "react";
import SignPatron from "../../components/partnerDashboard/MyProperty/SignPatron";

const SignPatronDoc = () => {
  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-[80px] max-w-7xl w-full p-4 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
        <SignPatron />
      </div>
    </div>
  );
};

export default SignPatronDoc;
