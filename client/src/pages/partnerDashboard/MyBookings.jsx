import React, { useEffect, useState } from "react";
import MyBookingList from "../../components/partnerDashboard/MyBookings/MyBookings";
import Sidebar from "../../components/partnerDashboard/Sidebar";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({})
  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/property-owner/bookings?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      const jsonResponse = await response.json();
      
      if (jsonResponse.success && jsonResponse.data) {
        setBookings(jsonResponse.data.bookings);
        setPagination(jsonResponse.data.pagination);
      }
      
      console.log("Booking Data:", jsonResponse);
    };

    fetchBookings();
  }, []);

  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-20 max-w-7xl w-full p-4 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
        <MyBookingList bookings={bookings} pagination={pagination} />
      </div>
    </div>
  );
};

export default MyBookings;
