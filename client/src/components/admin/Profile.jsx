import React, { useState } from 'react'
import { Pencil, ChevronDown } from 'lucide-react'

const Profile = () => {
  // Original profile data
  const originalData = {
    firstName: 'Kamlesh',
    lastName: 'Gandham',
    fullName: 'Leslie Alexander',
    email: 'tim.jennings@example.com',
    phone: '+91 123 436 5647',
    gender: 'Male',
    dateOfBirth: '20 March 2024',
    address: 'Delhi',
    country: 'India',
    state: 'Gujarat',
    streetArea: 'Surat',
    pinCode: '235233',
  }

  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState(originalData)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEdit = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    // Reset form to original data
    setFormData(originalData)
    setIsEditMode(false)
  }

  const handleSave = () => {
    // Save form data (you can add API call here)
    console.log('Save clicked', formData)
    setIsEditMode(false)
    // Update originalData if save is successful
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        {/* Header Section with Profile Picture */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            {/* Profile Picture with Edit Icon */}
            <div className="relative">
              <img
                src="/assets/account/user.png"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/account/user.png'
                }}
              />
              {/* Edit Icon Overlay */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green rounded-full flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-darkGreen transition-colors">
                <Pencil size={14} className="text-white" />
              </div>
            </div>

            {/* Name and Email */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {formData.fullName}
              </h1>
              <p className="text-sm text-gray-600">{formData.email}</p>
            </div>
          </div>

          {/* Edit Profile / Cancel and Save Buttons */}
          <div className="flex items-center gap-3">
            {!isEditMode ? (
              <button
                onClick={handleEdit}
                className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white ${
                  isEditMode
                    ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent'
                    : 'cursor-default'
                }`}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white ${
                  isEditMode
                    ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent'
                    : 'cursor-default'
                }`}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white ${
                  isEditMode
                    ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent'
                    : 'cursor-default'
                }`}
              />
            </div>

            {/* Gender - Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white appearance-none ${
                    isEditMode
                      ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent cursor-pointer'
                      : 'cursor-default'
                  }`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Date Of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Of Birth
              </label>
              <input
                type="text"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white ${
                  isEditMode
                    ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent'
                    : 'cursor-default'
                }`}
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white ${
                  isEditMode
                    ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent'
                    : 'cursor-default'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Addition Information Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Addition Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white ${
                  isEditMode
                    ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent'
                    : 'cursor-default'
                }`}
              />
            </div>

            {/* Country - Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <div className="relative">
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white appearance-none ${
                    isEditMode
                      ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent cursor-pointer'
                      : 'cursor-default'
                  }`}
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* State - Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <div className="relative">
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white appearance-none ${
                    isEditMode
                      ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent cursor-pointer'
                      : 'cursor-default'
                  }`}
                >
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Street / Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street / Area
              </label>
              <input
                type="text"
                value={formData.streetArea}
                onChange={(e) => handleInputChange('streetArea', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white ${
                  isEditMode
                    ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent'
                    : 'cursor-default'
                }`}
              />
            </div>

            {/* Pin Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pin Code
              </label>
              <input
                type="text"
                value={formData.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white ${
                  isEditMode
                    ? 'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent'
                    : 'cursor-default'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
