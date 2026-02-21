import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";

const BookingTablePage = ({ bookings, pagination }) => {
  const navigate = useNavigate();

  const handleViewDetails = (bookingData) => {
    navigate(`/dashboard/partner/booking-details/${bookingData._id}`);
  };

  return (
    <div className="my-4">
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <DataTable data={bookings} onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
};

export default BookingTablePage;