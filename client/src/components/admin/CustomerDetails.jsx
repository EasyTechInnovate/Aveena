import React, { useState, useEffect } from 'react'
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
import { MoreVertical, ArrowLeft, User } from 'lucide-react'

// Generate booking data for the customer
const generateCustomerBookings = () => {
  const bookings = []
  for (let i = 0; i < 6; i++) {
    bookings.push({
      id: '#12414',
      placeName: 'UDS Villa - Next to VFS.....',
      checkInDate: 'Wed 3 Sep 2025',
      checkOutDate: 'Wed 3 Sep 2025',
      guests: '3',
      paymentType: 'Cash',
      paymentCategory: 'Advanced',
    })
  }
  return bookings
}

const CustomerDetails = ({ customer, onClose }) => {
  const [bookings] = useState(generateCustomerBookings())
  
  // Extract first and last name from customer name or use defaults
  const getCustomerNameParts = (cust) => {
    if (cust?.customerName) {
      const parts = cust.customerName.split(' ')
      return {
        firstName: parts[0] || 'Kamlesh',
        lastName: parts.slice(1).join(' ') || 'Gandham',
      }
    }
    return { firstName: 'Kamlesh', lastName: 'Gandham' }
  }

  const nameParts = getCustomerNameParts(customer)
  
  const [formData, setFormData] = useState({
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    phoneNumber: customer?.phone || '+91 123 436 5647',
    emailAddress: customer?.email || 'tim.jennings@example.com',
    address: customer?.address || '3517 W. Gray St. Utica, Pennsylvania 57867',
  })

  // Update form data when customer changes
  useEffect(() => {
    const updatedNameParts = getCustomerNameParts(customer)
    setFormData({
      firstName: updatedNameParts.firstName,
      lastName: updatedNameParts.lastName,
      phoneNumber: customer?.phone || '+91 123 436 5647',
      emailAddress: customer?.email || 'tim.jennings@example.com',
      address: customer?.address || '3517 W. Gray St. Utica, Pennsylvania 57867',
    })
  }, [customer])

  const customerName = customer?.customerName || 'Leslie Alexander'
  const customerEmail = customer?.email || 'tim.jennings@example.com'

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden flex-shrink-0">
            <span className="text-white text-xl font-semibold">
              {customerName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 leading-tight">{customerName}</h1>
            <p className="text-gray-600 text-sm mt-1">{customerEmail}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Back
        </button>
      </div>

      <div className="space-y-6">
        {/* Personal Information Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phoneNumber}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.emailAddress}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* All Bookings Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">All Bookings</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Booking Id</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Place Name</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Check in Date</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Check out Date</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Guests</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Payment Type</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Payment Category</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4 w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <TableCell className="text-gray-700 py-3 px-4">{booking.id}</TableCell>
                    <TableCell className="text-gray-700 py-3 px-4">{booking.placeName}</TableCell>
                    <TableCell className="text-gray-700 py-3 px-4">{booking.checkInDate}</TableCell>
                    <TableCell className="text-gray-700 py-3 px-4">{booking.checkOutDate}</TableCell>
                    <TableCell className="text-gray-700 py-3 px-4">{booking.guests}</TableCell>
                    <TableCell className="text-gray-700 py-3 px-4">{booking.paymentType}</TableCell>
                    <TableCell className="text-gray-700 py-3 px-4">{booking.paymentCategory}</TableCell>
                    <TableCell className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem className="cursor-pointer py-2 text-sm">
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetails

