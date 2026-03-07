import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronRight, Search, MoreVertical } from 'lucide-react'
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

// ─── Helper ────────────────────────────────────────────────────────────────────
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json',
})

// ─── Main Owner Info + Form ─────────────────────────────────────────────────────
const EditPropertyOwner = ({ ownerId }) => {
  const navigate = useNavigate()
  const [ownerData, setOwnerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    address: '',
    country: '',
    state: '',
    street: '',
    pinCode: '',
  })

  // GET /admin/property-owners/:ownerId
  useEffect(() => {
    const fetchOwner = async () => {
      const url = `${import.meta.env.VITE_API_URL}/admin/property-owners/${ownerId}`
      console.log('[GET] Fetch Property Owner by ID:', url)
      try {
        const response = await fetch(url, { headers: authHeaders() })
        const json = await response.json()
        console.log('[GET] Fetch Property Owner Response:', json)

        if (json.success && json.data) {
          const owner = json.data.propertyOwner || json.data.owner || json.data
          setOwnerData(owner)
          setFormData({
            firstName: owner.firstName || owner.name?.split(' ')[0] || '',
            lastName: owner.lastName || owner.name?.split(' ').slice(1).join(' ') || '',
            phoneNumber:
              owner.phone
                ? typeof owner.phone === 'object'
                  ? `${owner.phone.countryCode || ''} ${owner.phone.number || ''}`.trim()
                  : owner.phone
                : '',
            emailAddress: owner.email || '',
            address: owner.address?.street || owner.address || '',
            country: owner.address?.country || owner.country || '',
            state: owner.address?.state || owner.state || '',
            street: owner.address?.area || owner.street || '',
            pinCode: owner.address?.pinCode || owner.pinCode || '',
          })
        }
      } catch (err) {
        console.error('[GET] Fetch Property Owner Error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (ownerId) fetchOwner()
  }, [ownerId])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    const url = `${import.meta.env.VITE_API_URL}/admin/property-owners/${ownerId}`
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.emailAddress,
      phone: { number: formData.phoneNumber },
      address: {
        street: formData.address,
        country: formData.country,
        state: formData.state,
        area: formData.street,
        pinCode: formData.pinCode,
      },
    }
    console.log('[PUT] Update Property Owner:', url, payload)
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      })
      const json = await response.json()
      console.log('[PUT] Update Property Owner Response:', json)
      navigate('/dashboard/admin/property-owners')
    } catch (err) {
      console.error('[PUT] Update Property Owner Error:', err)
    } finally {
      setSaving(false)
    }
  }

  const getInitials = (first = '', last = '') =>
    `${first[0] || ''}${last[0] || ''}`.toUpperCase() || 'PO'

  const ownerFullName = ownerData
    ? `${ownerData.firstName || ''} ${ownerData.lastName || ''}`.trim() ||
      ownerData.name ||
      'Property Owner'
    : 'Property Owner'

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <p className="text-gray-500 text-sm">Loading owner details...</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-gray-800 mb-6">Property Owners Details</h1>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
            {ownerData?.profileImage ? (
              <img src={ownerData.profileImage} alt={ownerFullName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-2xl font-semibold">
                {getInitials(formData.firstName, formData.lastName)}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{ownerFullName}</h2>
            <p className="text-gray-600 text-sm">{formData.emailAddress}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Personal Information</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">Last Name</label>
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
            <label className="block text-gray-700 font-medium text-sm mb-2">Phone Number</label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">Email Address</label>
            <input
              type="email"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Addition Information</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">Country</label>
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
            <label className="block text-gray-700 font-medium text-sm mb-2">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">Street / Area</label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
        <div className="max-w-md">
          <label className="block text-gray-700 font-medium text-sm mb-2">Pin Code</label>
          <input
            type="text"
            value={formData.pinCode}
            onChange={(e) => handleInputChange('pinCode', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
        <button
          onClick={() => navigate('/dashboard/admin/property-owners')}
          className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-green text-white rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

// ─── KYC Verification Component ─────────────────────────────────────────────────
export const KYCVerification = ({ ownerId }) => {
  const [kycData, setKycData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState({})

  // Fetch KYC info from owner details
  useEffect(() => {
    const fetchKYC = async () => {
      const url = `${import.meta.env.VITE_API_URL}/admin/property-owners/${ownerId}`
      console.log('[GET] Fetch Owner KYC Data:', url)
      try {
        const response = await fetch(url, { headers: authHeaders() })
        const json = await response.json()
        console.log('[GET] Fetch Owner KYC Data Response:', json)
        if (json.success && json.data) {
          const owner = json.data.propertyOwner || json.data.owner || json.data
          setKycData(owner.kyc || owner.kycDocuments || owner.documents || null)
        }
      } catch (err) {
        console.error('[GET] Fetch Owner KYC Error:', err)
      } finally {
        setLoading(false)
      }
    }
    if (ownerId) fetchKYC()
  }, [ownerId])

  // PATCH /admin/approve-kyc/:propertyId
  const handleApproveKYC = async (propertyId, docType) => {
    setActionLoading((prev) => ({ ...prev, [`approve-${docType}`]: true }))
    const url = `${import.meta.env.VITE_API_URL}/admin/approve-kyc/${propertyId}`
    console.log('[PATCH] Approve KYC:', url, { docType })
    try {
      const response = await fetch(url, { method: 'PATCH', headers: authHeaders() })
      const json = await response.json()
      console.log('[PATCH] Approve KYC Response:', json)
    } catch (err) {
      console.error('[PATCH] Approve KYC Error:', err)
    } finally {
      setActionLoading((prev) => ({ ...prev, [`approve-${docType}`]: false }))
    }
  }

  // PATCH /admin/reject-kyc/:propertyId
  const handleRejectKYC = async (propertyId, docType) => {
    setActionLoading((prev) => ({ ...prev, [`reject-${docType}`]: true }))
    const url = `${import.meta.env.VITE_API_URL}/admin/reject-kyc/${propertyId}`
    console.log('[PATCH] Reject KYC:', url, { docType })
    try {
      const response = await fetch(url, { method: 'PATCH', headers: authHeaders() })
      const json = await response.json()
      console.log('[PATCH] Reject KYC Response:', json)
    } catch (err) {
      console.error('[PATCH] Reject KYC Error:', err)
    } finally {
      setActionLoading((prev) => ({ ...prev, [`reject-${docType}`]: false }))
    }
  }

  const DocImages = ({ images = [], fallback }) => {
    const imgs = images.length > 0 ? images : fallback ? [fallback] : []
    return (
      <div className="flex gap-2">
        {imgs.length > 0 ? (
          imgs.map((src, i) => (
            <div key={i} className="w-20 h-20 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden">
              <img src={src} alt="document" className="w-full h-full object-cover" />
            </div>
          ))
        ) : (
          <div className="w-20 h-20 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs text-center px-1">No doc</span>
          </div>
        )}
      </div>
    )
  }

  const VerifiedBadge = () => (
    <div className="flex items-center gap-2">
      <img src="/assets/admin/verify.svg" alt="verified" className="w-5 h-5" />
      <span className="text-green font-medium text-sm">Verified</span>
    </div>
  )

  const ActionButtons = ({ propertyId, docType, isVerified }) =>
    isVerified ? (
      <VerifiedBadge />
    ) : (
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleApproveKYC(propertyId, docType)}
          disabled={actionLoading[`approve-${docType}`]}
          className="text-sm text-green font-medium hover:underline disabled:opacity-50"
        >
          {actionLoading[`approve-${docType}`] ? 'Verifying...' : 'Verify'}
        </button>
        <button
          onClick={() => handleRejectKYC(propertyId, docType)}
          disabled={actionLoading[`reject-${docType}`]}
          className="text-sm text-red-500 font-medium hover:underline disabled:opacity-50"
        >
          {actionLoading[`reject-${docType}`] ? 'Rejecting...' : 'Reject KYC'}
        </button>
      </div>
    )

  // Derive KYC sections from API data or show placeholders
  const personalKyc = kycData?.personal || kycData?.personalKyc || {}
  const propertyKyc = kycData?.property || kycData?.propertyKyc || {}
  const propertyId = ownerId // fallback — use ownerId for KYC actions if no property-level ID

  return (
    <div className="space-y-6 mt-6">
      {loading && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Loading KYC data...</p>
        </div>
      )}

      {/* Property KYC */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Property KYC</h2>
            <p className="text-sm text-gray-600">Owner ID Card & Government Document</p>
          </div>
          <button className="px-4 py-2 bg-green text-white rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors">
            Verified Document
          </button>
        </div>

        {/* Utility Bills */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-gray-800 font-medium min-w-[140px]">Utility Bills</span>
            <DocImages images={propertyKyc.utilityBills || []} />
          </div>
          <ActionButtons
            propertyId={propertyKyc.propertyId || propertyId}
            docType="utility-bills"
            isVerified={propertyKyc.utilityBillsVerified ?? true}
          />
        </div>

        {/* Property Document */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-sm text-gray-800 font-medium min-w-[140px]">Property Document</span>
            <DocImages images={propertyKyc.propertyDocuments || []} />
          </div>
          <ActionButtons
            propertyId={propertyKyc.propertyId || propertyId}
            docType="property-document"
            isVerified={propertyKyc.propertyDocumentVerified ?? false}
          />
        </div>
      </div>

      {/* Personal KYC */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Personal KYC</h2>
            <p className="text-sm text-gray-600">Owner ID Card & Government Document</p>
          </div>
          <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
            personalKyc.overallStatus === 'verified'
              ? 'bg-green text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {personalKyc.overallStatus === 'verified' ? 'Verified' : 'Pending'}
          </span>
        </div>

        {/* Aadhar Card */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-gray-800 font-medium min-w-[140px]">Aadhar card</span>
            <DocImages images={personalKyc.aadharImages || personalKyc.aadhar || []} />
          </div>
          <ActionButtons
            propertyId={ownerId}
            docType="aadhar"
            isVerified={personalKyc.aadharVerified ?? false}
          />
        </div>

        {/* Pan Card */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-gray-800 font-medium min-w-[140px]">Pan Card</span>
            <DocImages images={personalKyc.panImages || personalKyc.pan || []} />
          </div>
          <ActionButtons
            propertyId={ownerId}
            docType="pan"
            isVerified={personalKyc.panVerified ?? false}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Property Details & Bookings Component ───────────────────────────────────────
export const PropertyDetailsAndBookings = ({ ownerId }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [properties, setProperties] = useState([])
  const [selectedPropertyId, setSelectedPropertyId] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [propertiesLoading, setPropertiesLoading] = useState(true)

  // GET /admin/property-owners/:ownerId/properties — populate the dropdown
  useEffect(() => {
    const fetchOwnerProperties = async () => {
      const url = `${import.meta.env.VITE_API_URL}/admin/property-owners/${ownerId}/properties?page=1&limit=50`
      console.log('[GET] Fetch Owner Properties (dropdown):', url)
      try {
        const response = await fetch(url, { headers: authHeaders() })
        const json = await response.json()
        console.log('[GET] Fetch Owner Properties Response:', json)
        if (json.success && json.data) {
          setProperties(json.data.properties || json.data || [])
        }
      } catch (err) {
        console.error('[GET] Fetch Owner Properties Error:', err)
      } finally {
        setPropertiesLoading(false)
      }
    }

    // GET /property-owner/bookings?page=1&limit=10 — initial bookings list
    const fetchBookings = async () => {
      setBookingsLoading(true)
      const url = `${import.meta.env.VITE_API_URL}/property-owner/bookings?page=1&limit=10`
      console.log('[GET] Fetch Owner Bookings List:', url)
      try {
        const response = await fetch(url, { headers: authHeaders() })
        const json = await response.json()
        console.log('[GET] Fetch Owner Bookings Response:', json)
        if (json.success && json.data) {
          setBookings(json.data.bookings || json.data || [])
        }
      } catch (err) {
        console.error('[GET] Fetch Owner Bookings Error:', err)
      } finally {
        setBookingsLoading(false)
      }
    }

    if (ownerId) {
      fetchOwnerProperties()
      fetchBookings()
    }
  }, [ownerId])

  // GET /property-owner/properties/:propertyId — fetch property detail when selected
  const handlePropertySelect = async (propertyId) => {
    setSelectedPropertyId(propertyId)
    if (!propertyId) {
      setSelectedProperty(null)
      return
    }
    const url = `${import.meta.env.VITE_API_URL}/property-owner/properties/${propertyId}`
    console.log('[GET] Fetch Selected Property Detail:', url)
    try {
      const response = await fetch(url, { headers: authHeaders() })
      const json = await response.json()
      console.log('[GET] Fetch Selected Property Detail Response:', json)
      if (json.success && json.data) {
        setSelectedProperty(json.data.property || json.data)
      }
    } catch (err) {
      console.error('[GET] Fetch Selected Property Detail Error:', err)
    }
  }

  // GET /property-owner/bookings/:bookingId — fetch booking detail on row click
  const handleBookingClick = async (bookingId) => {
    const url = `${import.meta.env.VITE_API_URL}/property-owner/bookings/${bookingId}`
    console.log('[GET] Fetch Booking Detail:', url)
    try {
      const response = await fetch(url, { headers: authHeaders() })
      const json = await response.json()
      console.log('[GET] Fetch Booking Detail Response:', json)
    } catch (err) {
      console.error('[GET] Fetch Booking Detail Error:', err)
    }
  }

  const getStatusColor = (status = '') => {
    const s = status.toLowerCase()
    if (s === 'confirmed' || s === 'completed') return 'bg-green-500 text-white'
    if (s === 'pending' || s === 'upcoming') return 'bg-yellow-500 text-white'
    if (s === 'in progress' || s === 'active') return 'bg-orange-500 text-white'
    if (s === 'cancelled' || s === 'rejected') return 'bg-red-500 text-white'
    return 'bg-gray-500 text-white'
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch {
      return dateStr
    }
  }

  const stats = selectedProperty
    ? {
        revenue: selectedProperty.revenue || selectedProperty.totalRevenue || '—',
        totalBooking: selectedProperty.totalBookings || '—',
        activeBooking: selectedProperty.activeBookings || '—',
        reserved: selectedProperty.reservedBookings || '—',
        cancelBooking: selectedProperty.cancelledBookings || '—',
      }
    : { revenue: '—', totalBooking: '—', activeBooking: '—', reserved: '—', cancelBooking: '—' }

  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase()
    return (
      !term ||
      (b.customerName || b.customer?.name || '').toLowerCase().includes(term) ||
      (b.propertyName || b.property?.name || '').toLowerCase().includes(term) ||
      (b._id || '').includes(term)
    )
  })

  return (
    <div className="space-y-6 mt-6">
      {/* Property Details */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Property Details</h2>
            <p className="text-sm text-gray-600">Select any Property and get full information</p>
          </div>
          <div className="relative">
            <select
              value={selectedPropertyId}
              onChange={(e) => handlePropertySelect(e.target.value)}
              className="appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green bg-white min-w-[200px]"
            >
              <option value="">Select Property</option>
              {propertiesLoading ? (
                <option disabled>Loading...</option>
              ) : (
                properties.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name || p.propertyName || p._id}
                  </option>
                ))
              )}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: 'Revenue', value: stats.revenue },
            { label: 'Total Booking', value: stats.totalBooking },
            { label: 'Active Booking', value: stats.activeBooking },
            { label: 'Reserved', value: stats.reserved },
            { label: 'Cancel Booking', value: stats.cancelBooking },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{label}</p>
                  <p className="text-base font-bold text-gray-800 truncate">{value}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Booking</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Bookings"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-green w-64"
            />
          </div>
        </div>

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
              {bookingsLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-gray-500 py-8 text-sm">
                    Loading bookings...
                  </TableCell>
                </TableRow>
              ) : filteredBookings.length > 0 ? (
                filteredBookings.map((booking, index) => (
                  <TableRow
                    key={booking._id || index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleBookingClick(booking._id)}
                  >
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      #{(booking._id || '').slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {booking.customerName || booking.customer?.name || '—'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {booking.propertyName || booking.property?.name || '—'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {formatDate(booking.checkIn || booking.checkInDate)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {formatDate(booking.checkOut || booking.checkOutDate)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {booking.rooms ?? booking.numberOfRooms ?? '—'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {booking.guests ?? booking.numberOfGuests ?? '—'}
                    </TableCell>
                    <TableCell className="whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                      >
                        {booking.status || '—'}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            onClick={() => handleBookingClick(booking._id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-gray-500 py-8 text-sm">
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default EditPropertyOwner
