import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomeSection from "../components/booking/HomeSection";
import BookingOverview from "../components/booking/BookingOverview";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { getPropertyById } from "../services";

function BookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize booking info from navigation state
  const bookingState = location.state || {};
  const [bookingInfo, setBookingInfo] = useState({
    checkIn: bookingState.checkIn || "",
    checkOut: bookingState.checkOut || "",
    adults: bookingState.adults || 2,
    childrens: bookingState.childrens || 0,
    rooms: bookingState.rooms || 1,
  });

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setError("Property ID is required");
        setIsLoading(false);
        navigate("/search");
        return;
      }

      setIsLoading(true);
      try {
        const response = await getPropertyById(id);
        
        if (response.data?.success) {
          setProperty(response.data.data);
          console.log(response.data.data)
        } else {
          throw new Error("Failed to fetch property details");
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err.message || "Unable to load property");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  const handleBookingInfoChange = (newInfo) => {
    setBookingInfo(newInfo);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ErrorMessage 
            message={error}
            onRetry={() => window.location.reload()}
          />
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/search")}
              className="px-6 py-2 bg-green text-white rounded-lg hover:bg-darkGreen transition-colors"
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Property not found
  if (!property) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-semibold text-darkBlue mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/search")}
            className="px-6 py-2 bg-green text-white rounded-lg hover:bg-darkGreen transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto pt-20 max-w-7xl px-4"
    >
      <motion.div variants={sectionVariants}>
        <HomeSection 
          property={property}
          bookingInfo={bookingInfo}
        />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <BookingOverview 
          property={property}
          bookingInfo={bookingInfo}
          onBookingInfoChange={handleBookingInfoChange}
        />
      </motion.div>
    </motion.div>
  );
}

export default BookingPage;