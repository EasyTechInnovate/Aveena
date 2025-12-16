import React, { useState, useEffect, useCallback  } from "react";

/* Generic FilterSection (keeps previous behavior) */
const FilterSection = ({ title, options, showMore, filterKey, onFilterChange, selectedFilters }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleOptions = expanded ? options : options.slice(0, 3);

  const handleCheckboxChange = (optionLabel, isChecked) => {
    onFilterChange(filterKey, optionLabel, isChecked);
  };

  return (
    <div className="mt-6">
      <h6 className="font-semibold text-sm text-darkBlue mb-2">{title}</h6>
      <div className="space-y-2">
        {visibleOptions.map((opt, i) => (
          <label key={i} className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters[filterKey]?.includes(opt.label) || false}
              onChange={(e) => handleCheckboxChange(opt.label, e.target.checked)}
              className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-lg checked:bg-darkGreen checked:border-darkGreen transition-colors mt-0.5"
            />
            <div>
              <span className="text-base text-gray-800">{opt.label}</span>
              {opt.sub && (
                <p className="text-xs text-gray-500 leading-tight">{opt.sub}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      {showMore && options.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {expanded ? "See less" : "See More"}
        </button>
      )}
    </div>
  );
};

/* New CitiesSection: has its own search box and See More behavior */
const CitiesSection = ({ options, onFilterChange, selectedFilters }) => {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const visible = expanded ? filtered : filtered.slice(0, 3);

  const handleCheckboxChange = (optionLabel, isChecked) => {
    onFilterChange('cities', optionLabel, isChecked);
  };

  return (
    <div className="mt-6">
      <h6 className="font-semibold text-sm text-darkBlue mb-3">Cities</h6>

      {/* Search box */}
      <div className="my-2">
        <div className="py-3 px-4 flex items-center gap-3 border rounded-xl">
          <img src="/assets/search/search.svg" alt="search" className="w-5 h-5" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g Surat"
            className="outline-0 w-full text-sm text-gray-700"
          />
        </div>
      </div>

      {/* City options */}
      <div className="mt-3 space-y-2">
        {visible.length === 0 && (
          <p className="text-sm text-gray-500">No results</p>
        )}

        {visible.map((opt, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.cities?.includes(opt.label) || false}
              onChange={(e) => handleCheckboxChange(opt.label, e.target.checked)}
              className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-lg checked:bg-darkGreen checked:border-darkGreen transition-colors"
            />
            <span className="text-sm text-gray-800">{opt.label}</span>
          </label>
        ))}
      </div>

      {/* See More / See less */}
      {filtered.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {expanded ? "See less" : "See More"}
        </button>
      )}
    </div>
  );
};

const Filter = ({ onFiltersChange }) => {
  const [min, setMin] = useState(710);
  const [max, setMax] = useState(6750);
  const [propertySearch, setPropertySearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    recent: [],
    popular: [],
    amenities: [],
    roomView: [],
    rewards: [],
    payment: [],
    cancellation: [],
    propertyType: [],
    propertyBrand: [],
    cities: [],
    popularLocations: [],
    starRating: [],
    travellerExperience: [],
    availability: [],
    accessibility: [],
    bedrooms: []
  });

  const minLimit = 710;
  const maxLimit = 6750;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), max - 100);
    setMin(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), min + 100);
    setMax(value);
  };

  const handleFilterChange = (filterKey, optionLabel, isChecked) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[filterKey]) {
        newFilters[filterKey] = [];
      }
      
      if (isChecked) {
        newFilters[filterKey] = [...newFilters[filterKey], optionLabel];
      } else {
        newFilters[filterKey] = newFilters[filterKey].filter(item => item !== optionLabel);
      }
      
      return newFilters;
    });
  };

  const handleAmenityClick = (amenity) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters.amenities) {
        newFilters.amenities = [];
      }
      
      if (newFilters.amenities.includes(amenity)) {
        newFilters.amenities = newFilters.amenities.filter(item => item !== amenity);
      } else {
        newFilters.amenities = [...newFilters.amenities, amenity];
      }
      
      return newFilters;
    });
  };

  // Send filter changes to parent component
  useEffect(() => {
    const filterData = {
      priceRange: { min, max },
      propertySearch,
      selectedFilters
    };
    onFiltersChange(filterData);
  }, [min, max, propertySearch, selectedFilters, onFiltersChange]);

  return (
    <div className="space-y-6">
      {/* Search by property name */}
      <div>
        <h5 className="font-semibold text-xl text-darkBlue">
          Search by property name
        </h5>

        <div className="my-4 py-2 px-6 flex gap-2 border-2 rounded-2xl">
          <img src="/assets/search/search.svg" alt="" />
          <input
            type="text"
            value={propertySearch}
            onChange={(e) => setPropertySearch(e.target.value)}
            className="p-2 outline-0 w-full"
            placeholder="e.g Marriott"
          />
        </div>
      </div>

      <hr />

      {/* Filter by section */}
      <div>
        <h5 className="font-semibold text-xl text-darkBlue">Filter by</h5>

        {/* Recent Filters */}
        <div className="mt-4">
          <h6 className="font-semibold text-sm text-darkBlue mb-2">
            Recent Filter
          </h6>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.recent?.includes("Aparthotel") || false}
                onChange={(e) => handleFilterChange("recent", "Aparthotel", e.target.checked)}
                className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-lg checked:bg-darkGreen checked:border-darkGreen transition-colors"
              />
              <span className="text-base text-gray-800">Aparthotel</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.recent?.includes("Ocean view") || false}
                onChange={(e) => handleFilterChange("recent", "Ocean view", e.target.checked)}
                className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-lg checked:bg-darkGreen checked:border-darkGreen transition-colors"
              />
              <span className="text-base text-gray-800">Ocean view</span>
            </label>
          </div>
        </div>

        {/* Popular Filters */}
        <div className="mt-4">
          <h6 className="font-semibold text-sm text-darkBlue mb-2">
            Popular filters
          </h6>
          <div className="space-y-2">
            {[
              "Spa",
              "Apartment",
              "Reserve now, pay later",
              "Resort",
              "Farm",
            ].map((filter, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.popular?.includes(filter) || false}
                  onChange={(e) => handleFilterChange("popular", filter, e.target.checked)}
                  className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-lg checked:bg-darkGreen checked:border-darkGreen transition-colors"
                />
                <span className="text-base text-gray-800">{filter}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nightly Price */}
        <div className="mt-6">
          <h6 className="font-semibold text-sm text-darkBlue mb-2">
            Nightly price
          </h6>
          <div className="flex gap-3">
            <div className="border rounded-xl px-3 py-2 flex-1 bg-gray-50">
              <p className="text-xs text-gray-500">Min</p>
              <p className="font-semibold">₹{min}</p>
            </div>
            <div className="border rounded-xl px-3 py-2 flex-1 bg-gray-50">
              <p className="text-xs text-gray-500">Max</p>
              <p className="font-semibold">₹{max}+</p>
            </div>
          </div>

          {/* Dual Range Slider */}
          <div className="relative mt-6 h-6">
            {/* Track */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2" />

            {/* Active range */}
            <div
              className="absolute top-1/2 h-2 bg-darkGreen rounded-full -translate-y-1/2"
              style={{
                left: `${((min - minLimit) / (maxLimit - minLimit)) * 100}%`,
                right: `${100 - ((max - minLimit) / (maxLimit - minLimit)) * 100}%`,
              }}
            />

            {/* Min input */}
            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              value={min}
              onChange={handleMinChange}
              className="absolute inset-0 w-full h-6 appearance-none bg-transparent pointer-events-none"
            />

            {/* Max input */}
            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              value={max}
              onChange={handleMaxChange}
              className="absolute inset-0 w-full h-6 appearance-none bg-transparent pointer-events-none"
            />

    <style>{`
  input[type="range"]::-webkit-slider-runnable-track {
    height: 2px;
    background: transparent;
    border: none;
  }
  input[type="range"]::-moz-range-track {
    height: 2px;
    background: transparent;
    border: none;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #15803d;
    cursor: pointer;
    pointer-events: auto;
    transform: translateY(-50%);
    box-shadow: 0 0 0 6px rgba(21, 128, 61, 0.07);
  }
  input[type="range"]::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #15803d;
    cursor: pointer;
    pointer-events: auto;
    transform: translateY(-50%);
    box-shadow: 0 0 0 6px rgba(21, 128, 61, 0.07);
  }
  input[type="range"]:focus {
    outline: none;
  }
`}</style>

          </div>
        </div>

        {/* Amenities */}
        <div className="mt-8">
          <h6 className="font-semibold text-sm text-darkBlue mb-4">Amenities</h6>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Spa",
              "Gym",
              "Pool",
              "Parking",
              "Wi-Fi",
              "Bar",
              "Restaurant",
              "Pet friendly",
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleAmenityClick(item)}
                className={`flex flex-col items-center justify-center border rounded-xl py-4 hover:border-darkGreen cursor-pointer transition ${
                  selectedFilters.amenities?.includes(item) ? 'border-darkGreen bg-green-50' : ''
                }`}
              >
                <img
                  src="/assets/search/spa.svg"
                  alt={item}
                  className="w-6 h-6 mb-2"
                />
                <span className="text-sm font-medium text-darkBlue">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Other filter sections */}
        <FilterSection
          title="Room View"
          options={[
            { label: "Park view" },
            { label: "Lake view" },
            { label: "Hill view" },
          ]}
          showMore
          filterKey="roomView"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Expedia rewards and discounts"
          options={[
            { label: "Discounted properties" },
            {
              label: "Member Prices",
              sub: "Get instant savings when you're signed in",
            },
            {
              label: "VIP Access properties",
              sub: "A collection of top-rated stays",
            },
          ]}
          filterKey="rewards"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Payment type"
          options={[{ label: "Reserve now, pay later" }]}
          filterKey="payment"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Property cancellation options"
          options={[{ label: "Fully refundable property" }]}
          filterKey="cancellation"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Property type"
          options={[
            { label: "Aparthotel" },
            { label: "Apartment" },
            { label: "Resort" },
          ]}
          showMore
          filterKey="propertyType"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Property brand"
          options={[
            { label: "Taj" },
            { label: "Radisson Blu" },
            { label: "Courtyard" },
          ]}
          showMore
          filterKey="propertyBrand"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        {/* === Cities (replaced FilterSection with the correct UI) === */}
        <CitiesSection
          options={[
            { label: "Delhi (and vicinity)" },
            { label: "Agra" },
            { label: "Mumbai (and vicinity)" },
            { label: "Jaipur" },
            { label: "Surat" },
            { label: "Goa" },
          ]}
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        {/* Remaining filter groups */}
        <FilterSection
          title="Popular locations"
          options={[
            { label: "Statue of Unity" },
            { label: "Lake Pichola" },
            { label: "Calangute Beach" },
          ]}
          showMore
          filterKey="popularLocations"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Star rating"
          options={[
            { label: "5 stars" },
            { label: "4 stars" },
            { label: "3 stars" },
          ]}
          showMore
          filterKey="starRating"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Traveller experience"
          options={[
            { label: "Family-friendly" },
            { label: "Adults only" },
            { label: "LGBTQ welcoming" },
            { label: "Business-friendly" },
          ]}
          showMore
          filterKey="travellerExperience"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Availability"
          options={[{ label: "Only show available properties" }]}
          filterKey="availability"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Accessibility"
          options={[
            { label: "Lift" },
            { label: "Service animals allowed" },
            { label: "Stair-free path to entrance" },
          ]}
          showMore
          filterKey="accessibility"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />

        <FilterSection
          title="Number of bedrooms"
          options={[
            { label: "Studio" },
            { label: "1" },
            { label: "2" },
            { label: "3" },
          ]}
          showMore
          filterKey="bedrooms"
          onFilterChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />
      </div>
    </div>
  );
};

export default Filter;
