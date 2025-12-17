import Hotels from "../common/Hotels";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getProperties, getRandomProperties } from "../../services";

const Recommended = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedProperties();
  }, [selectedCategory]);

  const fetchRecommendedProperties = async () => {
    setIsLoading(true);
    try {
      let response;
      
      if (selectedCategory === "All") {
        // Use random properties for "All" category - get top 5
        response = await getRandomProperties({ limit: 5 });
      } else {
        // Use filtered properties for specific category - get top 5
        const params = {
          page: 1,
          limit: 5,
          sortBy: 'recommended',
          whereTo: selectedCategory
        };
        response = await getProperties(params);
      }
      
      if (response.data?.success) {
        // Handle both response structures: properties array or direct data
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
      console.error("Error fetching recommended properties:", err);
      // Keep default hotels on error
    } finally {
      setIsLoading(false);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const hotelsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="mt-10 mb-8" variants={titleVariants}>
        <motion.h2 
          className="font-semibold text-3xl text-darkBlue"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Recommended stays for you
        </motion.h2>
        <motion.h4 
          className="text-darkBlue"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Based on your most recently viewed property
        </motion.h4>
      </motion.div>

      <motion.div 
        className="hotel-categories flex flex-wrap gap-3 my-6"
        variants={categoryVariants}
      >
        {["All", "Lonavala", "Alibaug", "Karjat"].map((category, index) => (
          <motion.button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-btn px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 text-base sm:text-lg font-medium ${
              selectedCategory === category
                ? "bg-blue/20 text-blue border-2 border-blue hover:bg-blue/30 active:bg-blue/40"
                : "text-gray-700 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div variants={hotelsVariants}>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-500">Loading properties...</div>
          </div>
        ) : hotels.length > 0 ? (
          <Hotels hotels={hotels}/>
        ) : (
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-500">No properties found</div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Recommended;
