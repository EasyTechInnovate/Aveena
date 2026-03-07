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
import { MoreVertical } from 'lucide-react'
import RightDrawer from '../common/RightDrawer'

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json',
})

const emptyForm = {
  offerName: '',
  promocodeName: '',
  discountType: 'percentage',
  discountValue: '',
  startingDate: '',
  endDate: '',
  limitUser: '',
  minBookingAmount: '',
}

const Offer = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState(emptyForm)

  // GET /coupons?page=1&limit=50
  const fetchCoupons = async () => {
    setLoading(true)
    const url = `${import.meta.env.VITE_API_URL}/coupons?page=1&limit=50`
    console.log('[GET] Fetch Coupons:', url)
    try {
      const response = await fetch(url, { headers: authHeaders() })
      const json = await response.json()
      console.log('[GET] Fetch Coupons Response:', json)
      if (json.success && json.data) {
        setOffers(json.data.coupons || json.data || [])
      }
    } catch (err) {
      console.error('[GET] Fetch Coupons Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCoupons() }, [])

  // PATCH /coupons/toggle-status
  const handleToggleStatus = async (couponId) => {
    const url = `${import.meta.env.VITE_API_URL}/coupons/toggle-status`
    console.log('[PATCH] Toggle Coupon Status:', url, { couponId })
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ couponId }),
      })
      const json = await response.json()
      console.log('[PATCH] Toggle Coupon Status Response:', json)
      fetchCoupons()
    } catch (err) {
      console.error('[PATCH] Toggle Coupon Status Error:', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // POST /coupons
  const handleSave = async () => {
    if (!formData.promocodeName || !formData.discountValue || !formData.startingDate || !formData.endDate) {
      alert('Please fill in all required fields.')
      return
    }
    setSaving(true)
    const url = `${import.meta.env.VITE_API_URL}/coupons`
    const payload = {
      code: formData.promocodeName.toUpperCase(),
      description: formData.offerName,
      discountType: formData.discountType || 'percentage',
      discountValue: Number(formData.discountValue),
      minBookingAmount: Number(formData.minBookingAmount) || 0,
      validFrom: formData.startingDate,
      validUntil: formData.endDate,
      usageLimit: Number(formData.limitUser) || 100,
      userUsageLimit: 1,
      applicableFor: 'all',
    }
    console.log('[POST] Create Coupon:', url, payload)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      })
      const json = await response.json()
      console.log('[POST] Create Coupon Response:', json)
      if (json.success) {
        setIsModalOpen(false)
        setFormData(emptyForm)
        fetchCoupons()
      } else {
        alert(json.message || 'Failed to create coupon.')
      }
    } catch (err) {
      console.error('[POST] Create Coupon Error:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setFormData(emptyForm)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    try { return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
    catch { return dateStr }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Offer</h1>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
          >
            Add New Offer
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Promocode Name
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Promo Code
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm text-center">
                  Value(%)
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Active Date
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  End Date
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm text-center">
                  Used
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm text-center">
                  Limit User
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-gray-500 py-10">Loading...</TableCell>
                </TableRow>
              ) : offers.length > 0 ? (
                offers.map((offer) => {
                  const isActive = offer.isActive !== false
                  return (
                    <TableRow key={offer._id || offer.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                        {offer.description || offer.code}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-green-50 border border-green-300 text-green-800">
                          {offer.code}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap text-center">
                        {offer.discountValue}{offer.discountType === 'percentage' ? '%' : '₹'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                        {formatDate(offer.validFrom)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                        {formatDate(offer.validUntil)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap text-center">
                        {offer.usedCount ?? offer.used ?? '—'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap text-center">
                        {offer.usageLimit ?? offer.userUsageLimit ?? '—'}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                          {isActive ? 'Active' : 'Inactive'}
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
                              onClick={() => handleToggleStatus(offer._id || offer.id)}
                              className="cursor-pointer py-2 text-sm text-gray-700"
                            >
                              {isActive ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                    No offers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Offer Drawer */}
      <RightDrawer
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Create a offer"
        subtitle="Create or Delete offer for users"
      >
        <div className="p-8">
          {/* Form Fields */}
          <div className="space-y-6">
            {/* First Row - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Offer Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Offer Name
                </label>
                <input
                  type="text"
                  name="offerName"
                  value={formData.offerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              {/* Promocode Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Promocode Name
                </label>
                <input
                  type="text"
                  name="promocodeName"
                  value={formData.promocodeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>
            </div>

            {/* Second Row - Discount Value on left, Dates stacked on right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Discount Value - Left Column */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Value(%)
                </label>
                <input
                  type="text"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              {/* Dates - Right Column (Stacked) */}
              <div className="flex flex-col gap-6">
                {/* Starting Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Starting Date
                  </label>
                  <input
                    type="date"
                    name="startingDate"
                    value={formData.startingDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startingDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Third Row - Limit User (Full Width) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Limit User
              </label>
              <input
                type="text"
                name="limitUser"
                value={formData.limitUser}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </RightDrawer>
    </div>
  )
}

export default Offer

