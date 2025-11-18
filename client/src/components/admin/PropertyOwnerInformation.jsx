import React, { useState } from 'react'
import { Pencil } from 'lucide-react'

const PropertyOwnerInformation = ({ propertyId, onCancel, onContinue }) => {
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const ownerName = 'Leslie Alexander'
  const ownerEmail = 'tim.jennings@example.com'

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Property Owner Information</h1>
          <p className="text-gray-600 text-sm">Please fill below details and upload your property.</p>
        </div>
        <button className="text-blue hover:text-blue-800 text-sm font-medium">
          Add New FAQ
        </button>
      </div>

      {/* Owner Profile Display */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
            <span className="text-white text-2xl font-semibold">
              {ownerName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <button className="absolute bottom-0 right-0 w-6 h-6 bg-green rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:bg-darkGreen transition-colors">
            <Pencil size={12} className="text-white" />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{ownerName}</h2>
          <p className="text-gray-600 text-sm">{ownerEmail}</p>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Addition Information</h2>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            >
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street / Area
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pin Code
            </label>
            <input
              type="text"
              value={formData.pinCode}
              onChange={(e) => handleInputChange('pinCode', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
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

export default PropertyOwnerInformation

