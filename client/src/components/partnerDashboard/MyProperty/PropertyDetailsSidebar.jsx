import React from "react";

const PropertyDetailsSidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: "property-info", label: "Property Information" },
    { id: "property-photos", label: "Property Photos" },
    { id: "property-amenities", label: "Property Amenities" },
    { id: "property-price", label: "Property Price" },
    { id: "property-faqs", label: "Property FAQ's" },
  ];

  return (
    <div className="bg-white border-2 border-[#DFE0E480] rounded-2xl w-64">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Property Details</h2>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onSectionChange && onSectionChange(item.id)}
              className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors ${
                isActive
                  ? "bg-light text-green"
                  : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              <img
                src={
                  isActive
                    ? "/assets/partnerDashboard/greenuser.svg"
                    : "/assets/partnerDashboard/user.svg"
                }
                alt="icon"
                className="w-5 h-5"
              />
              <h3 className="flex-1 text-sm">{item.label}</h3>
              <img
                src={
                  isActive
                    ? "/assets/account/greenArrow.svg"
                    : "/assets/account/blueArrow.svg"
                }
                alt="arrow"
                className="w-4 h-4"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyDetailsSidebar;

