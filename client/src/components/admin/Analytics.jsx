import React from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import { ChevronDown } from 'lucide-react'

const COLORS = ['#32BA55', '#86E5A8', '#A0AEC0', '#FBD38D']

const Analytics = ({
  bookingStatus,
  customerWeekly,
  propertyDistribution,
  revenueWeekly,
}) => {
  const totalProperty = propertyDistribution.reduce((acc, cur) => acc + cur.value, 0)

  const bookingData = [
    { name: 'Confirmed', value: bookingStatus.confirmed || 0, color: '#32BA55' },
    { name: 'Cancelled', value: bookingStatus.cancelled || 0, color: '#F87171' },
    { name: 'Pending', value: bookingStatus.pending || 0, color: '#FBBF24' },
  ]

  const totalBookings = bookingStatus.total || 0

  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Revenue */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Statistics</p>
              <h2 className="text-lg font-semibold text-gray-800">Total Revenue</h2>
            </div>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 bg-white">
                <option>Weekly</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueWeekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="value" fill="#32BA55" radius={[4, 4, 0, 0]}>
                  {revenueWeekly.map((_, index) => (
                    <Cell key={index} fill="#86E5A8" />
                  ))}
                  <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Customer */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Statistics</p>
              <h2 className="text-lg font-semibold text-gray-800">Total Customer</h2>
            </div>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 bg-white">
                <option>Weekly</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerWeekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#32BA55" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Property */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Total Property</h2>
              <span className="text-xl font-semibold">{totalProperty}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyDistribution}
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {propertyDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-3">
              {propertyDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <p className="text-sm font-medium capitalize">
                    {item.name} ({item.value})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Total Bookings</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingData}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={75}
                    outerRadius={120}
                    dataKey="value"
                  >
                    {bookingData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute left-1/2 top-[45%] transform -translate-x-1/2 text-center">
                <p className="text-xs">Total Booking</p>
                <p className="text-2xl font-semibold">{totalBookings}</p>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              {bookingData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                  <p className="text-sm">
                    {item.name} ({item.value})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
