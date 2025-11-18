import MyBookingList from "../../components/partnerDashboard/MyBookings/MyBookings";
import Sidebar from "../../components/partnerDashboard/Sidebar";
import React from "react";
const MyBookings = () => {
  return (
      <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-[80px] max-w-7xl w-full p-4 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
                <MyBookingList/>
      </div>
    </div>
  )
}

export default MyBookings