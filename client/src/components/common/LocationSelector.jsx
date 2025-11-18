import React, { useState, useRef, useEffect } from "react";

const LocationSelector = ({ value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [selectedLocation, setSelectedLocation] = useState(value || "");
  const dropdownRef = useRef(null);

  // Popular destinations data
  const popularDestinations = [
    { name: "Mumbai, Maharashtra, India", country: "India" },
    { name: "Delhi, India", country: "India" },
    { name: "Bangalore, Karnataka, India", country: "India" },
    { name: "Chennai, Tamil Nadu, India", country: "India" },
    { name: "Kolkata, West Bengal, India", country: "India" },
    { name: "Hyderabad, Telangana, India", country: "India" },
    { name: "Pune, Maharashtra, India", country: "India" },
    { name: "Ahmedabad, Gujarat, India", country: "India" },
    { name: "Jaipur, Rajasthan, India", country: "India" },
    { name: "Goa, India", country: "India" },
    { name: "Dubai, UAE", country: "UAE" },
    { name: "Abu Dhabi, UAE", country: "UAE" },
    { name: "Singapore", country: "Singapore" },
    { name: "Bangkok, Thailand", country: "Thailand" },
    { name: "Kuala Lumpur, Malaysia", country: "Malaysia" },
  ];

  // Filter destinations based on search term
  const filteredDestinations = popularDestinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchTerm(location);
    setIsOpen(false);
    onChange && onChange(location);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedLocation(value);
    onChange && onChange(value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="px-4 py-2 flex gap-2 items-center border-2 border-gray-300 rounded-xl cursor-text hover:border-gray-400 transition-colors">
        <img src="/assets/where-to-go.svg" alt="where" className="w-5 h-5" />
        <div className="flex flex-col w-full">
          <span className="text-xs text-darkBlue font-medium">Where to?</span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Mumbai, Maharashtra, India"
            className="w-full text-darkBlue font-semibold border-none outline-none placeholder-darkBlue min-w-[250px]"
          />
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          {filteredDestinations.length > 0 ? (
            <div className="py-2">
              {filteredDestinations.map((destination, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleLocationSelect(destination.name)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-darkBlue">
                      {destination.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {destination.country}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-gray-500">
              No destinations found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
