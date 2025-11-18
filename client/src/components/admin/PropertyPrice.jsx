import React, { useState } from 'react'
import { Calendar } from 'lucide-react'

const PropertyPrice = ({ propertyId, onCancel, onContinue }) => {
  const [price, setPrice] = useState('37,000')
  const [cancellationDays, setCancellationDays] = useState('12')
  const [availabilityOption, setAvailabilityOption] = useState('specific-date')
  const [selectedDate, setSelectedDate] = useState('')

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

      {/* Property Price Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          How much do you want to charge per night?
        </h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Guests Pay (Per room)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 text-lg font-medium">
              ₹
            </span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            including taxes, commissions, and fees.
          </p>
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
          onClick={onContinue}
          className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default PropertyPrice

