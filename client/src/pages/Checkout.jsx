// client/src/pages/Checkout.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking, getPropertyById } from "../services";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, user } = useAuth();

  const urlParams = new URLSearchParams(location.search);
  const bookingState = location.state || {};

  // 1. Optimized Data Extraction
  const bookingData = useMemo(() => {
    // Extract Query Params (Fallback)
    const qCheckIn = urlParams.get("checkIn");
    const qCheckOut = urlParams.get("checkOut");
    const qAdults = urlParams.get("adults");
    const qChildrens = urlParams.get("childrens");
    const qRooms = urlParams.get("rooms");
    const qPropId = urlParams.get("propertyId");
    const propertyImage = urlParams.get("propertyImage");

    // prioritize state, fallback to query params
    const checkIn = bookingState.checkIn || qCheckIn || "";
    const checkOut = bookingState.checkOut || qCheckOut || "";
    const adults = parseInt(bookingState.adults || qAdults || 2);
    const childrens = parseInt(bookingState.childrens || qChildrens || 0);
    const rooms = parseInt(bookingState.rooms || qRooms || 1);
    
    // Calculate Nights
    let nights = bookingState.nights;
    if (!nights && checkIn && checkOut) {
      const diff = new Date(checkOut) - new Date(checkIn);
      nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    if (!nights || nights < 1) nights = 1;

    // Extract Property Details
    // Note: Sender spreads property data into state, so we look at root of bookingState
    const propertyId = bookingState._id || qPropId || "";
    const propertyName = bookingState.name || bookingState.title || "Property Name Unavailable";
    
    // Handle Location (could be string or object)
    let propertyLocation = "Location Unavailable";
    if (bookingState.location) {
        propertyLocation = typeof bookingState.location === 'string' 
            ? bookingState.location 
            : bookingState.location.address || bookingState.location.city || "";
    }

    return {
      propertyId,
      // If state has ID, assume state constitutes the "property object"
      propertyObject: bookingState._id ? bookingState : null, 
      propertyName,
      propertyLocation,
      propertyImage,
      checkIn,
      checkOut,
      adults,
      childrens,
      rooms,
      nights,
    };
  }, [location.search, location.state]);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [pricing, setPricing] = useState({
    base: 0,
    taxes: 0,
    discount: 0,
    total: 0,
  });
  
  // Store full property object (for API calls or deep access)
  const [property, setProperty] = useState(bookingData.propertyObject);

  // 2. Logic & Pricing Effect
  useEffect(() => {
    // Auth Check
    if (!isAuth) {
      navigate("/");
      return;
    }

    // Profile Check
    if (user && !user.isProfileComplete) {
      alert("Please complete your profile before proceeding with checkout.");
      navigate("/account");
      return;
    }

    // Basic Validation
    if (!bookingData.checkIn || !bookingData.checkOut) {
      navigate("/");
      return;
    }

    const calculatePricing = (propData) => {
      if (!propData) return;
      
      const pricePerNight = propData.basePrice || propData.price || 0;
      const base = pricePerNight * bookingData.nights * bookingData.rooms;
      const taxes = base * 0.18; // 18% Tax
      const total = base + taxes;

      setPricing({
        base,
        taxes,
        discount: 0,
        total,
      });
    };

    // Scenario A: Data came from State (User clicked Reserve)
    if (bookingData.propertyObject) {
        setProperty(bookingData.propertyObject);
        calculatePricing(bookingData.propertyObject);
    } 
    // Scenario B: Page Refresh (State lost, fetch using ID from URL)
    else if (bookingData.propertyId) {
        setIsProcessing(true); // Show loading state visually if you want
        getPropertyById(bookingData.propertyId)
        .then((response) => {
            if (response.data?.success) {
                const fetchedData = response.data.data;
                // Normalize: API might return { property: {...}, ... } or just {...}
                const actualProperty = fetchedData.property || fetchedData;
                
                setProperty(actualProperty);
                calculatePricing(actualProperty);
            }
        })
        .catch((err) => {
            console.error("Error fetching property:", err);
            setCouponError("Failed to load property details. Please try again.");
        })
        .finally(() => setIsProcessing(false));
    }
  }, [isAuth, navigate, user, bookingData]); // Removed specific props to avoid loops

  const handleContinue = async () => {
    if (!termsAccepted) return;

    setIsProcessing(true);
    setCouponError("");

    try {
      const bookingPayload = {
        propertyId: bookingData.propertyId,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
        adults: bookingData.adults,
        childrens: bookingData.childrens,
        noOfRooms: bookingData.rooms,
      };

      if (couponCode.trim()) {
        bookingPayload.couponCode = couponCode.trim().toUpperCase();
      }

      // Add Special Request if any
      if (specialRequests.trim()) {
          bookingPayload.specialRequests = specialRequests; 
      }

      let response;
      try {
        response = await createBooking(bookingPayload);
      } catch (err) {
        // Handle Coupon Failure Specifics
        const errMsg = err.response?.data?.message?.toLowerCase() || "";
        const isCouponError = errMsg.includes("coupon") || errMsg.includes("not found");

        if (couponCode.trim() && isCouponError) {
          delete bookingPayload.couponCode;
          setCouponError("Coupon invalid or not applicable. Creating booking without coupon.");
          
          // Retry without coupon
          response = await createBooking(bookingPayload);
        } else {
          throw err;
        }
      }

      if (response.data?.success) {
        const { payuUrl, params } = response.data.data;

        // Create hidden form for PayU
        const form = document.createElement("form");
        form.method = "POST";
        form.action = payuUrl;

        Object.keys(params).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = params[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error(response.data?.message || "Failed to create booking");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to complete booking process.";
      setCouponError(errorMessage);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      {/* Header with Breadcrumbs */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
          <nav className="text-xs md:text-sm text-blue flex items-center whitespace-nowrap">
            <span>Home</span>
            <span className="mx-2 text-darkGray">&gt;</span>
            <span>Villas</span>
            <span className="mx-2 text-darkGray">&gt;</span>
            <span className="truncate max-w-[150px] md:max-w-xs">
              {bookingData.propertyName}
            </span>
            <span className="mx-2 text-darkGray">&gt;</span>
            <span className="text-gray-900 font-medium">Payment</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Information Card */}
            <div className="bg-white border rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex flex-col-reverse md:flex-row gap-6">
                <div className="flex-1">
                  <div className="border-b-2 pb-4 mb-4">
                    <h1 className="text-lg md:text-xl font-semibold mb-2 leading-tight">
                      {bookingData.propertyName}
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {bookingData.propertyLocation}
                    </p>
                  </div>

                  {/* Dates Section */}
                  <div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 md:py-4 gap-4 md:gap-0">
                      {/* Check In */}
                      <div className="flex flex-col gap-2 w-full md:w-auto">
                        <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                          Check in
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <img
                              src="/assets/checkout/date.svg"
                              alt="calendar"
                              className="w-6 md:w-8"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h3 className="font-semibold text-gray-900">
                              {bookingData.checkIn
                                ? new Date(
                                    bookingData.checkIn
                                  ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "Select Date"}
                            </h3>
                            <h5 className="text-xs text-gray-500">
                              (From 02:00 PM)
                            </h5>
                          </div>
                        </div>
                      </div>

                      {/* Nights Pill */}
                      <div className="self-start md:self-center flex items-center bg-darkGreen/10 border border-darkGreen/20 px-3 py-1 rounded-full text-xs md:text-sm text-darkGreen font-medium my-2 md:my-0">
                        <h5>
                          {bookingData.nights} Night{bookingData.nights > 1 ? "s" : ""}
                        </h5>
                      </div>

                      {/* Check Out */}
                      <div className="flex flex-col gap-2 w-full md:w-auto text-left md:text-right">
                        <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                          Check out
                        </h4>
                        <div className="flex items-center gap-3 md:flex-row-reverse">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <img
                              src="/assets/checkout/date.svg"
                              alt="calendar"
                              className="w-6 md:w-8"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h3 className="font-semibold text-gray-900">
                              {bookingData.checkOut
                                ? new Date(
                                    bookingData.checkOut
                                  ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "Select Date"}
                            </h3>
                            <h5 className="text-xs text-gray-500">
                              (Until 11:00 AM)
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Guests & Rooms Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 mt-6 pt-4 border-t border-gray-100">
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                        No. of Rooms
                      </h4>
                      <div className="flex items-center gap-3">
                        <img
                          src="/assets/checkout/rooms.svg"
                          alt="room"
                          className="w-6"
                        />
                        <h3 className="font-semibold text-gray-900">
                          {bookingData.rooms} Room
                          {bookingData.rooms > 1 ? "s" : ""}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                        Guests
                      </h4>
                      <div className="flex items-center gap-3">
                        <img
                          src="/assets/checkout/guests.svg"
                          alt="guests"
                          className="w-6"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {bookingData.adults + bookingData.childrens}{" "}
                            Guest
                            {bookingData.adults + bookingData.childrens > 1
                              ? "s"
                              : ""}
                          </h3>
                          <p className="text-xs text-gray-500">
                            ({bookingData.adults} Adult,{" "}
                            {bookingData.childrens} Children)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Image & Ratings */}
                <div className="w-full md:w-60 shrink-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs md:text-sm">
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-green-700 font-bold border border-green-100">
                      <img
                        src="/assets/booking/guestFav_left_leaf.svg"
                        alt=""
                        className="h-3"
                      />
                      <span>Guest Favorite</span>
                      <img
                        src="/assets/booking/guestFav_right_leaf.svg"
                        alt=""
                        className="h-3"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/booking/star.svg"
                        alt="star"
                        className="w-3"
                      />
                      <span className="font-bold">4.6</span>
                      <span className="text-gray-400">/5</span>
                    </div>
                  </div>
                  <img
                    src={bookingData.propertyImage}
                    alt="Property"
                    className="w-full h-48 md:h-[220px] object-cover rounded-xl shadow-sm bg-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-3">
                Important information
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                This property offers transfers from the airport. Guests must
                contact the property with arrival details before travel, using
                the contact information on the booking confirmation. To make
                arrangements for check-in please contact the property at least
                24 hours before arrival using the information on the booking
                confirmation.
              </p>
            </div>

            {/* Booking & Cancellation Policy */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Booking & Cancellation policy
              </h2>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-2 bg-red-50 rounded-full shrink-0">
                  <img
                    src="/assets/checkout/cancelation.svg"
                    alt="refund"
                    className="w-6 md:w-8"
                  />
                </div>
                <div>
                  <p className="font-semibold text-darkBlue">No Refund</p>
                  <p className="text-sm text-gray-500">
                    On your selected dates
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-4 py-2.5 text-darkBlue border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto" onClick={() => navigate('/refund-policy')}>
                  Refund Policy
                </button>
                <button className="px-4 py-2.5 text-darkBlue border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto" onClick={() => navigate('/refund-policy')}>
                  Home Rules and Policy
                </button>
              </div>
            </div>

            {/* Assistance Section */}
            <div className="bg-[linear-gradient(275.02deg,#9ccdfb33_0%,#fcc99233_100%),linear-gradient(107.22deg,#17ff581c_1.46%,#016c6e1c_99.96%)] rounded-xl p-4 border border-blue-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <p className="font-semibold text-gray-800">
                  Any issue to complete your booking?
                </p>
                <button className="text-darkGray bg-white/50 border border-darkGray rounded-lg px-6 py-2 font-medium cursor-pointer hover:bg-white transition-colors w-full sm:w-auto">
                  Click here
                </button>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Any special requests?
              </h2>
              <textarea
                placeholder="Write your request here (optional)..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Right Column - Price Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Zero Convenience Fees Message */}
                <div className="p-4 border-b border-gray-100 bg-green-50/50">
                  <h2 className="text-lg font-semibold mb-2">Price details</h2>
                  <div className="flex items-start gap-2">
                    <img
                      src="/assets/checkout/info-circle.svg"
                      alt="info"
                      className="w-4 mt-0.5"
                    />
                    <p className="text-darkGreen text-xs md:text-sm font-medium">
                      You pay zero convenience fees on your booking!
                    </p>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Rental Charges</span>
                    <span className="font-medium">
                      ₹{pricing.base.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">
                      GST{" "}
                      <span className="text-xs text-gray-400">
                        (Govt guidelines)
                      </span>
                    </span>
                    <span className="font-medium">
                      ₹{pricing.taxes.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {pricing.discount > 0 && (
                    <div className="flex justify-between text-green-600 text-sm md:text-base">
                      <span>Discount {couponCode && `(${couponCode})`}</span>
                      <span className="font-medium">
                        -₹{pricing.discount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Coupon Section */}
                <div className="px-4 pb-4">
                  <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src="/assets/checkout/offer.svg"
                        alt="coupon"
                        className="w-5"
                      />
                      <span className="text-sm font-medium">Apply Coupon</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        placeholder="Enter code"
                        disabled={isProcessing}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 uppercase"
                      />
                    </div>
                    {couponError && (
                      <p className="text-red-500 text-xs mt-2">{couponError}</p>
                    )}
                    {couponCode && !couponError && (
                      <p className="text-green-600 text-xs mt-2">
                        Coupon code set. Will be validated on checkout.
                      </p>
                    )}
                  </div>
                </div>

                {/* Total Payable */}
                <div className="bg-[#E5EEF9] bg-opacity-10 p-4 border-t border-blue-100">
                  <div className="flex justify-between items-end">
                    <span className="text-gray-900 font-semibold">
                      Total Payable
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹
                      {(
                        Math.round(
                          (pricing.base + pricing.taxes - pricing.discount) *
                            100
                        ) / 100
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 text-right">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="my-6 px-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-400 checked:bg-green-600 checked:border-green-600 transition-all"
                    />
                    <svg
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600 leading-normal select-none">
                    I have read and accepted the{" "}
                    <a
                      href="/terms"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      Terms & Conditions
                    </a>
                    ,{" "}
                    <a
                      href="/privacy"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      Privacy Policies
                    </a>
                    ,{" "}
                    <a
                      href="/cancellation"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      Cancellation Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      Indemnity Form
                    </a>
                  </span>
                </label>
              </div>

              {/* Continue Button */}
              <motion.button
                disabled={!termsAccepted || isProcessing}
                onClick={handleContinue}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-md transition-all ${
                  termsAccepted && !isProcessing
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-green-200"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                whileHover={
                  termsAccepted && !isProcessing ? { scale: 1.02 } : {}
                }
                whileTap={termsAccepted && !isProcessing ? { scale: 0.98 } : {}}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Continue"
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Popup */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <img
                    src="/assets/checkout/conf.svg"
                    alt="success"
                    className="w-10 h-10"
                  />
                </div>
              </div>

              {/* Confirmation Message */}
              <div className="text-center border-b border-gray-100 pb-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed px-4">
                  Thank you for choosing us. A confirmation email with details
                  has been sent to you.
                </p>
              </div>

              {/* Property Details Card in Modal */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
                <div className="flex gap-4 border-b border-gray-200 pb-4 mb-4">
                  <img
                    src={bookingData.propertyImage}
                    alt="Villa"
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">
                      {bookingData.propertyName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {bookingData.propertyLocation}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded">
                        {bookingData.nights} Night
                        {bookingData.nights > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={() => {
                    setShowConfirmation(false);
                    navigate("/trips-bookings");
                  }}
                  className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  View Booking
                </motion.button>
                <motion.button
                  onClick={() => {
                    setShowConfirmation(false);
                    navigate("/");
                  }}
                  className="flex-1 py-3 px-6 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  Back to Home
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;