import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import MyBookings from "./MyBookings/MyBookings";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FALLBACK_CHART = MONTHS.map((name) => ({ name, value: 0 }));

const RevenueDashboard = () => {
  const [revenueChart, setRevenueChart] = useState(FALLBACK_CHART);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    reservedBookings: 0,
    cancelledBookings: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // GET /property-owner/statistics
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/property-owner/statistics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const json = await res.json();
        if (json.success && json.data) {
          // Map monthly revenue chart data if returned
          if (json.data.revenueChart) {
            const chart = MONTHS.map((name, i) => {
              const found = json.data.revenueChart.find(
                (d) => d.name === name || d.month === i + 1
              );
              return { name, value: found ? found.revenue ?? found.value ?? 0 : 0 };
            });
            setRevenueChart(chart);
          }
          if (json.data.stats) {
            setStats(json.data.stats);
          }
        }
      } catch (err) {
        console.error("RevenueDashboard: statistics fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex justify-between rounded-lg bg-light p-4 items-center text-sm text-gray-500">
        <div className="flex ml-auto">
          <span className="text-gray-500">Dashboard</span> &nbsp;›&nbsp;
          <span className="text-green font-medium">Revenue</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Revenue", value: `₹${(stats.revenue ?? 0).toLocaleString("en-IN")}` },
          { label: "Total Bookings", value: stats.totalBookings ?? 0 },
          { label: "Active", value: stats.activeBookings ?? 0 },
          { label: "Reserved", value: stats.reservedBookings ?? 0 },
          { label: "Cancelled", value: stats.cancelledBookings ?? 0 },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-lg font-bold text-gray-800">{loading ? "—" : value}</p>
          </div>
        ))}
      </div>

      {/* Net Revenue Chart */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Statistics</p>
            <h2 className="text-lg font-semibold text-gray-800">Net Revenue</h2>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 focus:outline-none">
                <option>Yearly</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-2.5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 5, fill: "#22c55e", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bookings Section */}
      <div>
        <MyBookings />
      </div>
    </div>
  );
};

export default RevenueDashboard;
