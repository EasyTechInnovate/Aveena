import Sidebar from "../../components/admin/Sidebar";
import React, { useEffect, useState } from "react";
import DashboardComponent from "../../components/admin/Dashboard";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);
  const [revenueChart, setRevenueChart] = useState([]);

  useEffect(() => {
    const adminDashboard = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const jsonResponse = await response.json();

      if (jsonResponse.success && jsonResponse.data) {
        setRecentBookings(jsonResponse.data.recentBookings);
        setRecentProperties(jsonResponse.data.recentProperties);
        setRevenueChart(jsonResponse.data.revenueChart);
        setStats(jsonResponse.data.stats);
      }

      console.log("Admin Dashboard Data:", jsonResponse);
    };

    adminDashboard();
  }, []);

  return (
    <div className="w-full flex mt-20 justify-between relative">
      <Sidebar />

      <div className="w-full p-4 bg-[#F8FAFC]">
        <DashboardComponent
          stats={stats}
          recentBookings={recentBookings}
          recentProperties={recentProperties}
          revenueChart={revenueChart}
        />
      </div>
    </div>
  );
};

export default Dashboard;
