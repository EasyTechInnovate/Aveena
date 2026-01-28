import React from "react";
import BookingTablePage from "./Table";
import { ChevronDown } from "lucide-react";

const MyBookingList = ({bookings, pagination}) => {
  return (
    <div className="border-2 border-gray-200 bg-white p-6 rounded-2xl">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-xl text-gray-800">My Booking</h1>
        <div className="flex items-center gap-3">
          {/* Select Property Dropdown */}
          <div className="relative">
            <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 focus:outline-none">
              <option>Select Property</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
            />
          </div>

          {/* View All Button */}
          <button className="bg-green hover:bg-darkGreen px-6 py-2 rounded-lg text-white font-medium transition">
            View All
          </button>
        </div>
      </div>

      {/* Table */}
      <BookingTablePage bookings={bookings} pagination={pagination} />
    </div>
  );
};

export default MyBookingList;