import React from "react";
import { Star, MapPin, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, checkIn, checkOut, adults, childrens, rooms }) => {
  // Helper function to format price
  const formatPrice = (price) => {
    if (!price) return "₹0";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const navigate = useNavigate()

  // Calculate total price (price per night × nights)
  const calculateTotalPrice = () => {
    const pricePerNight = property.basePrice || property.pricePerNight || 0;
    if (!pricePerNight) return "₹0";
    
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const total = pricePerNight * nights;
      return formatPrice(total);
    }
    
    // If no dates, just show per night price
    return `${formatPrice(pricePerNight)} per night`;
  };

  // Format rating
  const formatRating = (rating) => {
    if (!rating) return "N/A";
    return rating.toFixed(1);
  };

  // Get location string safely
  const getLocationString = () => {
    // Try to get from address first
    if (property.address) {
      if (typeof property.address === 'string') {
        return property.address;
      }
      if (property.address.fullAddress) {
        return property.address.fullAddress;
      }
    }
    
    // Try to get from location object
    if (property.location) {
      if (typeof property.location === 'string') {
        return property.location;
      }
      // If it's an object with coordinates, return a generic message
      if (property.location.latitude && property.location.longitude) {
        return "📍 Location available";
      }
    }
    
    // Fallback
    return "Location not specified";
  };

  // Get amenities safely
  const getAmenities = () => {
    if (Array.isArray(property.amenities)) {
      return property.amenities;
    }
    if (Array.isArray(property.amenties)) { // Handle typo in API
      return property.amenties;
    }
    return [];
  };

  // Get property title
  const getPropertyTitle = () => {
    if (property.name) {
      return property.name;
    }
    if (property.title) {
      return property.title;
    }
    // Create title from type and location
    const type = property.type ? property.type.charAt(0).toUpperCase() + property.type.slice(1) : 'Property';
    return `${type} in ${getLocationString()}`;
  };

  // Get image URL
  const getImageUrl = () => {
    if (property.coverImage) {
      return property.coverImage;
    }
    if (property.imageUrl) {
      return property.imageUrl;
    }
    if (property.images && property.images.length > 0) {
      return property.images[0];
    }
    return "/assets/search/result.png";
  };




  const handleCardClick = () => {
    navigate(`/booking/${property._id}`, {
      state: {
        property,
        checkIn,
        checkOut,
        adults,
        childrens,
        rooms
      }
    });
  };



  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden border mb-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
     onClick={() => {
                  handleCardClick();
                }}
    >
      {/* Property Image */}
      <div className="md:w-1/3">
        <img
          src={getImageUrl()}
          alt={getPropertyTitle()}
          className="w-full object-cover aspect-square h-[250px]"
          onError={(e) => {
            e.target.src = "/assets/search/result.png";
          }}
        />
      </div>

      {/* Property Details */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        {/* Top Section: Title, Location, Rating */}
        <div>
          <h2 className="text-xl font-semibold text-darkBlue hover:text-blue cursor-pointer">
            {getPropertyTitle()}
          </h2>
          
          <div className="flex items-center mt-1 text-gray-600">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">
              {getLocationString()}
            </span>
          </div>

          {/* Amenities */}
          {getAmenities().length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {getAmenities().slice(0, 5).map((amenity, index) => (
                  <span 
                    key={index} 
                    className="flex items-center text-sm bg-gray-50 px-3 py-1 rounded-full"
                  >
                    <Check className="w-3 h-3 text-green-600 mr-1 flex-shrink-0" />
                    <span className="truncate">{typeof amenity === 'object' ? amenity.name : amenity}</span>
                  </span>
                ))}
                {getAmenities().length > 5 && (
                  <span className="text-sm text-blue cursor-pointer hover:underline">
                    +{getAmenities().length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Property Description */}
          {/* {property.description && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {property.description}
            </p>
          )} */}
        </div>

        {/* Bottom Section: Price and Action */}
        <div className="pt-4 border-t">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Property Features */}
            <div className="mt-auto">
              {/* Capacity */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {property.capacity?.adults && (
                  <div className="flex items-center gap-1">
                    <span>👤</span>
                    <span>{property.capacity.adults} adults</span>
                  </div>
                )}
                {property.capacity?.childrens > 0 && (
                  <div className="flex items-center gap-1">
                    <span>👶</span>
                    <span>{property.capacity.childrens} children</span>
                  </div>
                )}
                {property.noOfRooms && (
                  <div className="flex items-center gap-1">
                    <span>🛏️</span>
                    <span>{property.noOfRooms} rooms</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price and Book Button */}
            <div className="text-right">
              <div className="text-2xl font-bold text-darkBlue">
                {formatPrice(property.basePrice || property.pricePerNight || property.price)}
                <span className="text-sm font-normal text-gray-600">/night</span>
              </div>
              
              <div className="text-sm text-gray-600 mt-1">
                Total: {calculateTotalPrice()}
                {checkIn && checkOut && (
                  <span className="text-xs text-gray-500 block">
                    Includes taxes & fees
                  </span>
                )}
              </div>
              
              {/* <button 
                onClick={() => {
                  // Navigate to property detail page or open booking modal
                  console.log("Book property:", property._id);
                  // You can use navigate hook here
                  // navigate(`/property/${property._id}`);
                }}
                className="mt-4 w-full md:w-auto bg-green hover:bg-darkGreen text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              >
                View Details
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;