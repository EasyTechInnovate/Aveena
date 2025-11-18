import CustomerSupport from "../components/account/CustomerSupport";
import UserSidebar from "../components/account/UserSidebar";
import React from "react";

const CustomerSupportPage = () => {
  return (
    <>
      <div className="flex gap-4 max-w-7xl mx-auto mt-6 pt-20">
        <UserSidebar />
        <CustomerSupport />
      </div>
    </>
  );
};

export default CustomerSupportPage;
