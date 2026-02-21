import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

// const recentBookings = [
//   { id: '#123', customerName: 'Kathryn Murphy', checkIn: 'Wed 3 Sep 2025', guests: '2 Adults' },
// ]

const RecentBooking = ({ recentBookings }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Booking</h3>
        <button className="bg-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors">
          View All
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead>ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Check-in Date</TableHead>
            <TableHead>Guests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentBookings.map((booking, index) => (
            <TableRow key={index} className="border-b border-gray-200">
              <TableCell className="text-gray-700">
                {booking._id}
              </TableCell>

              <TableCell className="text-gray-700">
                {booking.customer?.firstName} {booking.customer?.lastName}
              </TableCell>

              <TableCell className="text-gray-700">
                {new Date(booking.checkIn).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-gray-700">
                {booking.guests?.adults} Adults
                {booking.guests?.children > 0 && `, ${booking.guests.children} Children`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RecentBooking
