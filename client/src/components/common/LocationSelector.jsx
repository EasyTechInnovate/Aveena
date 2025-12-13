import React, { useState, useRef, useEffect, useCallback } from "react";
import { getPopularLocations, searchLocations } from "../../services";

const DEBOUNCE_DELAY = 350;

const LocationSelector = ({ value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  /** ===========================
   * FETCH POPULAR LOCATIONS
   * =========================== */
  const fetchPopular = async () => {
    try {
      setLoading(true);
      const res = await getPopularLocations();
      setLocations(res.data.data || []);
    } catch (err) {
      console.error("Error fetching popular locations", err);
    } finally {
      setLoading(false);
    }
  };

  /** ===========================
   * SEARCH API — WITH DEBOUNCE
   * =========================== */
  const debouncedSearch = useCallback((query) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await searchLocations(query);
        setLocations(res.data.data || []);
      } catch (err) {
        console.error("Error searching locations", err);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  /** ===========================
   * Handle Input Change
   * =========================== */
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onChange?.(val);
    setIsOpen(true);

    if (val.trim() === "") {
      fetchPopular();
    } else {
      debouncedSearch(val);
    }
  };

  /** ===========================
   * Handle Input Focus
   * =========================== */
  const handleInputFocus = () => {
    setIsOpen(true);
    if (!searchTerm) fetchPopular();
  };

  /** ===========================
   * Select Location
   * =========================== */
  const handleLocationSelect = (loc) => {
    const name = loc.name || loc; 
    setSearchTerm(name);
    onChange?.(name);
    setIsOpen(false);
  };

  /** ===========================
   * Click Outside → Close Dropdown
   * =========================== */
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* INPUT FIELD */}
      <div className="px-4 py-2 flex gap-2 items-center border-2 border-gray-300 rounded-xl cursor-text hover:border-gray-400 transition">
        <img src="/assets/where-to-go.svg" alt="where" className="w-5 h-5" />

        <div className="flex flex-col w-full">
          <span className="text-xs text-darkBlue font-medium">Where to?</span>

          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Search cities, destinations..."
            className="w-full text-darkBlue font-semibold border-none outline-none placeholder-darkBlue"
          />
        </div>

        <svg
          className={`w-4 h-4 text-gray-500 transform transition ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* DROPDOWN LIST */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">

          {/* Loading State */}
          {loading && (
            <div className="px-4 py-3 text-gray-500">Loading...</div>
          )}

          {/* List */}
          {!loading && locations.length > 0 && (
            <div className="py-2">
              {locations.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLocationSelect(loc)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition"
                >
                  <div>
                    <span className="font-medium text-darkBlue">
                      {loc.name || loc}
                    </span>

                    {loc.country && (
                      <span className="text-sm text-gray-600 block">
                        {loc.country}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && locations.length === 0 && (
            <div className="px-4 py-3 text-gray-500">No destinations found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
