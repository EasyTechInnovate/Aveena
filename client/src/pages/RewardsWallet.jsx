import React from "react";
import UserDashboardLayout from "../components/account/UserDashboardLayout";

const RewardsWallet = () => {
  return (
    <UserDashboardLayout>
      <div className="border rounded-2xl p-4 sm:p-6 flex-1 max-h-fit">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-darkGray">Rewards & Wallet</h1>
          <p className="text-darkGray">Save money on your next adventure with Us</p>
        </div>

        <div className="border flex justify-between rounded-2xl p-4">
          <div className="flex flex-1 items-center gap-8">
            <div className="flex items-center gap-4">
              <img src="/assets/account/wallet.png" alt="wallet" className="w-18 h-18" />
              <div>
                <h2 className="text-xl font-semibold text-darkGray">Wallet balance</h2>
                <p className="text-darkGray text-sm">Includes all spendable rewards</p>
              </div>
            </div>
            <div className="text-3xl font-bold">₹0</div>
          </div>

          <div className="flex-1 flex flex-col justify-center text-sm gap-4 border-l">
            <div className="px-4 flex justify-between">
              <div className="text-darkGray">Credits</div>
              <div className="">₹0</div>
            </div>
            <div className="px-4 flex justify-between">
              <div className="text-darkGray">Vouchers</div>
              <div className="">₹0</div>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default RewardsWallet;

