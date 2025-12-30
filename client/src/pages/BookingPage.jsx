// client\src\pages\BookingPage.jsx
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

  const urlParams = new URLSearchParams(location.search);
  const bookingState = location.state || {};
  
  const [bookingInfo, setBookingInfo] = useState({
    checkIn: urlParams.get('checkIn') || bookingState.checkIn || "",
    checkOut: urlParams.get('checkOut') || bookingState.checkOut || "",
    adults: parseInt(urlParams.get('adults')) || bookingState.adults || 2,
    childrens: parseInt(urlParams.get('childrens')) || bookingState.childrens || 0,
    rooms: parseInt(urlParams.get('rooms')) || bookingState.rooms || 1,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      if (bookingInfo.checkIn) params.set('checkIn', bookingInfo.checkIn);
      if (bookingInfo.checkOut) params.set('checkOut', bookingInfo.checkOut);
      if (bookingInfo.adults) params.set('adults', bookingInfo.adults.toString());
      if (bookingInfo.childrens) params.set('childrens', bookingInfo.childrens.toString());
      if (bookingInfo.rooms) params.set('rooms', bookingInfo.rooms.toString());
      
      const queryString = params.toString();
      const newUrl = `/booking/${id}${queryString ? `?${queryString}` : ''}`;
      window.history.replaceState({}, '', newUrl);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [bookingInfo, id]);

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  if (isLoading) return <div className="min-h-screen pt-20 flex items-center justify-center"><LoadingSpinner size="large" /></div>;

  if (error || !property) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <ErrorMessage message={error || "Property not found"} onRetry={() => window.location.reload()} />
        <button onClick={() => navigate("/search")} className="mt-4 px-6 py-2 bg-green text-white rounded-lg">Back to Search</button>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // Added `overflow-hidden` to prevent horizontal scroll issues on mobile
      className="mx-auto pt-20 max-w-7xl px-4 md:px-6 lg:px-8 pb-10 w-full overflow-x-hidden"
    >
      <HomeSection property={property} bookingInfo={bookingInfo} />
      <BookingOverview property={property} bookingInfo={bookingInfo} onBookingInfoChange={handleBookingInfoChange} />
    </motion.div>
  );
}

export default BookingPage;