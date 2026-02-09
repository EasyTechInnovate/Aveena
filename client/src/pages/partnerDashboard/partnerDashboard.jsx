import React, { useEffect, useState } from "react";
import RecentBooking from "../../components/partnerDashboard/RecentBooking/RecentBooking";
import Overview from "../../components/partnerDashboard/dashboard/Overview";
import Sidebar from "../../components/partnerDashboard/Sidebar";
import RecentAddedProperty from "../../components/partnerDashboard/RecentAddedProperty/RecentAddedProperty";

const partnerDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/property-owner/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const jsonResponse = await response.json();

      if (jsonResponse.success && jsonResponse.data) {
        setStats(jsonResponse.data.stats);
        setRecentBookings(jsonResponse.data.recentBookings);
        setRecentProperties(jsonResponse.data.recentProperties);
      }
      
      console.log("Dashboard Data:", jsonResponse);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />

      <div className="ml-[280px] mt-[80px] max-w-7xl w-full p-4 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
        <Overview stats={stats} />
        <RecentBooking recentBookings={recentBookings} />
        <RecentAddedProperty recentProperties={recentProperties} />
      </div>
    </div>
  );
};

export default partnerDashboard;