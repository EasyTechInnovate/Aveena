import React from "react";
import { Star } from "lucide-react";
import PropertyCard from "./PropertyCard";

const Result = ({ filters, sortBy, properties = [] }) => {
  // Filter properties based on applied filters (if needed client-side)
  const filteredProperties = properties.filter(property => {
    // If you want to do client-side filtering in addition to server-side
    // Add your client-side filtering logic here
    
    // Example: Property search filter (if not already done server-side)
    if (filters?.propertySearch && 
        property.title && 
        !property.title.toLowerCase().includes(filters.propertySearch.toLowerCase())) {
      return false;
    }

    // Example: Price range filter (if not already done server-side)
    if (filters?.priceRange && property.price) {
      const propertyPrice = parseFloat(property.price);
      if (propertyPrice < filters.priceRange.min || propertyPrice > filters.priceRange.max) {
        return false;
      }
    }

    return true;
  });

  // Sort properties (if needed client-side)
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (!sortBy) return 0;
    
    const priceA = a.basePrice || a.pricePerNight || a.price || 0;
    const priceB = b.basePrice || b.pricePerNight || b.price || 0;
    
    switch (sortBy) {
      case "price-low":
        return priceA - priceB;
      case "price-high":
        return priceB - priceA;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "recommended":
      default:
        return 0;
    }
  });

  if (sortedProperties.length === 0) {
    return (
      <div className="my-6">
        <div className="p-6 flex flex-col items-center justify-center text-center">
          <div className="text-gray-400 text-6xl mb-4">🏨</div>
          <h3 className="text-xl font-semibold text-darkBlue mb-2">
            No properties found
          </h3>
          <p className="text-gray-600 max-w-md">
            Try adjusting your search filters or dates to find available properties
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
            <p className="font-medium mb-1">Search tips:</p>
            <ul className="list-disc list-inside text-left">
              <li>Try different dates</li>
              <li>Check nearby locations</li>
              <li>Adjust your budget range</li>
              <li>Clear some filters</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6">
      {sortedProperties.map((property) => (
        <PropertyCard 
          key={property._id || property.id} 
          property={property}
          checkIn={filters?.checkIn}
          checkOut={filters?.checkOut}
          adults={filters?.adults}
          childrens={filters?.childrens}
          rooms={filters?.rooms}
        />
      ))}
    </div>
  );
};

export default Result;