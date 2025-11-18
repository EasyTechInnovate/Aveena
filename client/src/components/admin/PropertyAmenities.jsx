import React, { useState } from 'react'
import { Check } from 'lucide-react'

const PropertyAmenities = ({ propertyId, onCancel, onContinue }) => {
  const [amenities, setAmenities] = useState({
    lawn: false,
    privatePool: false,
    balcony: false,
    ac: false,
    wifi: false,
    games: false,
    musicSystem: false,
    tv: false,
    refrigerator: false,
    bar: false,
    wheelchairFriendly: false,
    parking: false,
    fireExtinguisher: false,
    other: true, // This one is checked by default
  })

  const [newAmenity, setNewAmenity] = useState('')
  const [hasPaidAmenities, setHasPaidAmenities] = useState(false)
  const [newPaidAmenity, setNewPaidAmenity] = useState('')
  const [paidAmenityPrice, setPaidAmenityPrice] = useState('')

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) => ({
      ...prev,
      [amenity]: !prev[amenity],
    }))
  }

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      // Handle adding new amenity
      console.log('Add amenity:', newAmenity)
      setNewAmenity('')
    }
  }

  const handleAddPaidAmenity = () => {
    if (newPaidAmenity.trim() && paidAmenityPrice.trim()) {
      // Handle adding new paid amenity
      console.log('Add paid amenity:', newPaidAmenity, paidAmenityPrice)
      setNewPaidAmenity('')
      setPaidAmenityPrice('')
    }
  }

  const amenityList = [
    { key: 'lawn', label: 'Lawn' },
    { key: 'privatePool', label: 'Private Pool' },
    { key: 'balcony', label: 'Balcony/ Terrace' },
    { key: 'ac', label: 'AC' },
    { key: 'wifi', label: 'Wi-Fi' },
    { key: 'games', label: 'Indoor/ Outdoor Games' },
    { key: 'musicSystem', label: 'Music System/ Speaker' },
    { key: 'tv', label: 'TV' },
    { key: 'refrigerator', label: 'Refrigerator' },
    { key: 'bar', label: 'Bar' },
    { key: 'wheelchairFriendly', label: 'Wheelchair Friendly' },
    { key: 'parking', label: 'Parking' },
    { key: 'fireExtinguisher', label: 'Fire Extinguisher' },
    { key: 'other', label: 'Other' },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Property Amenities</h1>
          <p className="text-gray-600 text-sm">Please fill below details and upload your property.</p>
        </div>
        <button className="text-blue hover:text-blue-800 text-sm font-medium">
          Add New FAQ
        </button>
      </div>

      {/* What Can Guest use at your hotel? (Amenities) Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          What Can Guest use at your hotel? (Amenities)
        </h2>
        
        {/* Amenities Checkboxes */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {amenityList.map((amenity) => (
            <label
              key={amenity.key}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={amenities[amenity.key]}
                  onChange={() => handleAmenityChange(amenity.key)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                    amenities[amenity.key]
                      ? 'bg-green border-green'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {amenities[amenity.key] && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">{amenity.label}</span>
            </label>
          ))}
        </div>

        {/* Add New Amenities */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Add New Amenities
          </label>
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            placeholder="Enter here"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
          />
          <button
            onClick={handleAddAmenity}
            className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors whitespace-nowrap"
          >
            Add New
          </button>
        </div>
      </div>

      {/* Do you have Paid Amenities? Section */}
      <div className="mb-8 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Do you have Paid Amenities?
          </h2>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hasPaidAmenities}
              onChange={(e) => setHasPaidAmenities(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-blue peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>

        {/* Add New Paid Amenities */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Add New Amenities
          </label>
          <input
            type="text"
            value={newPaidAmenity}
            onChange={(e) => setNewPaidAmenity(e.target.value)}
            placeholder="Enter here"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
          />
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Price
          </label>
          <input
            type="text"
            value={paidAmenityPrice}
            onChange={(e) => setPaidAmenityPrice(e.target.value)}
            placeholder="Enter Amount"
            className="w-48 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
          />
          <button
            onClick={handleAddPaidAmenity}
            className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors whitespace-nowrap"
          >
            Add New
          </button>
        </div>
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

export default PropertyAmenities

