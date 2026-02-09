import React from "react";

const Overview = ({ stats }) => {
  return (
    <div className="bg-white p-4 rounded-lg flex gap-4 items-center mb-4">
      
      <div className="border-2 border-[#DFE0E480] p-4 rounded-lg flex-1">
        <div className="flex mb-2 justify-between">
          <h5>Revenue</h5>
          <img
            src="/assets/partnerDashboard/circlearrow.svg"
            alt="circlearrow"
          />
        </div>

        <h3 className="text-lg font-semibold">
          ${stats?.revenue?.toLocaleString() || 0}
        </h3>
      </div>

      <div className="border-2 border-[#DFE0E480] p-4 rounded-lg flex-1">
        <div className="flex mb-2 justify-between">
          <h5>Total Booking</h5>
          <img
            src="/assets/partnerDashboard/circlearrow.svg"
            alt="circlearrow"
          />
        </div>
        <h3 className="text-lg font-semibold">
            {stats?.totalBookings || 0}
        </h3>
      </div>

      
      <div className="border-2 border-[#DFE0E480] p-4 rounded-lg flex-1">
        <div className="flex mb-2 justify-between">
          <h5>Active booking</h5>
          <img
            src="/assets/partnerDashboard/circlearrow.svg"
            alt="circlearrow"
          />
        </div>
        <h3 className="text-lg font-semibold">
            {stats?.activeBookings || 0}
        </h3>
      </div>

      
      <div className="border-2 border-[#DFE0E480] p-4 rounded-lg flex-1">
        <div className="flex mb-2 justify-between">
          <h5>Cancel Booking</h5>
          <img
            src="/assets/partnerDashboard/circlearrow.svg"
            alt="circlearrow"
          />
        </div>
        <h3 className="text-lg font-semibold">
            {stats?.cancelledBookings || 0}
        </h3>
      </div>
    </div>
  );
};

export default Overview;