import React from "react";

const Overview = () => {
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

        <h3 className="text-lg font-semibold">$1,23,00.00</h3>
      </div>

         <div className="border-2 border-[#DFE0E480] p-4 rounded-lg flex-1">
        <div className="flex mb-2 justify-between">
          <h5>Total Booking</h5>

          <img
            src="/assets/partnerDashboard/circlearrow.svg"
            alt="circlearrow"
          />
        </div>

        <h3 className="text-lg font-semibold">1,23,00</h3>
      </div>

         <div className="border-2 border-[#DFE0E480] p-4 rounded-lg flex-1">
        <div className="flex mb-2 justify-between">
          <h5>Active booking</h5>

          <img
            src="/assets/partnerDashboard/circlearrow.svg"
            alt="circlearrow"
          />
        </div>

        <h3 className="text-lg font-semibold">30</h3>
      </div>


         <div className="border-2 border-[#DFE0E480] p-4 rounded-lg flex-1">
        <div className="flex mb-2 justify-between">
          <h5>Reserved</h5>

          <img
            src="/assets/partnerDashboard/circlearrow.svg"
            alt="circlearrow"
          />
        </div>

        <h3 className="text-lg font-semibold">10</h3>
      </div>


         <div className="border-2 border-[#DFE0E480] p-4 rounded-lg flex-1">
        <div className="flex mb-2 justify-between">
          <h5>Cancel Booking</h5>

          <img
            src="/assets/partnerDashboard/circlearrow.svg"
            alt="circlearrow"
          />
        </div>

        <h3 className="text-lg font-semibold">11</h3>
      </div>
    </div>
  );
};

export default Overview;
