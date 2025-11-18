import IdentityVerification from "../components/account/IdentityVerification";
import UserSidebar from "../components/account/UserSidebar";
import React from "react";

const IdentityVerificationPage = () => {
  return (
    <>
      <div className="flex gap-4 max-w-7xl mx-auto mt-6 pt-20">
        <UserSidebar />
        <IdentityVerification />
      </div>
    </>
  );
};

export default IdentityVerificationPage;
