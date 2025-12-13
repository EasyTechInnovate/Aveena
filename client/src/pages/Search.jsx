import Result from "../components/search/Result";
import Filter from "../components/search/Filter";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LocationSelector from "../components/common/LocationSelector";
import DatePicker from "../components/common/DatePicker";
import TravelerSelector from "../components/common/TravelerSelector";
import { getFilteredProperties } from "../services";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import FilterChips from "../components/search/FilterChips";
import SortDropdown from "../components/search/SortDropdown";
import SearchTabs from "../components/search/SearchTabs";
import Pagination from "../components/common/Pagination";

// Helper function to parse URL parameters
const parseUrlParams = (searchString) => {
  const params = new URLSearchParams(searchString);
  return {
    location: params.get("location") || "",
    checkIn: params.get("checkIn") || "",
    checkOut: params.get("checkOut") || "",
    adults: parseInt(params.get("adults")) || 2,
    childrens: parseInt(params.get("childrens")) || 0,
    rooms: parseInt(params.get("rooms")) || 1,
    page: parseInt(params.get("page")) || 1,
  };
};

// Helper function to build query string
const buildQueryString = (params) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.set(key, value.toString());
    }
  });
  
  return queryParams.toString();
};

// Map frontend sortBy to API sortBy
const mapSortByToAPI = (sortBy) => {
  const sortMap = {
    "price-low": "price_low_to_high",
    "price-high": "price_high_to_low",
    "rating": "rating",
    "distance": "distance",
    "recommended": "recommended",
  };
  return sortMap[sortBy] || "recommended";
};

// Default filters structure
const DEFAULT_FILTERS = {
  priceRange: { min: 0, max: 0 },
  propertySearch: "",
  selectedFilters: {},
};

