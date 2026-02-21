// client\src\components\booking\BookingOverview.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RulesAndSpaces from "./RefundPolicy";
import GuestReviews from "./GuestReviews";
import Modal from "../common/Modal";
import Step1 from "../auth/Step1";
import Step2 from "../auth/Step2";

const TABS = ["Overview", "Highlights", "Refund Policy", "Spaces", "Reviews"];

export default function BookingOverview({
  property,
  bookingInfo,
  onBookingInfoChange,
}) {
  const navigate = useNavigate();
  const { isAuth, user, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("Overview");
  const [expanded, setExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState(1);
  const [phoneData, setPhoneData] = useState(null);

  // --- REFS FOR SCROLLING ---
  const overviewRef = useRef(null);
  const highlightsRef = useRef(null);
  const refundPolicyRef = useRef(null);
  const spacesRef = useRef(null);
  const reviewsRef = useRef(null);

  const propertyData = property?.property || {};
  const propertyDetails = property?.propertyDetails || {};

  // --- STATE INITIALIZATION ---
  const [checkInDate, setCheckInDate] = useState(bookingInfo?.checkIn || "");
  const [checkOutDate, setCheckOutDate] = useState(bookingInfo?.checkOut || "");
  const [guests, setGuests] = useState({
    adults: bookingInfo?.adults || 2,
    children: bookingInfo?.childrens || 0,
  });
  const [rooms, setRooms] = useState(bookingInfo?.rooms || 1);

  // --- FIX: INFINITE LOOP PREVENTION ---
  useEffect(() => {
    // console.log("property : " , property);
    if (!bookingInfo) return;

    let changed = false;

    if (bookingInfo.checkIn !== checkInDate) {
      setCheckInDate(bookingInfo.checkIn || "");
      changed = true;
    }

    if (bookingInfo.checkOut !== checkOutDate) {
      setCheckOutDate(bookingInfo.checkOut || "");
      changed = true;
    }

    if (bookingInfo.rooms !== rooms) {
      setRooms(bookingInfo.rooms || 1);
      changed = true;
    }

    setGuests((prev) => {
      const adults = bookingInfo.adults ?? prev.adults;
      const children = bookingInfo.childrens ?? prev.children;

      if (adults === prev.adults && children === prev.children) {
        return prev;
      }
      return { adults, children };
    });

    if (!changed) return;
  }, [bookingInfo]);

  // --- OUTGOING CHANGE HANDLER ---
  useEffect(() => {
    if (!onBookingInfoChange) return;

    onBookingInfoChange({
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: guests.adults,
      childrens: guests.children,
      rooms,
    });
  }, [checkInDate, checkOutDate, guests.adults, guests.children, rooms]);

  const [showDatePicker, setShowDatePicker] = useState(null);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showRoomPicker, setShowRoomPicker] = useState(false);

  const fullText =
    propertyData.description ||
    propertyDetails.villaLocationDescription ||
    `Nestled in the serene landscapes...`;
  const previewText =
    fullText.length > 250 ? fullText.slice(0, 250) + "..." : fullText;

  // --- SCROLL HANDLER ---
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // 1. Special case for Overview: Always scroll to top
    if (tab === "Overview") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const sectionMap = {
      // Overview is handled above
      Highlights: highlightsRef,
      "Refund Policy": refundPolicyRef,
      Spaces: spacesRef,
      Reviews: reviewsRef,
    };

    const targetRef = sectionMap[tab];

    if (targetRef && targetRef.current) {
      // 2. Adjust offset based on your sticky header height + tabs height
      // Header is ~60px, Tabs are ~50px, plus some breathing room.
      const offset = 140;
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return "Add Date";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatGuests = () => {
    const { adults, children } = guests;
    return children === 0 ? `${adults} Adults` : `${adults} Ad, ${children} Ch`;
  };

  const handleGuestChange = (type, value) => {
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] + value) }));
  };

  const handleRoomChange = (value) => {
    setRooms(Math.max(1, rooms + value));
  };

  const getAmenities = () =>
    propertyData.amenities || propertyData.amenties || [];
  const getBasePrice = () => propertyData.basePrice || 37000;

  // --- DATE PICKER COMPONENT ---
  const CustomDateRangePicker = ({
    isOpen,
    onClose,
    isMobileModal = false,
  }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const parseDate = (dateString) => {
      if (!dateString || dateString.trim() === "") return null;
      const date = new Date(dateString);
      return !isNaN(date.getTime()) ? date : null;
    };

    useEffect(() => {
      if (isOpen) {
        const startDate = parseDate(checkInDate);
        const endDate = parseDate(checkOutDate);
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        if (startDate)
          setCurrentMonth(
            new Date(startDate.getFullYear(), startDate.getMonth(), 1),
          );
      }
    }, [isOpen]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startingDayOfWeek = (firstDay.getDay() + 6) % 7;
      const days = [];
      for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
      for (let day = 1; day <= lastDay.getDate(); day++)
        days.push(new Date(year, month, day));
      return days;
    };

    const navigateMonth = (direction) => {
      const newDate = new Date(currentMonth);
      newDate.setMonth(newDate.getMonth() + direction);
      setCurrentMonth(newDate);
    };

    const isDateInRange = (date) => {
      if (!selectedStartDate || !selectedEndDate || !date) return false;
      const d = new Date(date.setHours(0, 0, 0, 0));
      const s = new Date(selectedStartDate.setHours(0, 0, 0, 0));
      const e = new Date(selectedEndDate.setHours(0, 0, 0, 0));
      return d >= s && d <= e;
    };

    const isDateSelected = (date) => {
      if (!date) return false;
      const d = new Date(date.setHours(0, 0, 0, 0)).getTime();
      const s = selectedStartDate
        ? new Date(selectedStartDate.setHours(0, 0, 0, 0)).getTime()
        : null;
      const e = selectedEndDate
        ? new Date(selectedEndDate.setHours(0, 0, 0, 0)).getTime()
        : null;
      return d === s || d === e;
    };

    const handleDateClick = (date) => {
      if (!date || date < new Date().setHours(0, 0, 0, 0)) return;
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      } else if (selectedStartDate && !selectedEndDate) {
        if (date < selectedStartDate) {
          setSelectedStartDate(date);
          setSelectedEndDate(null);
        } else {
          setSelectedEndDate(date);
        }
      }
    };

    const applyDateRange = () => {
      if (selectedStartDate && selectedEndDate) {
        const offsetStart = new Date(
          selectedStartDate.getTime() -
            selectedStartDate.getTimezoneOffset() * 60000,
        );
        const offsetEnd = new Date(
          selectedEndDate.getTime() -
            selectedEndDate.getTimezoneOffset() * 60000,
        );
        const checkIn = offsetStart.toISOString().split("T")[0];
        const checkOut = offsetEnd.toISOString().split("T")[0];

        setCheckInDate(checkIn);
        setCheckOutDate(checkOut);
        setShowDatePicker(null);
      }
    };

    if (!isOpen) return null;

    // --- FIX: Using the same Modal styles for both Mobile and Desktop to ensure visibility ---
    const containerClasses = isMobileModal
      ? "fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      : "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-[9999]";

    const wrapperClasses = isMobileModal
      ? "bg-white rounded-lg shadow-xl w-full max-w-[340px] p-4 border border-gray-200"
      : "bg-white rounded-lg shadow-xl w-[350px] p-4 border border-gray-200";

    return (
      <div
        className={containerClasses}
        onClick={isMobileModal ? onClose : undefined}
      >
        <div className={wrapperClasses} onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="font-semibold text-lg">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((d, i) => (
                <div
                  key={i}
                  className="text-center text-xs font-bold text-gray-500"
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((date, i) => (
              <button
                key={i}
                onClick={() => handleDateClick(date)}
                disabled={!date || date < new Date().setHours(0, 0, 0, 0)}
                className={`aspect-square rounded-md text-sm flex items-center justify-center transition-colors ${
                  !date ? "invisible" : ""
                } ${
                  isDateSelected(date) ? "bg-blue-600 text-white shadow-md" : ""
                } ${
                  isDateInRange(date) && !isDateSelected(date)
                    ? "bg-blue-100 text-blue-800"
                    : ""
                } ${
                  date && !isDateSelected(date) && !isDateInRange(date)
                    ? "hover:bg-gray-100 text-gray-700"
                    : ""
                } ${
                  date && date < new Date().setHours(0, 0, 0, 0)
                    ? "text-gray-300 cursor-not-allowed"
                    : ""
                }`}
              >
                {date?.getDate()}
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-4 pt-3 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={applyDateRange}
              disabled={!selectedStartDate || !selectedEndDate}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If clicking inside a date picker modal, don't close it via this handler
      // (The modal has its own onClose logic usually)
      if (
        !event.target.closest(".booking-form-container") &&
        !event.target.closest(".fixed")
      ) {
        // Only close if we are not in the modal mode (which handles its own outside click)
        if (showDatePicker !== "dates") {
          setShowGuestPicker(false);
          setShowRoomPicker(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDatePicker]);

  const handleReserve = () => {
    // 🔐 If user not logged in → show Step1
    if (!isAuth) {
      setIsAuthModalOpen(true);
      setAuthStep(1);
      return;
    }

    // 👤 Profile incomplete → redirect
    if (user && !user.isProfileComplete) {
      navigate("/account");
      return;
    }

    // 📅 Dates missing → open date picker
    if (!checkInDate || !checkOutDate) {
      setShowDatePicker("dates");
      return;
    }

    const params = new URLSearchParams({
      propertyImage: propertyData.coverImage,
      propertyId: property?.property?._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: guests.adults,
      childrens: guests.children,
      rooms,
    });

    navigate(`/checkout?${params.toString()}`, {
      state: {
        ...property?.property,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults: guests.adults,
        childrens: guests.children,
        rooms,
        nights: Math.ceil(
          (new Date(checkOutDate) - new Date(checkInDate)) / 86400000,
        ),
      },
    });
  };

  const handleAuthComplete = async () => {
    await refreshProfile();
    setIsAuthModalOpen(false);
    setAuthStep(1);
  };

  return (
    <section className="py-4 md:py-8 w-full max-w-full">
      {/* --- Sticky Navbar --- */}
      <div className="mb-6 sticky top-[60px] z-30 bg-white/95 backdrop-blur-sm py-2 shadow-sm md:shadow-none -mx-4 px-4 md:mx-0 md:px-0 transition-all duration-200">
        <nav className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-1 w-full">
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative px-2 md:px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative items-start pb-24 lg:pb-0">
        {/* --- LEFT CONTENT --- */}
        <div className="flex-1 min-w-0 w-full" ref={overviewRef}>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 wrap-break-word leading-tight">
            {propertyData.name || "Luxury Villa"}
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            {propertyData.address?.fullAddress || "Location"}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">
              <span className="font-bold text-xs">Guest Favorite</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="font-bold">
                {propertyData.rating?.toFixed(1) || "4.8"}
              </span>
              <span className="text-gray-400">/5</span>
            </div>
            <span className="hidden sm:inline text-gray-300">|</span>
            <button
              onClick={() => handleTabClick("Reviews")}
              className="text-blue-600 hover:underline font-medium"
            >
              {propertyDetails.reviews?.length || 0} Reviews
            </button>
          </div>

          {/* --- ATTACH HIGHLIGHTS REF HERE --- */}
          <div
            ref={highlightsRef}
            className="flex flex-wrap gap-2 mt-4 scroll-mt-32"
          >
            {[
              {
                icon: "/assets/booking/user.svg",
                text: `Up to ${propertyData.capacity?.adults || 10} Guests`,
              },
              {
                icon: "/assets/booking/room.svg",
                text: `${propertyData.noOfRooms || 3} Rooms`,
              },
              {
                icon: "/assets/booking/bath.svg",
                text: `${propertyData.noOfBaths || 2} Baths`,
              },
            ].map((tag, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-blue-50 text-blue-900 px-3 py-1.5 rounded text-xs md:text-sm font-medium"
              >
                <img src={tag.icon} alt="" className="w-3.5 h-3.5 opacity-70" />
                {tag.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {[
              {
                icon: "/assets/booking/user.svg",
                text: `Up to ${propertyData.capacity?.adults || 10} Guests`,
              },
              {
                icon: "/assets/booking/room.svg",
                text: `${propertyData.noOfRooms || 3} Rooms`,
              },
              {
                icon: "/assets/booking/bath.svg",
                text: `${propertyData.noOfBaths || 2} Baths`,
              },
            ].map((tag, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-blue-50 text-blue-900 px-3 py-1.5 rounded text-xs md:text-sm font-medium"
              >
                <img src={tag.icon} alt="" className="w-3.5 h-3.5 opacity-70" />
                {tag.text}
              </div>
            ))}
          </div>

          {/* <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-4 mt-8">
            {getAmenities()
              .slice(0, 5)
              .map((amenity, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-gray-50">
                    <span className="text-xs font-bold text-gray-600">
                      {typeof amenity === "string" ? amenity[0] : "✓"}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-600 font-medium capitalize truncate w-full max-w-[60px]">
                    {typeof amenity === "string"
                      ? amenity.split(" ")[0]
                      : amenity}
                  </span>
                </div>
              ))}
          </div> */}

          <div className="mt-10 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold border-l-4 border-pink-400 pl-3 mb-2">
              About
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {expanded ? fullText : previewText}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 font-medium text-sm mt-2 underline"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          </div>

          <div ref={refundPolicyRef} className="mt-8 pt-4 scroll-mt-36">
            <RulesAndSpaces propertyDetails={propertyDetails} ref={spacesRef} />
          </div>
          <div ref={reviewsRef} className="mt-8 pt-4 scroll-mt-36">
            <GuestReviews
              propertyLocation={propertyData.location}
              propertyDetails={propertyDetails}
            />
          </div>
        </div>

        {/* --- DESKTOP SIDEBAR (Hidden on Mobile) --- */}
        <aside className="hidden lg:block w-[360px] shrink-0 sticky top-24 booking-form-container h-fit">
          <div className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
            <div className="bg-[linear-gradient(107.22deg,rgba(23,255,82,0.11)_1.46%,rgba(1,108,110,0.11)_99.96%)] px-5 py-4 border-b border-green-100">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{getBasePrice().toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-500">/ night</span>
              </div>
            </div>

            <div className="p-5 space-y-4 relative">
              <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden relative">
                <div
                  onClick={() => {
                    setShowDatePicker("dates");
                    setShowGuestPicker(false);
                  }}
                  className="p-3 border-r border-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                    Check-In
                  </span>
                  <span className="text-sm font-medium text-gray-900 block truncate">
                    {formatDate(checkInDate)}
                  </span>
                </div>
                <div
                  onClick={() => {
                    setShowDatePicker("dates");
                    setShowGuestPicker(false);
                  }}
                  className="p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                    Check-Out
                  </span>
                  <span className="text-sm font-medium text-gray-900 block truncate">
                    {formatDate(checkOutDate)}
                  </span>
                </div>
              </div>

              {/* Removed Nested CustomDateRangePicker from here to avoid overflow/clipping issues */}

              <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden relative">
                <div
                  onClick={() => {
                    setShowGuestPicker(!showGuestPicker);
                    setShowDatePicker(null);
                  }}
                  className="p-3 border-r border-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                    Guests
                  </span>
                  <span className="text-sm font-medium text-gray-900 block truncate">
                    {formatGuests()}
                  </span>
                </div>

                {showGuestPicker && (
                  <div className="absolute top-full left-0 z-50 w-64 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
                    {["adults", "children"].map((type) => (
                      <div
                        key={type}
                        className="flex justify-between items-center mb-4 last:mb-0"
                      >
                        <span className="capitalize text-sm font-medium">
                          {type}
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGuestChange(
                                type === "children" ? "children" : "adults",
                                -1,
                              );
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-sm">
                            {
                              guests[
                                type === "children" ? "children" : "adults"
                              ]
                            }
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGuestChange(
                                type === "children" ? "children" : "adults",
                                1,
                              );
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowGuestPicker(false);
                      }}
                      className="w-full mt-2 py-2 bg-gray-900 text-white text-xs rounded font-medium"
                    >
                      Close
                    </button>
                  </div>
                )}

                <div
                  onClick={() => {
                    setShowRoomPicker(!showRoomPicker);
                    setShowDatePicker(null);
                  }}
                  className="p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                    Rooms
                  </span>
                  <span className="text-sm font-medium text-gray-900 block truncate">
                    {rooms} Rooms
                  </span>
                </div>
              </div>

              <button
                onClick={handleReserve}
                className="w-full bg-green text-white py-3.5 rounded-lg font-semibold text-base hover:bg-darkGreen transition shadow-sm active:scale-[0.98]"
              >
                {checkInDate && checkOutDate
                  ? "Reserve Now"
                  : "Check Availability"}
              </button>

              <div className="text-center">
                <button
                  onClick={() => handleTabClick("Refund Policy")}
                  className="text-xs text-gray-500 underline decoration-gray-300"
                >
                  Cancellation Policy
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MOBILE STICKY FOOTER --- */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">
                ₹{getBasePrice().toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-500">/ night</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {checkInDate && checkOutDate
                ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`
                : "Select Dates"}
            </div>
          </div>

          <button
            onClick={() => {
              if (!checkInDate || !checkOutDate) {
                setShowDatePicker("dates");
              } else {
                handleReserve();
              }
            }}
            className="bg-[#222222] text-white px-6 py-3 rounded-lg font-medium text-sm active:scale-95 transition-transform"
          >
            {checkInDate && checkOutDate ? "Reserve" : "Select Dates"}
          </button>
        </div>

        {/* --- GLOBAL DATE PICKER (Works for both Mobile & Desktop) --- */}
        <CustomDateRangePicker
          isOpen={showDatePicker === "dates"}
          onClose={() => setShowDatePicker(null)}
          isMobileModal={true} // Forcing Modal Mode for both screens as requested
        />
      </div>

      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthStep(1);
        }}
      >
        {authStep === 1 ? (
          <Step1
            onNext={({ phone, googleAuth }) => {
              if (googleAuth) {
                handleAuthComplete();
              } else {
                setPhoneData(phone);
                setAuthStep(2);
              }
            }}
            onClose={() => setIsAuthModalOpen(false)}
          />
        ) : (
          <Step2
            phone={phoneData}
            onBack={() => setAuthStep(1)}
            onNext={handleAuthComplete}
            onClose={() => setIsAuthModalOpen(false)}
          />
        )}
      </Modal>
    </section>
  );
}
