import Result from "../components/search/Result";
import Filter from "../components/search/Filter";
import React, { useState } from "react";
import LocationSelector from "../components/common/LocationSelector";
import DatePicker from "../components/common/DatePicker";
import TravelerSelector from "../components/common/TravelerSelector";

const Search = () => {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [filters, setFilters] = useState({
    priceRange: { min: 710, max: 6750 },
    propertySearch: "",
    selectedFilters: {}
  });
  const [sortBy, setSortBy] = useState("recommended");

  const handleSearch = () => {
    console.log("Search data:", { location, dates, travelers, filters });
    // Handle search logic here
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const removeFilter = (filterKey, filterValue) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters.selectedFilters[filterKey]) {
        newFilters.selectedFilters[filterKey] = newFilters.selectedFilters[filterKey].filter(
          item => item !== filterValue
        );
      }
      return newFilters;
    });
  };

  const removeAllFilters = () => {
    setFilters(prev => ({
      ...prev,
      selectedFilters: {}
    }));
  };

  // Get active filter chips to display
  const getActiveFilterChips = () => {
    const chips = [];
    Object.entries(filters.selectedFilters).forEach(([filterKey, filterValues]) => {
      if (filterValues && filterValues.length > 0) {
        filterValues.forEach(value => {
          chips.push({ key: filterKey, value, label: value });
        });
      }
    });
    return chips;
  };

  const activeFilterChips = getActiveFilterChips();

  return (
    <>
      <div className="w-full bg-[url('/assets/search/herobg.png')] bg-no-repeat bg-cover bg-center p-8 pt-30">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-2">
          {/* Location Selector */}
          <div className="flex-1">
            <LocationSelector
              value={location}
              onChange={setLocation}
              placeholder="Mumbai, Maharashtra, India"
            />
          </div>

          {/* Date Picker */}
          <div className="flex-1">
            <DatePicker
              value={dates}
              onChange={setDates}
            />
          </div>

          {/* Traveler Selector */}
          <div className="flex-1">
            <TravelerSelector
              value={travelers}
              onChange={setTravelers}
            />
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="flex items-center gap-2 bg-green px-6 py-4 rounded-xl text-white font-medium hover:bg-darkGreen transition-colors"
          >
            <img
              src="/assets/search.svg"
              alt="search stay"
              className="w-5 h-5"
            />
            Search
          </button>
        </div>
      </div>

      <div className="flex gap-6 my-6 max-w-7xl mx-auto">
        <Filter onFiltersChange={handleFiltersChange} />

        <div className="p-2 flex-1">
          <div>
            {/* Tabs */}
            <div className="flex justify-between gap-6 border rounded-full p-2">
              {/* Active tab */}
              <button className="flex items-center gap-2 flex-1 justify-center px-8 py-3 rounded-full font-medium text-sm bg-green-600 text-white">
                <img
                  src="/assets/search/stay.svg"
                  alt="All Stay"
                  className="w-6 h-6"
                />
                All Stay
              </button>
              {/* Inactive tabs */}
              <button className="flex items-center gap-2 flex-1 justify-center px-8 py-3 rounded-full font-medium text-sm border border-gray-300 text-darkBlue bg-white">
                <img
                  src="/assets/search/hotel.svg"
                  alt="Hotels"
                  className="w-6 h-6"
                />
                Hotels
              </button>
              <button className="flex items-center gap-2 flex-1 justify-center px-8 py-3 rounded-full font-medium text-sm border border-gray-300 text-darkBlue bg-white">
                <img
                  src="/assets/search/home.svg"
                  alt="Homes"
                  className="w-6 h-6"
                />
                Homes
              </button>
            </div>

            {/* Filters row */}
            <div className="mt-4 bg-gray-50 px-5 py-4 rounded-xl">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                {/* Left side - Results count and filter chips */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-medium text-darkBlue">
                    {activeFilterChips.length > 0 
                      ? `${activeFilterChips.length} filter${activeFilterChips.length > 1 ? 's' : ''} applied` 
                      : "120 properties found"}
                  </h4>
                  
                  {/* Filter chips */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {activeFilterChips.map((chip, index) => (
                      <span 
                        key={`${chip.key}-${chip.value}-${index}`}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-full flex items-center gap-2 text-sm text-darkBlue hover:bg-gray-50 transition-colors"
                      >
                        {chip.label}
                        <button 
                          onClick={() => removeFilter(chip.key, chip.value)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {activeFilterChips.length > 0 && (
                      <button 
                        onClick={removeAllFilters}
                        className="text-sm text-blue-600 hover:underline whitespace-nowrap transition-colors"
                      >
                        Remove All Filters
                      </button>
                    )}
                  </div>
                </div>

                {/* Right side - Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-darkBlue font-medium">Sort By:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-darkBlue focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Star Rating</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
              </div>
            </div>
          </div>


          <Result filters={filters} sortBy={sortBy} />


        </div>
      </div>
    </>
  );
};

export default Search;
