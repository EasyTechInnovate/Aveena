import React from 'react'

const ManagePropertySidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'owner-info', label: 'Property Owner Information' },
    { id: 'photos', label: 'Property Photos' },
    { id: 'amenities', label: 'Property Amenities' },
    { id: 'price', label: 'Property Price' },
    { id: 'faqs', label: "Property FAQ's" },
  ]

  const handleNavigation = (sectionId) => {
    if (onSectionChange) {
      onSectionChange(sectionId)
    }
  }

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-2xl w-64">
      {/* Header */}
      <div className="bg-light px-6 py-4 rounded-t-2xl">
        <h2 className="text-lg font-bold text-gray-800">Manage Property</h2>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <div
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex text-sm items-center gap-4 px-6 py-4 cursor-pointer transition-colors ${
                isActive
                  ? 'bg-light text-green'
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              <img
                src={
                  isActive
                    ? '/assets/partnerDashboard/greenuser.svg'
                    : '/assets/partnerDashboard/user.svg'
                }
                alt="icon"
                className="w-5 h-5"
              />
              <h3 className="flex-1 text-sm">{item.label}</h3>
              <img
                src={
                  isActive
                    ? '/assets/account/greenArrow.svg'
                    : '/assets/account/blueArrow.svg'
                }
                alt="arrow"
                className="w-4 h-4"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ManagePropertySidebar

