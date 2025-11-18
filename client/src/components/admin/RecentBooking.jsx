import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

// Recent Booking data
const recentBookings = [
  { id: '#123', customerName: 'Kathryn Murphy', checkIn: 'Wed 3 Sep 2025', guests: '2 Adults' },
  { id: '#123', customerName: 'Kathryn Murphy', checkIn: 'Wed 3 Sep 2025', guests: '2 Adults' },
  { id: '#123', customerName: 'Kathryn Murphy', checkIn: 'Wed 3 Sep 2025', guests: '2 Adults' },
  { id: '#123', customerName: 'Kathryn Murphy', checkIn: 'Wed 3 Sep 2025', guests: '2 Adults' },
  { id: '#123', customerName: 'Kathryn Murphy', checkIn: 'Wed 3 Sep 2025', guests: '2 Adults' },
]

const RecentBooking = () => {
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
            <TableHead className="font-semibold text-gray-800">ID</TableHead>
            <TableHead className="font-semibold text-gray-800">Customer Name</TableHead>
            <TableHead className="font-semibold text-gray-800">Check-in Date</TableHead>
            <TableHead className="font-semibold text-gray-800">Guests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentBookings.map((booking, index) => (
            <TableRow key={index} className="border-b border-gray-200">
              <TableCell className="text-gray-700">{booking.id}</TableCell>
              <TableCell className="text-gray-700">{booking.customerName}</TableCell>
              <TableCell className="text-gray-700">{booking.checkIn}</TableCell>
              <TableCell className="text-gray-700">{booking.guests}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RecentBooking

