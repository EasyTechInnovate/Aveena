import React, { useEffect, useState } from 'react'
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
import { Search, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, X, Plus } from 'lucide-react'

const AddPropertyOwnerModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneCountryCode: '+91',
    phoneNumber: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const url = `${import.meta.env.VITE_API_URL}/admin/property-owners`
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: {
          countryCode: formData.phoneCountryCode,
          number: formData.phoneNumber,
        },
      }
      console.log('[POST] Create Property Owner:', url, payload)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(payload),
      })
      const json = await response.json()
      console.log('[POST] Create Property Owner Response:', json)
      if (json.success) {
        onSuccess()
        onClose()
      } else {
        setError(json.message || 'Failed to create property owner.')
      }
    } catch (err) {
      console.error('[POST] Create Property Owner Error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const initials = `${formData.firstName?.[0] || ''}${formData.lastName?.[0] || ''}`.toUpperCase() || 'PO'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Add Property Owner</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Profile Preview */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">{initials}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {formData.firstName || formData.lastName
                  ? `${formData.firstName} ${formData.lastName}`.trim()
                  : 'New Property Owner'}
              </p>
              <p className="text-sm text-gray-500">{formData.email || 'email@example.com'}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">Add Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <select
                    value={formData.phoneCountryCode}
                    onChange={(e) => handleChange('phoneCountryCode', e.target.value)}
                    className="px-2 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green bg-white"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+971">+971</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 bg-green text-white rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Owner'}
          </button>
        </div>
      </div>
    </div>
  )
}

const AllPropertyOwners = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allPropertyOwners, setAllPropertyOwners] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const itemsPerPage = 10

  const fetchPropertyOwners = async (page = 1, search = '') => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: itemsPerPage, ...(search && { search }) })
      const url = `${import.meta.env.VITE_API_URL}/admin/property-owners?${params.toString()}`
      // console.log('[GET] Fetch Property Owners:', url)
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      const json = await response.json()
      console.log('[GET] Fetch Property Owners Response:', json)
      if (json.success && json.data) {
        setAllPropertyOwners(json.data.propertyOwners || json.data.owners || json.data || [])
        setTotalPages(json.data.pagination?.totalPages || 1)
      }
    } catch (err) {
      console.error('[GET] Fetch Property Owners Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPropertyOwners(currentPage, searchTerm)
  }, [currentPage, searchTerm])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && typeof page === 'number') {
      setCurrentPage(page)
    }
  }

  const handleMarkAsInactive = (ownerId) => {
    console.log('Marking property owner as inactive:', ownerId)
  }

  const handleEdit = (ownerId) => {
    navigate(`/dashboard/admin/property-owners/edit/${ownerId}`)
  }

  const handleDelete = async (ownerId) => {
    if (window.confirm('Are you sure you want to delete this property owner?')) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/admin/property-owners/${ownerId}`
        console.log('[DELETE] Delete Property Owner:', url)
        const response = await fetch(url, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
        const json = await response.json()
        console.log('[DELETE] Delete Property Owner Response:', json)
        fetchPropertyOwners(currentPage, searchTerm)
      } catch (err) {
        console.error('[DELETE] Delete Property Owner Error:', err)
      }
    }
  }

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
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

  const getOwnerName = (owner) => {
    if (owner.name) return owner.name
    if (owner.firstName || owner.lastName) return `${owner.firstName || ''} ${owner.lastName || ''}`.trim()
    return 'Unknown'
  }

  const getOwnerPhone = (owner) => {
    if (typeof owner.phone === 'object' && owner.phone) {
      return `${owner.phone.countryCode || ''} ${owner.phone.number || ''}`.trim()
    }
    return owner.phone || owner.phoneNumber || '—'
  }

  return (
    <>
      {showAddModal && (
        <AddPropertyOwnerModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => fetchPropertyOwners(currentPage, searchTerm)}
        />
      )}

    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Property Owners</h1>
          
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
                  setCurrentPage(1)
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green w-64"
              />
            </div>

            {/* Filters Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Filters
              <ChevronDown size={18} />
            </button>

            {/* Add Property Owner Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors"
            >
              <Plus size={18} />
              Add Property Owner
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Email</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Phone Number</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">No of Pro.</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Total Stats</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">No of Booking</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">KYC Status</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-10">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : allPropertyOwners.length > 0 ? (
                allPropertyOwners.map((owner, index) => (
                  <TableRow key={owner._id || index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <TableCell className="text-gray-700 whitespace-nowrap font-medium">{getOwnerName(owner)}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{owner.email || '—'}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{getOwnerPhone(owner)}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{owner.totalProperties ?? owner.propertiesCount ?? '—'}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{owner.totalRevenue ? `$${owner.totalRevenue}` : '—'}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{owner.totalBookings ?? '—'}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        owner.kycStatus === 'approved'
                          ? 'bg-green text-white'
                          : owner.kycStatus === 'pending'
                          ? 'bg-yellow-400 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {owner.kycStatus ? owner.kycStatus.charAt(0).toUpperCase() + owner.kycStatus.slice(1) : 'N/A'}
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
                            onClick={() => handleMarkAsInactive(owner._id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Mark As In-active
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(owner._id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(owner._id)}
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
                  <TableCell colSpan={8} className="text-center text-gray-500 py-10">
                    No property owners found
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
              <span key={index} className="text-gray-500 px-2">......</span>
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
    </>
  )
}

export default AllPropertyOwners

