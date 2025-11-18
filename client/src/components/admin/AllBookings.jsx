import React, { useState } from 'react'
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

// Generate more booking data for pagination
const generateBookingData = () => {
  const data = []
  const statuses = ['In Progress', 'Upcoming', 'Completed']
  for (let i = 1; i <= 150; i++) {
    data.push({
      id: `#${String(i).padStart(3, '0')}`,
      customer: 'Kathryn Murphy',
      property: 'UDS Villa',
      checkIn: 'Thu 4 Sep 2025',
      checkOut: 'Thu 4 Sep 2025',
      rooms: '2 Rooms',
      guests: '2 Adults',
      status: statuses[i % 3],
    })
  }
  return data
}

const getStatusColor = (status) => {
  switch (status) {
    case 'In Progress':
      return 'bg-orange-500 text-white'
    case 'Upcoming':
      return 'bg-yellow-500 text-white'
    case 'Completed':
      return 'bg-green-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

const AllBookings = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allBookings, setAllBookings] = useState(generateBookingData())
  const itemsPerPage = 10

  // Filter bookings based on search term
  const filteredBookings = allBookings.filter((booking) =>
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.property.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBookings = filteredBookings.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && typeof page === 'number') {
      setCurrentPage(page)
    }
  }

  const handleDelete = (bookingId) => {
    if (window.confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
      setAllBookings((prev) => {
        const updated = prev.filter((booking) => booking.id !== bookingId)
        // Adjust page if current page becomes empty after deletion
        const newFiltered = updated.filter((booking) =>
          booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.property.toLowerCase().includes(searchTerm.toLowerCase())
        )
        const newTotalPages = Math.ceil(newFiltered.length / itemsPerPage)
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages)
        } else if (newTotalPages === 0) {
          setCurrentPage(1)
        }
        return updated
      })
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  const pages = getPageNumbers()

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Bookings</h1>
          
          <div className="flex gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Bookings"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
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
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">ID</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Customer Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Property Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Check-in Date</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Check-out Date</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">No. of Rooms</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Guests</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Status</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking, index) => (
                  <TableRow key={`${booking.id}-${startIndex + index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <TableCell className="text-gray-700 whitespace-nowrap">{booking.id}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{booking.customer}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{booking.property}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{booking.checkIn}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{booking.checkOut}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{booking.rooms}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{booking.guests}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(booking.id)}
                            className="cursor-pointer py-2 text-sm"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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
        <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          {pages.map((page, index) =>
            page === '...' ? (
              <span key={index} className="text-gray-500 px-2">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
                  currentPage === page
                    ? 'bg-green text-white border-green'
                    : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllBookings

