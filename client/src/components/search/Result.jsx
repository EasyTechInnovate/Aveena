import React, { useState } from "react";
import { Star } from "lucide-react";

// Hotel data
const allHotels = [
  {
    id: 1,
    title: "UDS Villa - Next to VFS, Walking to Connaught Place",
    location: "New Delhi",
    rating: 4.6,
    reviews: 63,
    image: "/assets/search/result.png",
    discount: "We have 5 left at 21% off",
    refundable: "Fully refundable",
    oldPrice: "₹7200",
    newPrice: "₹6,688",
    totalPrice: "₹12,471",
    amenities: [
      { icon: "/assets/search/cup.svg", label: "Breakfast included" },
      { icon: "/assets/search/pool.svg", label: "Private Pool" },
      { icon: "/assets/search/lawn.svg", label: "Lawn" },
      { icon: "/assets/search/wifi.svg", label: "WiFi" },
      { icon: "/assets/search/bar.svg", label: "Bar" },
      { icon: "/assets/search/dining.svg", label: "Alfresco Dining" },
    ],
    moreAmenities: "+21 Amenities",
  },
  {
    id: 2,
    title: "Grand Palace Hotel - Luxury Stay in Mumbai",
    location: "Mumbai",
    rating: 4.8,
    reviews: 127,
    image: "/assets/search/result.png",
    discount: "We have 3 left at 15% off",
    refundable: "Fully refundable",
    oldPrice: "₹8500",
    newPrice: "₹7,225",
    totalPrice: "₹14,450",
    amenities: [
      { icon: "/assets/search/cup.svg", label: "Breakfast included" },
      { icon: "/assets/search/spa.svg", label: "Spa & Wellness" },
      { icon: "/assets/search/wifi.svg", label: "Free WiFi" },
      { icon: "/assets/search/bar.svg", label: "Rooftop Bar" },
      { icon: "/assets/search/dining.svg", label: "Fine Dining" },
    ],
    moreAmenities: "+18 Amenities",
  },
  {
    id: 3,
    title: "Beach Resort Goa - Ocean View Rooms",
    location: "Goa",
    rating: 4.4,
    reviews: 89,
    image: "/assets/search/result.png",
    discount: "We have 8 left at 25% off",
    refundable: "Fully refundable",
    oldPrice: "₹6200",
    newPrice: "₹4,650",
    totalPrice: "₹9,300",
    amenities: [
      { icon: "/assets/search/cup.svg", label: "Breakfast included" },
      { icon: "/assets/search/pool.svg", label: "Beach Access" },
      { icon: "/assets/search/lawn.svg", label: "Garden View" },
      { icon: "/assets/search/wifi.svg", label: "WiFi" },
      { icon: "/assets/search/bar.svg", label: "Beach Bar" },
    ],
    moreAmenities: "+15 Amenities",
  },
  {
    id: 4,
    title: "Heritage Hotel Jaipur - Royal Experience",
    location: "Jaipur",
    rating: 4.7,
    reviews: 156,
    image: "/assets/search/result.png",
    discount: "We have 2 left at 30% off",
    refundable: "Fully refundable",
    oldPrice: "₹9500",
    newPrice: "₹6,650",
    totalPrice: "₹13,300",
    amenities: [
      { icon: "/assets/search/cup.svg", label: "Breakfast included" },
      { icon: "/assets/search/spa.svg", label: "Ayurvedic Spa" },
      { icon: "/assets/search/lawn.svg", label: "Palace Garden" },
      { icon: "/assets/search/wifi.svg", label: "WiFi" },
      { icon: "/assets/search/dining.svg", label: "Royal Dining" },
    ],
    moreAmenities: "+22 Amenities",
  },
  {
    id: 5,
    title: "Mountain View Resort - Shimla Hills",
    location: "Shimla",
    rating: 4.5,
    reviews: 94,
    image: "/assets/search/result.png",
    discount: "We have 6 left at 20% off",
    refundable: "Fully refundable",
    oldPrice: "₹5800",
    newPrice: "₹4,640",
    totalPrice: "₹9,280",
    amenities: [
      { icon: "/assets/search/cup.svg", label: "Breakfast included" },
      { icon: "/assets/search/lawn.svg", label: "Mountain View" },
      { icon: "/assets/search/wifi.svg", label: "WiFi" },
      { icon: "/assets/search/bar.svg", label: "Fireplace Bar" },
      { icon: "/assets/search/dining.svg", label: "Local Cuisine" },
    ],
    moreAmenities: "+12 Amenities",
  },
  {
    id: 6,
    title: "Business Hotel Bangalore - City Center",
    location: "Bangalore",
    rating: 4.3,
    reviews: 78,
    image: "/assets/search/result.png",
    discount: "We have 4 left at 18% off",
    refundable: "Fully refundable",
    oldPrice: "₹6800",
    newPrice: "₹5,576",
    totalPrice: "₹11,152",
    amenities: [
      { icon: "/assets/search/cup.svg", label: "Breakfast included" },
      { icon: "/assets/search/wifi.svg", label: "High-speed WiFi" },
      { icon: "/assets/search/bar.svg", label: "Business Center" },
      { icon: "/assets/search/dining.svg", label: "Conference Room" },
    ],
    moreAmenities: "+16 Amenities",
  },
  {
    id: 7,
    title: "Lakeside Resort - Udaipur Palace View",
    location: "Udaipur",
    rating: 4.9,
    reviews: 203,
    image: "/assets/search/result.png",
    discount: "We have 1 left at 35% off",
    refundable: "Fully refundable",
    oldPrice: "₹12000",
    newPrice: "₹7,800",
    totalPrice: "₹15,600",
    amenities: [
      { icon: "/assets/search/cup.svg", label: "Breakfast included" },
      { icon: "/assets/search/pool.svg", label: "Lake View Pool" },
      { icon: "/assets/search/spa.svg", label: "Luxury Spa" },
      { icon: "/assets/search/wifi.svg", label: "WiFi" },
      { icon: "/assets/search/bar.svg", label: "Lake Bar" },
      { icon: "/assets/search/dining.svg", label: "Palace Dining" },
    ],
    moreAmenities: "+25 Amenities",
  },
  {
    id: 8,
    title: "Desert Camp - Jaisalmer Experience",
    location: "Jaisalmer",
    rating: 4.2,
    reviews: 67,
    image: "/assets/search/result.png",
    discount: "We have 7 left at 22% off",
    refundable: "Fully refundable",
    oldPrice: "₹4500",
    newPrice: "₹3,510",
    totalPrice: "₹7,020",
    amenities: [
      { icon: "/assets/search/cup.svg", label: "Breakfast included" },
      { icon: "/assets/search/lawn.svg", label: "Desert View" },
      { icon: "/assets/search/wifi.svg", label: "WiFi" },
      { icon: "/assets/search/bar.svg", label: "Cultural Show" },
      { icon: "/assets/search/dining.svg", label: "Traditional Food" },
    ],
    moreAmenities: "+10 Amenities",
  },
];

const Result = ({ filters, sortBy }) => {
  const [visibleHotels, setVisibleHotels] = useState(3);

  // Filter hotels based on applied filters
  const filteredHotels = allHotels.filter(hotel => {
    // Price range filter
    const hotelPrice = parseInt(hotel.newPrice.replace(/[₹,]/g, ''));
    if (hotelPrice < filters.priceRange.min || hotelPrice > filters.priceRange.max) {
      return false;
    }

    // Property search filter
    if (filters.propertySearch && !hotel.title.toLowerCase().includes(filters.propertySearch.toLowerCase())) {
      return false;
    }

    // Location filter
    if (filters.selectedFilters.cities && filters.selectedFilters.cities.length > 0) {
      const hotelLocation = hotel.location.toLowerCase();
      const hasMatchingCity = filters.selectedFilters.cities.some(city => 
        hotelLocation.includes(city.toLowerCase().split(' ')[0])
      );
      if (!hasMatchingCity) return false;
    }

    // Property type filter
    if (filters.selectedFilters.propertyType && filters.selectedFilters.propertyType.length > 0) {
      const hotelTitle = hotel.title.toLowerCase();
      const hasMatchingType = filters.selectedFilters.propertyType.some(type => 
        hotelTitle.includes(type.toLowerCase())
      );
      if (!hasMatchingType) return false;
    }

    // Amenities filter
    if (filters.selectedFilters.amenities && filters.selectedFilters.amenities.length > 0) {
      const hotelAmenities = hotel.amenities.map(a => a.label.toLowerCase());
      const hasMatchingAmenity = filters.selectedFilters.amenities.some(amenity => 
        hotelAmenities.some(hotelAmenity => hotelAmenity.includes(amenity.toLowerCase()))
      );
      if (!hasMatchingAmenity) return false;
    }

    // Star rating filter
    if (filters.selectedFilters.starRating && filters.selectedFilters.starRating.length > 0) {
      const hotelRating = Math.floor(hotel.rating);
      const hasMatchingRating = filters.selectedFilters.starRating.some(rating => {
        const ratingNum = parseInt(rating.split(' ')[0]);
        return hotelRating >= ratingNum;
      });
      if (!hasMatchingRating) return false;
    }

    return true;
  });

  // Sort filtered hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.newPrice.replace(/[₹,]/g, '')) - parseInt(b.newPrice.replace(/[₹,]/g, ''));
      case "price-high":
        return parseInt(b.newPrice.replace(/[₹,]/g, '')) - parseInt(a.newPrice.replace(/[₹,]/g, ''));
      case "rating":
        return b.rating - a.rating;
      case "distance":
        // For demo purposes, sort by title alphabetically as distance proxy
        return a.title.localeCompare(b.title);
      case "recommended":
      default:
        // Keep original order for recommended
        return 0;
    }
  });

  const hotelsToShow = sortedHotels.slice(0, visibleHotels);
  const hasMoreHotels = visibleHotels < sortedHotels.length;

  const loadMoreHotels = () => {
    setVisibleHotels(prev => Math.min(prev + 3, sortedHotels.length));
  };

  // Reset visible hotels when filters or sort change
  React.useEffect(() => {
    setVisibleHotels(3);
  }, [filters, sortBy]);

  return (
    <div className="my-6">
      {hotelsToShow.map((hotel) => (
        <div
          key={hotel.id}
          className="flex bg-white rounded-2xl shadow-md overflow-hidden border mb-6"
        >
          {/* Left Image */}
          <div className="flex-1">
            <img
              src={hotel.image}
              alt={hotel.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="flex-[2] p-6 flex flex-col justify-between">
            {/* Title + Location */}
            <div>
              <h1 className="text-lg font-semibold">{hotel.title}</h1>
              <p className="text-gray-500 text-sm">{hotel.location}</p>

              {/* Rating + Reviews */}
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-[#F2994A] fill-[#F2994A]" />
                <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                <span className="text-gray-400">/5</span>
                <a href="#" className="ml-2 text-sm text-blue underline">
                  {hotel.reviews} Reviews
                </a>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
                {hotel.amenities.map((item, index) => (
                  <span key={index} className="flex items-center gap-1">
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    {item.label}
                  </span>
                ))}
                <a href="#" className="text-blue underline">
                  {hotel.moreAmenities}
                </a>
              </div>
            </div>

            {/* Price Section */}
            <div className="mt-6">
              <div className="flex items-end justify-between mt-3">
                <div>
                  <div className="bg-green text-white px-3 py-1 rounded-md inline-block text-sm font-medium">
                    {hotel.discount}
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    {hotel.refundable}
                  </p>
                </div>

                <div className="text-right">
                  <span className="line-through text-sm mr-2">
                    {hotel.oldPrice}
                  </span>
                  <span className="text-2xl font-medium text-darkBlue">
                    {hotel.newPrice}
                  </span>
                  <p className="text-sm font-medium">{hotel.totalPrice} <span className="font-normal">Total includes taxes & fees</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}


      {sortedHotels.length === 0 && (
        <div className="p-6 flex items-center mt-4 justify-center">
          <p className="text-gray-500 text-lg">
            No hotels found matching your filters
          </p>
        </div>
      )}

      {hasMoreHotels && sortedHotels.length > 0 && (
        <div className="p-6 flex items-center mt-4 justify-center">
          <button 
            onClick={loadMoreHotels}
            className="text-blue py-3 px-8 border border-blue rounded-full hover:bg-blue hover:text-white transition-colors font-medium"
          >
            Load More Hotels ({sortedHotels.length - visibleHotels} remaining)
          </button>
        </div>
      )}
      
      {!hasMoreHotels && visibleHotels > 3 && sortedHotels.length > 0 && (
        <div className="p-6 flex items-center mt-4 justify-center">
          <p className="text-gray-500 text-sm">
            All {sortedHotels.length} hotels loaded
          </p>
        </div>
      )}
    </div>
  );
};

export default Result;
