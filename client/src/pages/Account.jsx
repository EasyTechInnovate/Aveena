import Profile from "../components/account/Profile";
import UserDashboardLayout from "../components/account/UserDashboardLayout";
import React from "react";

const Account = () => {
  return (
    <UserDashboardLayout>
      <Profile />
    </UserDashboardLayout>
  );
};

export default Account;
