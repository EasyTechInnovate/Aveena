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
// ! ( Help Center data ) is not comming with api with response


// const revenueData = [
//   { name: 'Jan', value: 20000 },
//   { name: 'Feb', value: 30000 },
//   { name: 'Mar', value: 10000 },
//   { name: 'Apr', value: 30000 },
//   { name: 'May', value: 45000 },
//   { name: 'Jun', value: 25000 },
//   { name: 'Jul', value: 40000 },
//   { name: 'Aug', value: 8000 },
//   { name: 'Sep', value: 20000 },
//   { name: 'Oct', value: 44000 },
//   { name: 'Nov', value: 48000 },
//   { name: 'Dec', value: 15000 },
// ]

// const ticketData = [ ...hardcoded tickets... ]

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

const Dashboard = ({ revenueChart, recentBookings, recentProperties, tickets = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTickets = tickets.filter(ticket =>
    ticket.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Chart Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Statistics</p>
            <h2 className="text-lg font-semibold text-gray-800">Net Revenue</h2>
          </div>

          <div className="flex gap-3 items-center">
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-sm text-gray-700 focus:outline-none bg-white">
                <option>Yearly</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
              />
            </div>

            <button className="bg-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors">
              View All
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueChart}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis
                stroke="#6b7280"
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Net Revenue']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#32BA55"
                strokeWidth={2}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBooking recentBookings={recentBookings} />
        <RecentProperty recentProperties={recentProperties} />
      </div>

      {/* Help Center Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>

          <div className="flex gap-3">
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none w-64"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Filters
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket Id</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket, index) => (
                <TableRow key={index}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell>{ticket.created}</TableCell>
                  <TableCell>{ticket.updated}</TableCell>
                  <TableCell>
                    <MoreVertical size={18} />
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
