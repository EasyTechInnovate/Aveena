import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";

const data = [
  {
    id: 123,
    customerName: "Leslie Alexander",
    checkIn: "Wed 3 Sep 2025 (From 02:00 PM)",
    checkOut: "Thu 4 Sep 2025 (Until 11:00 AM)",
    rooms: "2 Rooms",
    guests: "2 Guests (2 Adults)",
    paymentStatus: "Advance Paid",
    contact: "123 4356 568",
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    location: "New Delhi",
    nights: 1,
    rentalCharges: 16800,
    gst: 3024,
    promoDiscount: 1500,
    advancedPaid: 16000,
    specialRequests: "N/A",
  },
  {
    id: 124,
    customerName: "Kathryn Murphy",
    checkIn: "Wed 3 Sep 2025",
    checkOut: "Thu 4 Sep 2025",
    rooms: "2 Rooms",
    guests: "2 Adults",
    paymentStatus: "Advance Paid",
  },
  {
    id: 125,
    customerName: "Kathryn Murphy",
    checkIn: "Wed 3 Sep 2025",
    checkOut: "Thu 4 Sep 2025",
    rooms: "2 Rooms",
    guests: "2 Adults",
    paymentStatus: "Advance Paid",
  },
];

const BookingTablePage = () => {
  const navigate = useNavigate();

  const handleViewDetails = (bookingData) => {
    navigate(`/dashboard/partner/booking-details/${bookingData.id || 123}`);
  };

  return (
    <div className="my-4">
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <DataTable data={data} onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
};

export default BookingTablePage;
