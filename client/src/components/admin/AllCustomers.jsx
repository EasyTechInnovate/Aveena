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
import { Search, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, Trash2, Eye } from 'lucide-react'
import CustomerDetails from './CustomerDetails'

// Generate customer data for pagination
const generateCustomerData = () => {
  const data = []
  const names = [
    'Kathryn Murphy',
    'John Smith',
    'Emily Johnson',
    'Michael Brown',
    'Sarah Davis',
    'David Wilson',
    'Jessica Martinez',
    'Christopher Anderson',
    'Amanda Taylor',
    'Matthew Thomas',
  ]
  const emails = [
    'michelle.rivera@example.com',
    'john.smith@example.com',
    'emily.johnson@example.com',
    'michael.brown@example.com',
    'sarah.davis@example.com',
    'david.wilson@example.com',
    'jessica.martinez@example.com',
    'christopher.anderson@example.com',
    'amanda.taylor@example.com',
    'matthew.thomas@example.com',
  ]
  const phones = [
    '+91 235 4565 678',
    '+91 234 5678 901',
    '+91 345 6789 012',
    '+91 456 7890 123',
    '+91 567 8901 234',
    '+91 678 9012 345',
    '+91 789 0123 456',
    '+91 890 1234 567',
    '+91 901 2345 678',
    '+91 012 3456 789',
  ]
  const addresses = [
    '3517 W. Gray St. Utica, Pennsylvania 57867',
    '123 Main St. New York, NY 10001',
    '456 Oak Ave. Los Angeles, CA 90001',
    '789 Pine Rd. Chicago, IL 60601',
    '321 Elm St. Houston, TX 77001',
    '654 Maple Dr. Phoenix, AZ 85001',
    '987 Cedar Ln. Philadelphia, PA 19101',
    '147 Birch Way. San Antonio, TX 78201',
    '258 Spruce St. San Diego, CA 92101',
    '369 Willow Ave. Dallas, TX 75201',
  ]

  for (let i = 1; i <= 150; i++) {
    const index = (i - 1) % 10
    data.push({
      id: i,
      customerName: names[index],
      email: emails[index],
      phone: phones[index],
      address: addresses[index],
      totalBookings: String(Math.floor(Math.random() * 20) + 1).padStart(2, '0'),
    })
  }
  return data
}

const AllCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allCustomers, setAllCustomers] = useState(generateCustomerData())
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [showCustomerDetails, setShowCustomerDetails] = useState(false)
  const itemsPerPage = 10

  // Filter customers based on search term
  const filteredCustomers = allCustomers.filter((customer) =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && typeof page === 'number') {
      setCurrentPage(page)
    }
  }

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer)
    setShowCustomerDetails(true)
  }

  const handleDelete = (customerId) => {
    if (window.confirm(`Are you sure you want to delete this customer?`)) {
      setAllCustomers((prev) => {
        const updated = prev.filter((customer) => customer.id !== customerId)
        // Adjust page if current page becomes empty after deletion
        const newFiltered = updated.filter((customer) =>
          customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm) ||
          customer.address.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Show customer details page if a customer is selected
  if (showCustomerDetails && selectedCustomer) {
    return (
      <CustomerDetails
        customer={selectedCustomer}
        onClose={() => {
          setShowCustomerDetails(false)
          setSelectedCustomer(null)
        }}
      />
    )
  }

  // Show customer list
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Customers</h1>
          
          <div className="flex gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Customer"
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
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Customer Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Email Address</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Phone Number</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Address</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Total Bookings</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer, index) => (
                  <TableRow key={`${customer.id}-${startIndex + index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <TableCell className="text-gray-700 whitespace-nowrap">{customer.customerName}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{customer.email}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{customer.phone}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{customer.address}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{customer.totalBookings}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(customer)}
                            className="cursor-pointer py-2 text-sm"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Customer Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(customer.id)}
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
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No customers found
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

export default AllCustomers

