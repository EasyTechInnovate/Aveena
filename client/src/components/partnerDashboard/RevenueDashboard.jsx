import React from "react";
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
import MyBookings from "./MyBookings/MyBookings"; // your previous component

// Sample chart data
const revenueData = [
  { name: "Jan", value: 20000 },
  { name: "Feb", value: 30000 },
  { name: "Mar", value: 10000 },
  { name: "Apr", value: 30000 },
  { name: "May", value: 45000 },
  { name: "Jun", value: 25000 },
  { name: "Jul", value: 40000 },
  { name: "Aug", value: 8000 },
  { name: "Sep", value: 18000 },
  { name: "Oct", value: 42000 },
  { name: "Nov", value: 48000 },
  { name: "Dec", value: 15000 },
];

const RevenueDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex justify-between rounded-lg bg-light p-4 items-center text-sm text-gray-500">
        <div className="flex ml-auto">
          <span className="text-gray-500">Dashboard</span> &nbsp;›&nbsp;
          <span className="text-green font-medium">Revenue</span>
        </div>
      </div>

      {/* Net Revenue Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Statistics</p>
            <h2 className="text-lg font-semibold text-gray-800">
              Net Revenue
            </h2>
          </div>

          {/* Dropdown Filters */}
          <div className="flex gap-3">
            {/* Property Dropdown */}
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 focus:outline-none">
                <option>Select Your Property</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
              />
            </div>

            {/* Period Dropdown */}
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 focus:outline-none">
                <option>Yearly</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
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
        <MyBookings/>
      </div>
    </div>
  );
};

export default RevenueDashboard;
