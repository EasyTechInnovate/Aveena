import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Result from "../components/search/Result";
import LocationSelector from "../components/common/LocationSelector";
import DatePicker from "../components/common/DatePicker";
import TravelerSelector from "../components/common/TravelerSelector";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import FilterChips from "../components/search/FilterChips";
import SortDropdown from "../components/search/SortDropdown";
import Pagination from "../components/common/Pagination";

import { getFilteredProperties } from "../services";

/* -------------------------------- helpers -------------------------------- */

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

const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });
  return query.toString();
};

const mapSortByToAPI = (sortBy) => {
  const map = {
    "price-low": "price_low_to_high",
    "price-high": "price_high_to_low",
    recommended: "recommended",
    rating: "recommended",
    distance: "recommended",
  };
  return map[sortBy] || "recommended";
};

const DEFAULT_FILTERS = {
  propertySearch: "",
};

/* -------------------------------- component -------------------------------- */

const Search = () => {
  const locationHook = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    childrens: 0,
    rooms: 1,
  });

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("recommended");

  /* ---------------------------- sync URL params ---------------------------- */

  useEffect(() => {
    const parsed = parseUrlParams(locationHook.search);
    setSearchParams((prev) => ({ ...prev, ...parsed }));
    setCurrentPage(parsed.page);
  }, [locationHook.search]);

  /* ----------------------------- fetch properties ---------------------------- */

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
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

      if (filters.propertySearch) {
        apiParams.search = filters.propertySearch;
      }

      const response = await getFilteredProperties(apiParams);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to fetch properties");
      }

      const data = response.data.data;

      setProperties(data.properties || []);
      setTotalResults(data.pagination?.total || 0);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setProperties([]);
      setTotalResults(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, currentPage, sortBy, filters.propertySearch]);

  /* --------------------------- trigger fetch logic --------------------------- */

  useEffect(() => {
    if (searchParams.location && searchParams.checkIn && searchParams.checkOut) {
      fetchProperties();
    }
  }, [
    searchParams.location,
    searchParams.checkIn,
    searchParams.checkOut,
    currentPage,
    sortBy,
    filters.propertySearch,
  ]);

  /* -------------------------------- handlers -------------------------------- */

  const handleSearch = () => {
    if (!searchParams.location || !searchParams.checkIn || !searchParams.checkOut) {
      alert("Please fill all required fields");
      return;
    }

    setCurrentPage(1);

    const query = buildQueryString({
      location: searchParams.location,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      adults: searchParams.adults,
      childrens: searchParams.childrens,
      rooms: searchParams.rooms,
      page: 1,
    });

    navigate(`/search?${query}`, { replace: true });
    setFilters(DEFAULT_FILTERS);
  };

  const updateSearchParam = (key, value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

    const query = buildQueryString({
      ...searchParams,
      page,
    });

    navigate(`/search?${query}`, { replace: true });
  };

  const activeFilterChips = filters.propertySearch
    ? [
        {
          key: "propertySearch",
          label: `Search: ${filters.propertySearch}`,
        },
      ]
    : [];

  /* ---------------------------------- UI ---------------------------------- */

  return (
    <>
      {/* Search Header */}
      <div className="bg-cover bg-center p-6 pt-28 bg-[url('/assets/search/herobg.png')]">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl p-6 flex flex-col md:flex-row gap-4 shadow-lg">
          <LocationSelector
            value={searchParams.location}
            onChange={(v) => updateSearchParam("location", v)}
          />

          <DatePicker
            value={{
              checkIn: searchParams.checkIn,
              checkOut: searchParams.checkOut,
            }}
            onChange={(d) => {
              updateSearchParam("checkIn", d.checkIn);
              updateSearchParam("checkOut", d.checkOut);
            }}
          />

          <TravelerSelector
            value={{
              adults: searchParams.adults,
              childrens: searchParams.childrens,
              rooms: searchParams.rooms,
            }}
            onChange={(v) => {
              updateSearchParam("adults", v.adults);
              updateSearchParam("childrens", v.childrens);
              updateSearchParam("rooms", v.rooms);
            }}
          />

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-green text-white px-6 py-4 rounded-xl hover:bg-darkGreen"
          >
            {isLoading ? "Searching..." : "Search Stays"}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gray-50 p-4 rounded-xl mb-6 flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            value={filters.propertySearch}
            onChange={(e) =>
              setFilters({ propertySearch: e.target.value })
            }
            placeholder="Search by property name"
            className="border rounded-full px-4 py-2 text-sm w-full md:w-1/2"
          />

          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {activeFilterChips.length > 0 && (
          <FilterChips
            chips={activeFilterChips}
            onRemove={() => setFilters(DEFAULT_FILTERS)}
            onRemoveAll={() => setFilters(DEFAULT_FILTERS)}
          />
        )}

        {error && <ErrorMessage message={error} onRetry={fetchProperties} />}

        {isLoading && (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="large" />
          </div>
        )}

        {!isLoading && !error && (
          <>
            {properties.length > 0 ? (
              <>
                <Result properties={properties} />
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <p className="text-center text-gray-400 py-20">
                No properties found
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
