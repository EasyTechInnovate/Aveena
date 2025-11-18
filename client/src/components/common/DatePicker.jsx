import React, { useState, useRef, useEffect } from "react";

const DatePicker = ({ value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [activeInput, setActiveInput] = useState("checkIn"); // "checkIn" or "checkOut"
  const dropdownRef = useRef(null);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Update dates when value prop changes
  useEffect(() => {
    if (value && value.checkIn && value.checkOut) {
      setCheckIn(value.checkIn);
      setCheckOut(value.checkOut);
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

  const handleDateChange = (date, type) => {
    if (type === "checkIn") {
      setCheckIn(date);
      setActiveInput("checkOut");
      // If check-out is before new check-in, clear it
      if (checkOut && date >= checkOut) {
        setCheckOut("");
      }
    } else {
      setCheckOut(date);
    }
  };

  const handleDone = () => {
    if (checkIn && checkOut) {
      onChange && onChange({ checkIn, checkOut });
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const options = { month: 'short', day: 'numeric' };
      return `${checkInDate.toLocaleDateString('en-US', options)} - ${checkOutDate.toLocaleDateString('en-US', options)}`;
    } else if (checkIn) {
      const checkInDate = new Date(checkIn);
      const options = { month: 'short', day: 'numeric' };
      return `${checkInDate.toLocaleDateString('en-US', options)} - Check out`;
    }
    return "Select dates";
  };

  const getMinDate = (type) => {
    if (type === "checkOut" && checkIn) {
      // Check-out should be at least 1 day after check-in
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toISOString().split('T')[0];
    }
    return today;
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = checkOutDate - checkInDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 flex gap-2 items-center border-2 border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors"
      >
        <img src="/assets/date.svg" alt="date" className="w-5 h-5" />
        <div className="flex flex-col w-full">
          <span className="text-xs text-darkBlue font-medium">Dates</span>
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
            {/* Check-in Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-darkBlue">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => handleDateChange(e.target.value, "checkIn")}
                min={today}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-darkBlue font-medium focus:outline-none focus:border-green"
              />
            </div>

            {/* Check-out Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-darkBlue">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => handleDateChange(e.target.value, "checkOut")}
                min={getMinDate("checkOut")}
                disabled={!checkIn}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-darkBlue font-medium focus:outline-none focus:border-green disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Nights Display */}
            {calculateNights() > 0 && (
              <div className="text-sm text-gray-600 text-center">
                {calculateNights()} night{calculateNights() !== 1 ? 's' : ''}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setCheckIn("");
                  setCheckOut("");
                  setActiveInput("checkIn");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleDone}
                disabled={!checkIn || !checkOut}
                className="flex-1 bg-green text-white py-2 px-4 rounded-lg font-medium hover:bg-darkGreen transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

export default DatePicker;
