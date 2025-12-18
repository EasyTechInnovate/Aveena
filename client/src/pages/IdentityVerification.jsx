import IdentityVerification from "../components/account/IdentityVerification";
import UserDashboardLayout from "../components/account/UserDashboardLayout";
import React from "react";

const IdentityVerificationPage = () => {
  return (
    <UserDashboardLayout>
      <IdentityVerification />
    </UserDashboardLayout>
  );
};

export default IdentityVerificationPage;
