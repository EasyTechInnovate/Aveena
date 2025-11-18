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

// Weekly data for Total Revenue (Bar Chart)
const revenueData = [
  { name: 'MON', value: 1200 },
  { name: 'TUE', value: 1900 },
  { name: 'WED', value: 1500 },
  { name: 'THU', value: 2100 },
  { name: 'FRI', value: 2313 },
  { name: 'SAT', value: 1800 },
  { name: 'SUN', value: 1600 },
]

// Weekly data for Total Customer (Line Chart)
const customerData = [
  { name: 'MON', value: 1500 },
  { name: 'TUE', value: 2000 },
  { name: 'WED', value: 1800 },
  { name: 'THU', value: 2200 },
  { name: 'FRI', value: 1900 },
  { name: 'SAT', value: 2100 },
  { name: 'SUN', value: 1700 },
]

// Pie chart data for Total Property
const propertyData = [
  { name: 'Villa', value: 5000, color: '#32BA55' },
  { name: 'Hotels', value: 4000, color: '#86E5A8' },
  { name: 'Apartments', value: 4000, color: '#A0AEC0' },
  { name: 'Resorts', value: 2000, color: '#FBD38D' },
]

const totalProperty = 15000

// Donut chart data for Total Bookings
const bookingData = [
  { name: 'Confirm Booking', value: 5056, color: '#32BA55' },
  { name: 'Cancel Booking', value: 5000, color: '#86E5A8' },
]

const totalBookings = 10056

const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Revenue Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Statistics</p>
              <h2 className="text-lg font-semibold text-gray-800">Total Revenue</h2>
            </div>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 focus:outline-none bg-white">
                <option>Weekly</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          <div className="h-64 min-h-[256px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={256}>
              <BarChart data={revenueData} margin={{ top: 30, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(v) => `${v / 1000}k`}
                  domain={[0, 4000]}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px 12px',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#32BA55"
                  radius={[4, 4, 0, 0]}
                >
                  {revenueData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === 'FRI' ? '#22943F' : '#86E5A8'}
                    />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    content={(props) => {
                      const { x, y, value, payload } = props
                      if (payload?.name === 'FRI') {
                        return (
                          <text
                            x={x}
                            y={y}
                            dy={-8}
                            fill="#1f2937"
                            fontSize={12}
                            fontWeight={600}
                            textAnchor="middle"
                          >
                            {value.toLocaleString()}
                          </text>
                        )
                      }
                      return null
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Customer Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Statistics</p>
              <h2 className="text-lg font-semibold text-gray-800">Total Customer</h2>
            </div>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 focus:outline-none bg-white">
                <option>Weekly</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          <div className="h-64 min-h-[256px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={256}>
              <LineChart data={customerData} margin={{ top: 30, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(v) => `${v / 1000}k`}
                  domain={[0, 4000]}
                />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()}`, 'Customers']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px 12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#32BA55"
                  strokeWidth={2}
                  dot={(props) => {
                    const { cx, cy, payload } = props
                    if (!cx || !cy) return null
                    return (
                      <g key={`dot-${payload?.name}`}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={5}
                          fill="none"
                          stroke="#32BA55"
                          strokeWidth={2}
                        />
                        {payload?.name === 'TUE' && (
                          <text
                            x={cx}
                            y={cy}
                            dy={-12}
                            fill="#1f2937"
                            fontSize={12}
                            fontWeight={600}
                            textAnchor="middle"
                          >
                            {payload.value.toLocaleString()}
                          </text>
                        )}
                      </g>
                    )
                  }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Property Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="mb-6 border-b border-gray-200 pb-4">
            <p className="text-sm mb-1">Statistics</p>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Total Property</h2>
              <span className="text-xl font-semibold text-gray-800">{totalProperty.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-[60%] min-h-[250px]">
              <ResponsiveContainer width="100%" height={250} minHeight={250}>
                <PieChart>
                  <Pie
                    data={propertyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {propertyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '8px 12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3 pl-4">
              {propertyData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 font-medium">
                      {item.name} ({item.value.toLocaleString()})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm  mb-1">Statistics</p>
              <h2 className="text-lg font-semibold text-gray-800">Total Bookings</h2>
            </div>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 focus:outline-none bg-white">
                <option>Weekly</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full h-44 mb-6 min-h-[176px]">
              <ResponsiveContainer width="100%" height="100%" minHeight={176}>
                <PieChart>
                  <Pie
                    data={bookingData}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={75}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {bookingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute left-1/2 -bottom-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none" style={{ top: '25%' }}>
                <p className="text-xs mb-1">Total Booking</p>
                <p className="text-2xl font-semibold">{totalBookings.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-6 justify-center">
              {bookingData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {item.name} ({item.value.toLocaleString()})
                    </p>
                  </div>
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

