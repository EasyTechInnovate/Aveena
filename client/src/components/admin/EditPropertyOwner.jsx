import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, ChevronRight, Search, MoreVertical } from 'lucide-react'
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

const EditPropertyOwner = ({ ownerId }) => {
  const navigate = useNavigate()

  const fetchOwner = async () => {
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/property-owners/${ownerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      const jsonResponse = await response.json()
  
      console.log('Owner info by ownerId Bookings:', jsonResponse)
    }
  
    useEffect(() => {
      fetchOwner()
    }, [])
  
  // Mock data - in real app, this would come from an API
  const [formData, setFormData] = useState({
    firstName: 'Kamlesh',
    lastName: 'Gandham',
    phoneNumber: '+91 123 436 5647',
    emailAddress: 'tim.jennings@example.com',
    address: 'Delhi',
    country: 'India',
    state: 'Gujarat',
    street: 'Surat',
    pinCode: '235233',
  })

  const ownerName = 'Leslie Alexander'
  const ownerEmail = 'tim.jennings@example.com'

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCancel = () => {
    navigate('/dashboard/admin/property-owners')
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving property owner data:', formData)
    // After saving, navigate back to list
    navigate('/dashboard/admin/property-owners')
  }

  // Get initials for profile picture
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      {/* Property Owners Details Section */}
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-gray-800 mb-6">Property Owners Details</h1>
        
        {/* Profile Information */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
              <span className="text-white text-2xl font-semibold">
                {getInitials(ownerName)}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{ownerName}</h2>
            <p className="text-gray-600 text-sm">{ownerEmail}</p>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Personal Information</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
      </div>

      {/* Addition Information Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Addition Information</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">
              State
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">
              Street / Area
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
        <div>
          <div className="max-w-md">
            <label className="block text-gray-700 font-medium text-sm mb-2">
              Pin Code
            </label>
            <input
              type="text"
              value={formData.pinCode}
              onChange={(e) => handleInputChange('pinCode', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
        <button
          onClick={handleCancel}
          className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-green text-white rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

// KYC Verification Component
export const KYCVerification = () => {
  return (
    <div className="space-y-6 mt-6">
      {/* Personal KYC Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Personal KYC</h2>
            <p className="text-sm text-gray-600">Owner ID Card & Government Document</p>
          </div>
          <button className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors">
            Verified
          </button>
        </div>

        {/* Aadhar Card */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-gray-800 font-medium min-w-[120px]">Aadhar card</span>
            <div className="flex gap-2">
              <div className="w-20 h-20 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop" 
                  alt="Aadhar card front" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop" 
                  alt="Aadhar card back" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green">
            <img src="/assets/admin/verify.svg" alt="verify" className="w-6 h-6" />
            <span className="text-green font-medium">Verified</span>
          </div>
        </div>

        {/* Pan Card */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-gray-800 font-medium min-w-[120px]">Pan Card</span>
            <div className="flex gap-2">
              <div className="w-20 h-20 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop" 
                  alt="Pan card" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Verify
          </button>
        </div>
      </div>

      {/* Property KYC Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Property KYC</h2>
            <p className="text-sm text-gray-600">Owner ID Card & Government Document</p>
          </div>
          <button className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors">
            Verified Document
          </button>
        </div>

        {/* Utility Bills */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-gray-800 font-medium min-w-[120px]">Utility Bills</span>
            <div className="flex gap-2">
              <div className="w-20 h-20 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop" 
                  alt="Utility bill 1" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop" 
                  alt="Utility bill 2" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green">
          <img src="/assets/admin/verify.svg" alt="verify" className="w-6 h-6" />
            <span className="text-green font-medium">Verified</span>
          </div>
        </div>

        {/* Property Document */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-sm text-gray-800 font-medium min-w-[120px]">Property Document</span>
            <div className="flex gap-2">
              <div className="w-20 h-20 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop" 
                  alt="Property document" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Verify
          </button>
        </div>
      </div>
    </div>
  )
}

// Property Details and Recent Booking Component
export const PropertyDetailsAndBookings = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Booking data
  const bookings = [
    { id: '#123', customerName: 'Kathryn Murphy', propertyName: 'Wed 3 Sep 2025', checkIn: 'Thu 4 Sep 2025', checkOut: 'Thu 4 Sep 2025', rooms: '2 Rooms', guests: '2 Adults', status: 'In Progress' },
    { id: '#123', customerName: 'Kathryn Murphy', propertyName: 'Wed 3 Sep 2025', checkIn: 'Thu 4 Sep 2025', checkOut: 'Thu 4 Sep 2025', rooms: '2 Rooms', guests: '2 Adults', status: 'Upcoming' },
    { id: '#123', customerName: 'Kathryn Murphy', propertyName: 'Wed 3 Sep 2025', checkIn: 'Thu 4 Sep 2025', checkOut: 'Thu 4 Sep 2025', rooms: '2 Rooms', guests: '2 Adults', status: 'Completed' },
    { id: '#123', customerName: 'Kathryn Murphy', propertyName: 'Wed 3 Sep 2025', checkIn: 'Thu 4 Sep 2025', checkOut: 'Thu 4 Sep 2025', rooms: '2 Rooms', guests: '2 Adults', status: 'Completed' },
    { id: '#123', customerName: 'Kathryn Murphy', propertyName: 'Wed 3 Sep 2025', checkIn: 'Thu 4 Sep 2025', checkOut: 'Thu 4 Sep 2025', rooms: '2 Rooms', guests: '2 Adults', status: 'Completed' },
    { id: '#123', customerName: 'Kathryn Murphy', propertyName: 'Wed 3 Sep 2025', checkIn: 'Thu 4 Sep 2025', checkOut: 'Thu 4 Sep 2025', rooms: '2 Rooms', guests: '2 Adults', status: 'Completed' },
    { id: '#123', customerName: 'Kathryn Murphy', propertyName: 'Wed 3 Sep 2025', checkIn: 'Thu 4 Sep 2025', checkOut: 'Thu 4 Sep 2025', rooms: '2 Rooms', guests: '2 Adults', status: 'Completed' },
    { id: '#123', customerName: 'Kathryn Murphy', propertyName: 'Wed 3 Sep 2025', checkIn: 'Thu 4 Sep 2025', checkOut: 'Thu 4 Sep 2025', rooms: '2 Rooms', guests: '2 Adults', status: 'Completed' },
  ]

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

  return (
    <div className="space-y-6 mt-6">
      {/* Property Details Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Property Details</h2>
            <p className="text-sm text-gray-600">Select any Property and get full information</p>
          </div>
          <div className="relative">
            <select className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green bg-white min-w-[180px]">
              <option>Select Property</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-5 gap-4">
          {/* Revenue */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Revenue</p>
                <p className="text-lg font-bold text-gray-800">$1,23,00.00</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Total Booking */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Booking</p>
                <p className="text-lg font-bold text-gray-800">1,23,00</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Active booking */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active booking</p>
                <p className="text-lg font-bold text-gray-800">30</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Reserved */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Reserved</p>
                <p className="text-lg font-bold text-gray-800">10</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Cancel Booking */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Cancel Booking</p>
                <p className="text-lg font-bold text-gray-800">11</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Booking Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Booking</h2>
          
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Bookings"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-green w-64"
            />
          </div>
        </div>

        {/* Booking Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">ID</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Customer Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Property Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Check-in Date</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Check-Out Date</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">No. of Rooms</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Guests</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Status</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <TableCell className="text-sm text-gray-700 whitespace-nowrap">{booking.id}</TableCell>
                  <TableCell className="text-sm text-gray-700 whitespace-nowrap">{booking.customerName}</TableCell>
                  <TableCell className="text-sm text-gray-700 whitespace-nowrap">{booking.propertyName}</TableCell>
                  <TableCell className="text-sm text-gray-700 whitespace-nowrap">{booking.checkIn}</TableCell>
                  <TableCell className="text-sm text-gray-700 whitespace-nowrap">{booking.checkOut}</TableCell>
                  <TableCell className="text-sm text-gray-700 whitespace-nowrap">{booking.rooms}</TableCell>
                  <TableCell className="text-sm text-gray-700 whitespace-nowrap">{booking.guests}</TableCell>
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
                        <DropdownMenuItem className="cursor-pointer py-2 text-sm text-gray-700">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-2 text-sm text-gray-700">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          className="cursor-pointer py-2 text-sm text-red-600"
                        >
                          Delete
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
  )
}

export default EditPropertyOwner

