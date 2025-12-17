import React, { useState, useEffect } from "react";
import Hotels from "../common/Hotels";
import { getRandomProperties } from "../../services";

const Deals = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDealProperties();
  }, []);

  const fetchDealProperties = async () => {
    setIsLoading(true);
    try {
      // Get top 5 random properties for last-minute weekend deals
      const response = await getRandomProperties({ limit: 5 });
      
      if (response.data?.success) {
        const properties = response.data.data.properties || response.data.data || [];
        const formattedHotels = properties.map(prop => ({
          _id: prop._id,
          name: prop.name || "Property",
          address: prop.address?.fullAddress || prop.address?.city || prop.address || "Location",
          image: prop.coverImage || prop.images?.[0] || "/assets/hotels/Pranaam.png",
          maxGuests: prop.capacity?.adults || 15,
          category: prop.address?.city || prop.address?.fullAddress?.split(',')[0] || "Location",
          rooms: prop.noOfRooms || 1,
          baths: prop.noOfBaths || prop.noOfRooms || 1,
          perNight: (prop.basePrice || 0).toLocaleString('en-IN'),
          rating: prop.rating ? prop.rating.toFixed(1) : "0.0",
        }));
        setHotels(formattedHotels);
      }
    } catch (err) {
      console.error("Error fetching deal properties:", err);
      setHotels([]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto rounded-3xl relative overflow-hidden">
      <div className="absolute w-full h-full top-0 left-0 z-0">
        <img
          src="/assets/deal-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
<div
  className="w-full h-full relative z-2 px-6 py-16"
  style={{
    background: 'linear-gradient(357.04deg, #073536 1.9%, rgba(20, 153, 156, 0) 161.23%)',
  }}
>
  <h2 className="text-4xl font-semibold text-white">Last-minute weekend deals</h2>
  <p className="text-xl font-normal text-white mt-2 mb-10">Based on your most recently viewed property</p>
  {isLoading ? (
    <div className="flex justify-center items-center py-10">
      <div className="text-white">Loading deals...</div>
    </div>
  ) : hotels.length > 0 ? (
    <Hotels hotels={hotels} />
  ) : (
    <div className="flex justify-center items-center py-10">
      <div className="text-white">No deals available at the moment</div>
    </div>
  )}
</div>

    </div>
  );
};

export default Deals;
