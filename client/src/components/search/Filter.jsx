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
  // API currently supports only search by property name (via `search` query).
  // All other filter states are kept commented for future backend support.
  const [propertySearch, setPropertySearch] = useState("");

  // Send only supported filter changes to parent component
  useEffect(() => {
    const filterData = {
      propertySearch,
      // priceRange, selectedFilters, etc. are intentionally omitted until API supports them
    };
    onFiltersChange(filterData);
  }, [propertySearch, onFiltersChange]);

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

      {/* Filter by section intentionally hidden until backend supports more filters */}
      {/* <div>
        <h5 className="font-semibold text-xl text-darkBlue">Filter by</h5>
        ...future filters...
      </div> */}
    </div>
  );
};

export default Filter;
