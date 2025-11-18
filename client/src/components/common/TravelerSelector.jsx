import React, { useState, useRef, useEffect } from "react";

const TravelerSelector = ({ value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const dropdownRef = useRef(null);

  // Update travelers when value prop changes
  useEffect(() => {
    if (value) {
      setTravelers(value);
    }
  }, [value]);

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

  const handleTravelerChange = (type, delta) => {
    const newTravelers = { ...travelers };
    newTravelers[type] = Math.max(0, newTravelers[type] + delta);
    
    // Ensure minimum 1 adult
    if (type === "adults" && newTravelers.adults < 1) {
      newTravelers.adults = 1;
    }
    
    // Ensure minimum 1 room
    if (type === "rooms" && newTravelers.rooms < 1) {
      newTravelers.rooms = 1;
    }

    setTravelers(newTravelers);
    onChange && onChange(newTravelers);
  };

  const getDisplayText = () => {
    const totalTravelers = travelers.adults + travelers.children;
    const roomText = travelers.rooms === 1 ? "room" : "rooms";
    return `${totalTravelers} traveller${totalTravelers !== 1 ? "s" : ""}, ${travelers.rooms} ${roomText}`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 flex gap-2 items-center border-2 border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors"
      >
        <img src="/assets/travellers.svg" alt="travellers" className="w-5 h-5" />
        <div className="flex flex-col w-full">
          <span className="text-xs text-darkBlue font-medium">Travellers</span>
          <span className="text-darkBlue font-semibold min-w-[250px]">
            {getDisplayText()}
          </span>
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
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 p-4">
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-darkBlue">Adults</h4>
                <p className="text-sm text-gray-600">Ages 18+</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTravelerChange("adults", -1)}
                  disabled={travelers.adults <= 1}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-darkBlue">
                  {travelers.adults}
                </span>
                <button
                  type="button"
                  onClick={() => handleTravelerChange("adults", 1)}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-darkBlue">Children</h4>
                <p className="text-sm text-gray-600">Ages 0-17</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTravelerChange("children", -1)}
                  disabled={travelers.children <= 0}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-darkBlue">
                  {travelers.children}
                </span>
                <button
                  type="button"
                  onClick={() => handleTravelerChange("children", 1)}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-darkBlue">Rooms</h4>
                <p className="text-sm text-gray-600">Number of rooms</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTravelerChange("rooms", -1)}
                  disabled={travelers.rooms <= 1}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-darkBlue">
                  {travelers.rooms}
                </span>
                <button
                  type="button"
                  onClick={() => handleTravelerChange("rooms", 1)}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Done Button */}
            <div className="pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full bg-green text-white py-2 px-4 rounded-lg font-medium hover:bg-darkGreen transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelerSelector;
