import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { Search, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, Trash2, CheckCircle, XCircle, Edit, Check } from 'lucide-react'

// Generate property data for pagination
const generatePropertyData = () => {
  const data = []
  for (let i = 1; i <= 150; i++) {
    // First 5 rows: Pending status, N/A KYC
    // Rows 6-9: Approved status, Pending KYC
    // Rows 10+: Approved status, Approved KYC
    let status = 'Approved'
    let kycStatus = 'Approved'
    
    if (i <= 5) {
      status = 'Pending'
      kycStatus = 'N/A'
    } else if (i <= 9) {
      status = 'Approved'
      kycStatus = 'Pending'
    }
    
    data.push({
      id: i,
      propertyName: 'UDS Villa - Next to VFS.....',
      propertyType: 'Villa',
      minRentalIncome: '₹50,000',
      salesTarget: '₹19,824',
      totalBookings: '100',
      status: status,
      kycStatus: kycStatus,
    })
  }
  return data
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-500 text-white'
    case 'Approved':
      return 'bg-green-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

const AllProperty = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allProperties, setAllProperties] = useState(generatePropertyData())
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const itemsPerPage = 12

  // Filter properties based on search term
  const filteredProperties = allProperties.filter((property) =>
    property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && typeof page === 'number') {
      setCurrentPage(page)
    }
  }

  const handleMarkAsVerified = (propertyId) => {
    setSelectedPropertyId(propertyId)
    setShowApprovalModal(true)
  }

  const handleApprovalConfirm = () => {
    if (selectedPropertyId) {
      setAllProperties((prev) =>
        prev.map((property) =>
          property.id === selectedPropertyId
            ? { ...property, status: 'Approved', kycStatus: 'Approved' }
            : property
        )
      )
    }
    setShowApprovalModal(false)
    setSelectedPropertyId(null)
  }

  const handleApprovalCancel = () => {
    setShowApprovalModal(false)
    setSelectedPropertyId(null)
  }

  const handleRejectVerification = (propertyId) => {
    setAllProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? { ...property, status: 'Pending', kycStatus: 'Pending' }
          : property
      )
    )
  }

  const handleEdit = (propertyId) => {
    navigate(`/dashboard/admin/property/edit/${propertyId}`)
  }

  const handleDelete = (propertyId) => {
    if (window.confirm(`Are you sure you want to delete this property?`)) {
      setAllProperties((prev) => {
        const updated = prev.filter((property) => property.id !== propertyId)
        // Adjust page if current page becomes empty after deletion
        const newFiltered = updated.filter((property) =>
          property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-800">All Property</h1>
          
          <div className="flex gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Property"
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
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Property Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Property Type</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Min. Rental Income</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Sales Target</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Total Bookings</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-center">Status</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-center">KYC Status</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProperties.length > 0 ? (
                currentProperties.map((property, index) => (
                  <TableRow key={`${property.id}-${startIndex + index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <TableCell className="text-gray-700 whitespace-nowrap">{property.propertyName}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{property.propertyType}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{property.minRentalIncome}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{property.salesTarget}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{property.totalBookings}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-center">
                      {property.kycStatus === 'N/A' ? (
                        <span className="text-gray-700">{property.kycStatus}</span>
                      ) : (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.kycStatus)}`}>
                          {property.kycStatus}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => handleMarkAsVerified(property.id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Mark as Verified
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRejectVerification(property.id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Reject Verification
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(property.id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(property.id)}
                            className="cursor-pointer py-2 text-sm text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                    No properties found
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

      {/* Property Approval Success Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green flex items-center justify-center">
                <Check size={40} className="text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Property Approved!
            </h2>

            {/* Body Text */}
            <div className="text-gray-700 text-center mb-8 space-y-2 text-sm leading-relaxed">
              <p>
                Your property has been successfully approved for rental listing.
              </p>
              <p>
                Before we make it live for tenants, please complete your KYC verification to ensure trust, security, and smooth transactions.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleApprovalCancel}
                className="px-10 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleApprovalConfirm}
                className="flex-1 px-4 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors leading-tight"
              >
                <span className="block">Approved, ask KYC Details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllProperty

