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
import { Search, ChevronLeft, ChevronRight, Trash2, Eye, MoreVertical } from 'lucide-react'
import CustomerDetails from './CustomerDetails'

const AllCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [pagination, setPagination] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const fetchCustomers = async () => {
    const params = new URLSearchParams({
      page,
      limit: 10,
      ...(searchTerm && { search: searchTerm }),
    })

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/customers?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )

    const jsonResponse = await response.json()

    if (jsonResponse.success && jsonResponse.data) {
      setCustomers(jsonResponse.data.customers)
      setPagination(jsonResponse.data.pagination)
    }

    console.log('Admin Customers API:', jsonResponse)
  }

  useEffect(() => {
    fetchCustomers()
  }, [searchTerm, page])

  const handleDelete = (customerId) => {
    alert(`Delete API pending for customer: ${customerId}`)
  }

  if (selectedCustomer) {
    return (
      <CustomerDetails
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Customers</h1>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Customer"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Total Bookings</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>
                      {customer.firstName} {customer.lastName}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {customer.phone?.countryCode} {customer.phone?.number}
                    </TableCell>
                    <TableCell>
                      {customer.address?.fullAddress || '-'}, {customer.address?.city}
                    </TableCell>
                    <TableCell>{customer.totalBookings}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <MoreVertical size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(customer._id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
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

        {/* Backend Pagination */}
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

export default AllCustomers
