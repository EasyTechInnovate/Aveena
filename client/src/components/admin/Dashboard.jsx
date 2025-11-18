import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChevronDown, Search, MoreVertical } from 'lucide-react'
import RecentBooking from './RecentBooking'
import RecentProperty from './RecentProperty'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

// Chart data matching the design
const revenueData = [
  { name: 'Jan', value: 20000 },
  { name: 'Feb', value: 30000 },
  { name: 'Mar', value: 10000 },
  { name: 'Apr', value: 30000 },
  { name: 'May', value: 45000 },
  { name: 'Jun', value: 25000 },
  { name: 'Jul', value: 40000 },
  { name: 'Aug', value: 8000 },
  { name: 'Sep', value: 20000 },
  { name: 'Oct', value: 44000 },
  { name: 'Nov', value: 48000 },
  { name: 'Dec', value: 15000 },
]

// Sample ticket data for Help Center
const ticketData = [
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'On Hold', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'In Progress', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'Resolved', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'On Hold', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'In Progress', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'Resolved', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'On Hold', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'In Progress', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'Resolved', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'On Hold', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'In Progress', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'Resolved', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'On Hold', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'In Progress', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
  { id: '#123', customer: 'Kathryn Murphy', subject: 'Payment Is not Refund', status: 'Resolved', created: 'Jun 10, 2016', updated: 'Jun 10, 2016' },
]

const getStatusColor = (status) => {
  switch (status) {
    case 'On Hold':
      return 'bg-yellow-100 text-yellow-800'
    case 'In Progress':
      return 'bg-orange-100 text-orange-800'
    case 'Resolved':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="space-y-6">
      {/* Chart Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Statistics</p>
            <h2 className="text-lg font-semibold text-gray-800">Net Revenue</h2>
          </div>

          {/* Dropdown and Button */}
          <div className="flex gap-3 items-center">
            {/* Yearly Dropdown */}
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 focus:outline-none bg-white">
                <option>Yearly</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
              />
            </div>

            {/* View All Button */}
            <button className="bg-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors">
              View All
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(v) => `${v / 1000}K`}
                domain={[0, 60000]}
                ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000]}
              />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, 'Net Revenue']}
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
                dot={{
                  r: 6,
                  fill: 'none',
                  stroke: '#32BA55',
                  strokeWidth: 2,
                }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBooking />
        <RecentProperty />
      </div>

      {/* Help Center Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>
          
          <div className="flex gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Ticket"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green w-64"
              />
            </div>

            {/* Filters Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Filters
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Ticket Id</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Customer Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Subject</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Status</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Created Date</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Last Update</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ticketData.map((ticket, index) => (
                <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <TableCell className="text-gray-700 whitespace-nowrap">{ticket.id}</TableCell>
                  <TableCell className="text-gray-700 whitespace-nowrap">{ticket.customer}</TableCell>
                  <TableCell className="text-gray-700 whitespace-nowrap">{ticket.subject}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-700 whitespace-nowrap">{ticket.created}</TableCell>
                  <TableCell className="text-gray-700 whitespace-nowrap">{ticket.updated}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical size={18} className="text-gray-600" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard