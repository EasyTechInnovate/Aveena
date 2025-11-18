import Security from "../components/account/Security";
import UserSidebar from "../components/account/UserSidebar";
import React from "react";

const SecurityPage = () => {
  return (
    <>
      <div className="flex gap-4 max-w-7xl mx-auto mt-6 pt-20">
        <UserSidebar />
        <Security />
      </div>
    </>
  );
};

export default SecurityPage;
