import React from "react";
import UserSidebar from "../components/account/UserSidebar";

const ReviewRow = () => (
  <div className="rounded-2xl border p-3 flex gap-4 items-start">
    <img src="/assets/booking/room.png" className="w-60 h-36 object-cover rounded-xl" />
    <div className="flex-1">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">UDS Villa - Next to VFS, Walking to Connaught Place</h3>
          <div className="text-darkGray text-sm">New Delhi</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-green text-white text-xs px-3 py-1 rounded-full">Review Posted</span>
          <button className="text-darkGray"><img src="/assets/account/3dot.svg" alt="" /></button>
        </div>
      </div>
      <div className="mt-3 border rounded-xl p-4 text-darkGray">Your Review</div>
      <div className="text-right text-[12px] text-darkGray mt-2">10 march 2025</div>
    </div>
  </div>
);

const MyReviews = () => {
  return (
    <div className="flex gap-4 max-w-7xl mx-auto mt-6 pt-20">
      <UserSidebar />
      <div className="flex-1 border rounded-2xl p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">My reviews</h1>
          <p className="text-darkGray text-sm">View and manage all the feedback you’ve shared in one place.</p>
        </div>

        <div className="mt-4 space-y-4">
          <ReviewRow />
          <ReviewRow />
          <ReviewRow />
        </div>
      </div>
    </div>
  );
};

export default MyReviews;

