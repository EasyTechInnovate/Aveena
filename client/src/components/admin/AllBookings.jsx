import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Search, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'

const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-500 text-white'
    case 'pending':
      return 'bg-yellow-500 text-white'
    case 'cancelled':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

const AllBookings = () => {
  const [bookings, setBookings] = useState([])
  const [pagination, setPagination] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const fetchBookings = async () => {
    const params = new URLSearchParams({
      page,
      limit: 10,
      ...(searchTerm && { search: searchTerm }),
      ...(status && { status }),
    })

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/bookings?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
    const jsonResponse = await response.json()

    if (jsonResponse.success && jsonResponse.data) {
      setBookings(jsonResponse.data.bookings)
      setPagination(jsonResponse.data.pagination)
    }

    console.log('Admin Search Bookings:', jsonResponse)
  }

  useEffect(() => {
    fetchBookings()
  }, [searchTerm, status, page])

  const handleDelete = (bookingId) => {
    alert(`Delete API pending for booking: ${bookingId}`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Bookings</h1>

          <div className="flex gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search Bookings"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1)
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
              />
            </div>

            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setPage(1)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking._id}</TableCell>
                    <TableCell>
                      {booking.customer?.firstName} {booking.customer?.lastName}
                    </TableCell>
                    <TableCell>{booking.property?.name}</TableCell>
                    <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                    <TableCell>{booking.noOfRooms || 1}</TableCell>
                    <TableCell>
                      {booking.guests?.adults} Adults
                      {booking.guests?.children > 0 && `, ${booking.guests.children} Children`}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <MoreVertical size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDelete(booking._id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t">
          <button
            onClick={() => setPage(prev => prev - 1)}
            disabled={pagination.page === 1}
            className="w-10 h-10 flex items-center justify-center border rounded-full disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="w-10 h-10 flex items-center justify-center border rounded-full disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllBookings
