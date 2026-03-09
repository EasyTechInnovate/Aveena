import React, { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json',
})

const PropertyPrice = ({ propertyId, propertyData, loading = false, onCancel, onContinue }) => {
  const [basePrice, setBasePrice] = useState('')
  const [minimumRentalIncome, setMinimumRentalIncome] = useState('')
  const [saleTarget, setSaleTarget] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [cancellationDays, setCancellationDays] = useState('12')
  const [availabilityOption, setAvailabilityOption] = useState('specific-date')
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    if (propertyData) {
      setBasePrice(String(propertyData.basePrice ?? ''))
      setMinimumRentalIncome(String(propertyData.minimumRentalIncome ?? ''))
      setSaleTarget(String(propertyData.saleTarget ?? ''))
    }
  }, [propertyData])

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <p className="text-gray-500 text-sm">Loading property price...</p>
      </div>
    )
  }

  const cancellationOptions = [
    { value: '1', label: '1 Day' },
    { value: '5', label: '5 Days' },
    { value: '12', label: '12 Days' },
    { value: '30', label: '30 Days' },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Property Price</h1>
          <p className="text-gray-600 text-sm">Please fill below details and upload your property.</p>
        </div>
        <button className="text-blue hover:text-blue-800 text-sm font-medium">
          Add New FAQ
        </button>
      </div>

      {/* Admin sets Base Price, Minimum Rental Income, Sale Target */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Base Price, Minimum Rental & Sale Target
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Base Price / Night (₹)</label>
            <input
              type="number"
              min="0"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
              placeholder="e.g. 5000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rental Income (₹)</label>
            <input
              type="number"
              min="0"
              value={minimumRentalIncome}
              onChange={(e) => setMinimumRentalIncome(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
              placeholder="e.g. 50000"
            />
            <p className="text-xs text-amber-600 mt-1">Owner cannot change this once admin sets it.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sale Target (₹)</label>
            <input
              type="number"
              min="0"
              value={saleTarget}
              onChange={(e) => setSaleTarget(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
              placeholder="e.g. 200000"
            />
          </div>
        </div>
      </div>

      {/* Cancellation Policies Section */}
      <div className="mb-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Cancellation Policies</h2>
        <p className="text-sm text-gray-700 mb-6">
          how many days before arrival can guest cancel their booking for free?
        </p>
        
        <div className="flex gap-4">
          {cancellationOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setCancellationDays(option.value)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                cancellationDays === option.value
                  ? 'bg-green text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Section */}
      <div className="mb-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Availability</h2>
        <p className="text-sm text-gray-700 mb-6">
          What's your First date when Guest can check = in?
        </p>
        
        {/* Radio Buttons */}
        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="availability"
              value="asap"
              checked={availabilityOption === 'asap'}
              onChange={(e) => setAvailabilityOption(e.target.value)}
              className="sr-only peer"
            />
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              availabilityOption === 'asap'
                ? 'border-green'
                : 'border-gray-300'
            }`}>
              {availabilityOption === 'asap' && (
                <div className="w-3 h-3 rounded-full bg-green"></div>
              )}
            </div>
            <span className="text-sm text-gray-700">As soon as possible</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="availability"
              value="specific-date"
              checked={availabilityOption === 'specific-date'}
              onChange={(e) => setAvailabilityOption(e.target.value)}
              className="sr-only peer"
            />
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              availabilityOption === 'specific-date'
                ? 'border-green'
                : 'border-gray-300'
            }`}>
              {availabilityOption === 'specific-date' && (
                <div className="w-3 h-3 rounded-full bg-green"></div>
              )}
            </div>
            <span className="text-sm text-gray-700">On a Specific Date</span>
          </label>
        </div>

        {/* Date Selection */}
        {availabilityOption === 'specific-date' && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="text-gray-600" size={20} />
              <span className="text-sm text-gray-700">Select Date</span>
            </div>
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="Enter Name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            setSaveError('')
            setSaving(true)
            try {
              const res = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/properties/${propertyId}`,
                {
                  method: 'PUT',
                  headers: authHeaders(),
                  body: JSON.stringify({
                    basePrice: Number(basePrice) || 0,
                    minimumRentalIncome: Number(minimumRentalIncome) || 0,
                    saleTarget: Number(saleTarget) || 0,
                  }),
                }
              )
              const json = await res.json()
              if (json.success) {
                onContinue?.()
              } else {
                setSaveError('Save failed. Admin property update API may not be available yet.')
              }
            } catch (err) {
              setSaveError('Save failed. Admin property update API may not be available yet.')
            } finally {
              setSaving(false)
            }
          }}
          disabled={saving || loading}
          className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
      {saveError && (
        <p className="text-amber-600 text-sm mt-3">{saveError}</p>
      )}
    </div>
  )
}

export default PropertyPrice