const Search = () => {
  const locationHook = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Search parameters state
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    childrens: 0,
    rooms: 1,
  });
  
  // UI state
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("recommended");
  const [activeTab, setActiveTab] = useState("all-stay");
  
  // Ref to track initial load
  const isInitialLoad = useRef(true);

  // Parse URL parameters on mount and when URL changes
  useEffect(() => {
    const parsedParams = parseUrlParams(locationHook.search);
    setSearchParams(prev => ({
      ...prev,
      ...parsedParams,
    }));
    setCurrentPage(parsedParams.page);
  }, [locationHook.search]);

  // Fetch properties when dependencies change
  useEffect(() => {
    // Skip initial fetch if it's the first load (handled by the next effect)
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    
    // Only fetch if we have required parameters
    if (searchParams.location && searchParams.checkIn && searchParams.checkOut) {
      fetchProperties();
    }
  }, [searchParams, currentPage, sortBy, filters, activeTab]);

  // Initial fetch when URL params are loaded
  useEffect(() => {
    if (searchParams.location && searchParams.checkIn && searchParams.checkOut) {
      fetchProperties();
    }
  }, [searchParams.location, searchParams.checkIn, searchParams.checkOut]);

  // Fetch properties with current parameters
  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Build API parameters
      const apiParams = {
        whereTo: searchParams.location,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        adults: searchParams.adults,
        childrens: searchParams.childrens,
        rooms: searchParams.rooms,
        page: currentPage,
        limit: 10,
        sortBy: mapSortByToAPI(sortBy),
      };
      
      // Add property search if available
      if (filters.propertySearch) {
        apiParams.search = filters.propertySearch;
      }
      
      // Add price filter if set
      if (filters.priceRange?.min > 0 || filters.priceRange?.max > 0) {
        if (filters.priceRange.min > 0) {
          apiParams.minPrice = filters.priceRange.min;
        }
        if (filters.priceRange.max > 0) {
          apiParams.maxPrice = filters.priceRange.max;
        }
      }
      
      // Add other selected filters
      const additionalFilters = {};
      
      Object.entries(filters.selectedFilters || {}).forEach(([key, values]) => {
        if (values && values.length > 0) {
          switch (key) {
            case "amenities":
              additionalFilters.amenities = values.join(",");
              break;
            case "propertyType":
              // Apply tab filtering if active
              if (activeTab === "hotels") {
                additionalFilters.propertyType = "hotel";
              } else if (activeTab === "homes") {
                additionalFilters.propertyType = "home,villa,apartment";
              } else {
                additionalFilters.propertyType = values.join(",");
              }
              break;
            case "starRating":
              if (values.length > 0) {
                additionalFilters.rating = Math.min(...values);
              }
              break;
            default:
              additionalFilters[key] = values.join(",");
          }
        }
      });
      
      // Apply tab-based filtering
      if (activeTab === "hotels") {
        additionalFilters.propertyType = "hotel";
      } else if (activeTab === "homes") {
        additionalFilters.propertyType = "villa,apartment,home";
      }
      
      // Make API call
      const response = await getFilteredProperties(apiParams, additionalFilters);
      
      if (response.data?.success) {
        const data = response.data.data;
        setProperties(data.properties || []);
        setTotalResults(data.pagination?.total || 0);
        setTotalPages(data.pagination?.totalPages || 1);
        
        // Ensure current page is valid
        if (currentPage > (data.pagination?.totalPages || 1)) {
          setCurrentPage(1);
        }
      } else {
        throw new Error(response.data?.message || "Failed to fetch properties");
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err.message || "An error occurred while fetching properties");
      setProperties([]);
      setTotalResults(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, currentPage, sortBy, filters, activeTab]);

  // Handle main search form submission
  const handleSearch = () => {
    // Reset to first page on new search
    setCurrentPage(1);
    
    // Build URL parameters
    const queryParams = buildQueryString({
      location: searchParams.location,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      adults: searchParams.adults,
      childrens: searchParams.childrens,
      rooms: searchParams.rooms,
      page: 1,
    });
    
    // Update URL without page reload
    navigate(`/search?${queryParams}`, { replace: true });
    
    // Reset filters on new search
    setFilters(DEFAULT_FILTERS);
  };

  // Update individual search parameters
  const updateSearchParam = (key, value) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle filters change
  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, []);

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Remove individual filter
  const removeFilter = (filterKey, filterValue) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterKey === "propertySearch") {
        newFilters.propertySearch = "";
      } else if (filterKey === "priceRange") {
        newFilters.priceRange = { min: 0, max: 0 };
      } else if (newFilters.selectedFilters[filterKey]) {
        newFilters.selectedFilters[filterKey] = 
          newFilters.selectedFilters[filterKey].filter(item => item !== filterValue);
      }
      
      return newFilters;
    });
    
    setCurrentPage(1);
  };

  // Remove all filters
  const removeAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    // Update URL with new page
    const queryParams = buildQueryString({
      location: searchParams.location,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      adults: searchParams.adults,
      childrens: searchParams.childrens,
      rooms: searchParams.rooms,
      page,
    });
    
    navigate(`/search?${queryParams}`, { replace: true });
  };

  // Get active filter chips for display
  const getActiveFilterChips = () => {
    const chips = [];
    
    // Add property search chip
    if (filters.propertySearch) {
      chips.push({
        key: "propertySearch",
        value: filters.propertySearch,
        label: `Search: ${filters.propertySearch}`,
      });
    }
    
    // Add price range chip
    if (filters.priceRange?.min > 0 || filters.priceRange?.max > 0) {
      chips.push({
        key: "priceRange",
        value: `${filters.priceRange.min}-${filters.priceRange.max}`,
        label: `Price: ₹${filters.priceRange.min} - ₹${filters.priceRange.max}`,
      });
    }
    
    // Add other selected filters
    Object.entries(filters.selectedFilters).forEach(([filterKey, filterValues]) => {
      if (filterValues && filterValues.length > 0) {
        filterValues.forEach(value => {
          chips.push({
            key: filterKey,
            value,
            label: `${filterKey}: ${value}`,
          });
        });
      }
    });
    
    return chips;
  };

  const activeFilterChips = getActiveFilterChips();

  return (
    <>
      {/* Search Header */}
      <div className="w-full bg-[url('/assets/search/herobg.png')] bg-no-repeat bg-cover bg-center p-4 md:p-8 pt-24 md:pt-30">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 shadow-lg">
          {/* Location Selector */}
          <div className="flex-1">
            <LocationSelector
              value={searchParams.location}
              onChange={(value) => updateSearchParam("location", value)}
              placeholder="Mumbai, Maharashtra, India"
            />
          </div>

          {/* Date Picker */}
          <div className="flex-1">
            <DatePicker
              value={{ checkIn: searchParams.checkIn, checkOut: searchParams.checkOut }}
              onChange={(dates) => {
                updateSearchParam("checkIn", dates.checkIn);
                updateSearchParam("checkOut", dates.checkOut);
              }}
            />
          </div>

          {/* Traveler Selector */}
          <div className="flex-1">
            <TravelerSelector
              value={{
                adults: searchParams.adults,
                childrens: searchParams.childrens,
                rooms: searchParams.rooms,
              }}
              onChange={(travelers) => {
                updateSearchParam("adults", travelers.adults);
                updateSearchParam("childrens", travelers.childrens);
                updateSearchParam("rooms", travelers.rooms);
              }}
            />
          </div>

          {/* Search Button */}
          <div className="flex-1 md:flex-none">
            <button
              onClick={handleSearch}
              disabled={isLoading || !searchParams.location || !searchParams.checkIn || !searchParams.checkOut}
              className={`
                w-full md:w-auto flex items-center justify-center gap-3 bg-green px-6 py-4 
                rounded-xl text-white font-medium hover:bg-darkGreen transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-md hover:shadow-lg
              `}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="small" color="white" />
                  Searching...
                </>
              ) : (
                <>
                  <img
                    src="/assets/search.svg"
                    alt="search stay"
                    className="w-5 h-5"
                  />
                  Search Stays
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <Filter 
              onFiltersChange={handleFiltersChange}
              currentFilters={filters}
            />
          </aside>

          {/* Results Section */}
          <main className="lg:w-3/4">
            {/* Tabs */}
            <SearchTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Filters Bar */}
            <div className="mt-6 bg-gray-50 px-5 py-4 rounded-xl shadow-sm">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                {/* Results Info */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-medium text-darkBlue">
                    {isLoading ? (
                      "Searching properties..."
                    ) : (
                      <>
                        {totalResults} propert{totalResults === 1 ? "y" : "ies"} found
                        {activeFilterChips.length > 0 && (
                          <span className="text-gray-600">
                            {" "}• {activeFilterChips.length} filter{activeFilterChips.length > 1 ? "s" : ""} applied
                          </span>
                        )}
                      </>
                    )}
                  </h4>
                  
                  {/* Filter Chips */}
                  {activeFilterChips.length > 0 && (
                    <FilterChips
                      chips={activeFilterChips}
                      onRemove={removeFilter}
                      onRemoveAll={removeAllFilters}
                    />
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="lg:self-start">
                  <SortDropdown
                    value={sortBy}
                    onChange={handleSortChange}
                  />
                </div>
              </div>
            </div>

            {/* Error State */}
            {error && !isLoading && (
              <ErrorMessage 
                message={error}
                onRetry={fetchProperties}
                className="mt-6"
              />
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <LoadingSpinner size="large" />
                  <p className="mt-4 text-darkBlue">Finding the best properties for you...</p>
                </div>
              </div>
            )}

            {/* Results */}
            {!isLoading && !error && (
              <>
                {properties.length > 0 ? (
                  <>
                    <div className="mt-6">
                      <Result 
                        properties={properties}
                        filters={filters}
                        sortBy={sortBy}
                      />
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="mt-10 text-center py-12">
<h3 className="text-sm text-gray-400">No Result Found.</h3>
                    {activeFilterChips.length > 0 && (
                      <button
                        onClick={removeAllFilters}
                        className="mt-4 px-6 py-2 bg-green text-white rounded-lg hover:bg-darkGreen transition-colors"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Search;