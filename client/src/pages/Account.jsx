import Profile from "../components/account/Profile";
import UserSidebar from "../components/account/UserSidebar";
import React from "react";

const Account = () => {
  return (
    <>
      <div className="flex gap-4 max-w-7xl mx-auto mt-6 pt-20">
        <UserSidebar />
        <Profile />
      </div>
    </>
  );
};

export default Account;
