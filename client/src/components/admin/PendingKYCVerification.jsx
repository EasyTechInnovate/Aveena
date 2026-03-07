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
import { Search, ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'

const PendingKYCVerification = () => {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const itemsPerPage = 12

  const fetchPendingKYC = async (page = 1, search = '') => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: itemsPerPage, ...(search && { search }) })
      const url = `${import.meta.env.VITE_API_URL}/admin/pending-kyc-properties?${params.toString()}`
      console.log('[GET] Fetch Pending KYC Properties:', url)
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      const json = await response.json()
      console.log('[GET] Fetch Pending KYC Properties Response:', json)
      if (json.success && json.data) {
        setProperties(json.data.properties || json.data || [])
        setTotalPages(json.data.pagination?.totalPages || 1)
      }
    } catch (err) {
      console.error('[GET] Fetch Pending KYC Properties Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPendingKYC(currentPage, searchTerm)
  }, [currentPage, searchTerm])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && typeof page === 'number') {
      setCurrentPage(page)
    }
  }

  const handleSendKYCNotification = async (propertyId) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/admin/approve-kyc/${propertyId}`
      console.log('[PATCH] Send KYC Notification / Approve KYC:', url)
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      const json = await response.json()
      console.log('[PATCH] Send KYC Notification Response:', json)
      fetchPendingKYC(currentPage, searchTerm)
    } catch (err) {
      console.error('[PATCH] Send KYC Notification Error:', err)
    }
  }

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/admin/properties/${propertyId}`
        console.log('[DELETE] Delete Pending KYC Property:', url)
        const response = await fetch(url, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
        const json = await response.json()
        console.log('[DELETE] Delete Pending KYC Property Response:', json)
        fetchPendingKYC(currentPage, searchTerm)
      } catch (err) {
        console.error('[DELETE] Delete Pending KYC Property Error:', err)
      }
    }
  }

  const handleRowClick = (propertyId) => {
    navigate(`/dashboard/admin/property/edit/${propertyId}`)
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

  const getOwnerName = (property) => {
    if (property.ownerName) return property.ownerName
    if (property.owner) {
      if (typeof property.owner === 'string') return property.owner
      if (property.owner.firstName || property.owner.lastName) {
        return `${property.owner.firstName || ''} ${property.owner.lastName || ''}`.trim()
      }
      return property.owner.name || '—'
    }
    return '—'
  }

  const formatCurrency = (value, symbol = '₹') => {
    if (!value && value !== 0) return '—'
    return `${symbol}${Number(value).toLocaleString('en-IN')}`
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pending KYC Verification</h1>

          <div className="flex gap-3">
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green w-56"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Filters
              <ChevronDown size={18} />
            </button>

            <button
              onClick={() => navigate('/dashboard/admin/property')}
              className="px-4 py-2 bg-green text-white rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors"
            >
              Create New Property
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Owner Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Property Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Property Type</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Min. Rental Income</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Sales Target</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Total Bookings</TableHead>
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
              ) : properties.length > 0 ? (
                properties.map((property, index) => (
                  <TableRow
                    key={property._id || index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(property._id)}
                  >
                    <TableCell className="text-gray-700 whitespace-nowrap font-medium">
                      {getOwnerName(property)}
                    </TableCell>
                    <TableCell className="text-gray-700 max-w-[160px] truncate">
                      {property.name || property.propertyName || '—'}
                    </TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">
                      {property.type || property.propertyType || '—'}
                    </TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">
                      {formatCurrency(property.minRentalIncome || property.minimumRentalIncome)}
                    </TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">
                      {formatCurrency(property.salesTarget)}
                    </TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">
                      {property.totalBookings ?? '—'}
                    </TableCell>
                    <TableCell className="whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-white">
                        Pending
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52">
                          <DropdownMenuItem
                            onClick={() => handleSendKYCNotification(property._id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Send KYC Notification
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(property._id)}
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
                    No pending KYC properties found
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
  )
}

export default PendingKYCVerification
