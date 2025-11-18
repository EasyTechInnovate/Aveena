import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Sparkles,
  Users,
  Mountain,
  Baby,
  Building2,
} from "lucide-react";
import RulesAndSpaces from "./RefundPolicy";
import GuestReviews from "./GuestReviews";

const items = [
  { icon: "/assets/booking/meal.svg", label: "Food" },
  { icon: "/assets/booking/service.svg", label: "Service" },
  { icon: "/assets/booking/senior.svg", label: "Senior Citizens" },
  { icon: "/assets/booking/view.svg", label: "View" },
  { icon: "/assets/booking/kids.svg", label: "Kids" },
  { icon: "/assets/booking/design.svg", label: "Design" },
];



const TABS = [
  "Overview",
  "Highlights",
  "Refund Policy",
  "Spaces",
  "Reviews",
  "Amenities",
  "Meals",
  "Location",
  "Experiences",
  "FAQ's",
];

export default function BookingOverview() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [expanded, setExpanded] = useState(false);

  // Booking form state
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [rooms, setRooms] = useState(3);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showRoomPicker, setShowRoomPicker] = useState(false);

  const fullText = `Nestled in the serene landscapes of Alibaug, Pranaam offers the perfect 
  blend of comfort, luxury, and curated experiences. Whether you’re here to relax by 
  the pool, enjoy alfresco dining, or simply soak in the premium interiors, every detail 
  is designed to make your stay unforgettable. Guests can indulge in a four-course meal 
  crafted by expert chefs, unwind in the private pool, or explore the thoughtfully designed 
  interiors that blend modern elegance with traditional charm. Pranaam is not just a villa; 
  it is an experience that combines tranquility, personalized service, and unforgettable 
  moments for you and your loved ones.`;

  const previewText = fullText.slice(0, 250) + "...";

  // Helper functions
  const formatDate = (date) => {
    if (!date) return "Add Date";
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const sectionVariants = {
 
  };




  const formatGuests = () => {
    const { adults, children } = guests;
    if (children === 0) return `${adults} Adults`;
    return `${adults} Adults, ${children} Chi...`;
  };

  const handleGuestChange = (type, value) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value)
    }));
  };

  const handleRoomChange = (value) => {
    setRooms(Math.max(1, rooms + value));
  };

  // Custom Date Range Picker Component
  const CustomDateRangePicker = ({ isOpen, onClose }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [nextMonth, setNextMonth] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)));
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

      const days = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }

      return days;
    };

    const navigateMonth = (direction, isNextMonth = false) => {
      const targetMonth = isNextMonth ? nextMonth : currentMonth;
      const newDate = new Date(targetMonth);
      newDate.setMonth(newDate.getMonth() + direction);

      if (isNextMonth) {
        setNextMonth(newDate);
        setCurrentMonth(new Date(newDate.getTime() - 30 * 24 * 60 * 60 * 1000));
      } else {
        setCurrentMonth(newDate);
        setNextMonth(new Date(newDate.getTime() + 30 * 24 * 60 * 60 * 1000));
      }
    };

    const isDateInRange = (date) => {
      if (!selectedStartDate || !selectedEndDate || !date) return false;
      return date >= selectedStartDate && date <= selectedEndDate;
    };

    const isDateSelected = (date) => {
      if (!date) return false;
      if (selectedStartDate && date.toDateString() === selectedStartDate.toDateString()) return true;
      if (selectedEndDate && date.toDateString() === selectedEndDate.toDateString()) return true;
      return false;
    };

    const isDateDisabled = (date) => {
      if (!date) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    };

    const isWeekend = (date) => {
      if (!date) return false;
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday or Saturday
    };

    const handleDateClick = (date) => {
      if (!date || isDateDisabled(date)) return;

      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        // Start new selection
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      } else if (selectedStartDate && !selectedEndDate) {
        // Select end date
        if (date < selectedStartDate) {
          // If clicked date is before start date, make it the new start date
          setSelectedStartDate(date);
          setSelectedEndDate(null);
        } else {
          // Set as end date
          setSelectedEndDate(date);
        }
      }
    };

    const applyDateRange = () => {
      if (selectedStartDate && selectedEndDate) {
        setCheckInDate(selectedStartDate.toISOString().split('T')[0]);
        setCheckOutDate(selectedEndDate.toISOString().split('T')[0]);
        setShowDatePicker(null);
      }
    };

    if (!isOpen) return null;

    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] p-4 w-96">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex space-x-8">
            <span className="font-medium">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
            <span className="font-medium">{monthNames[nextMonth.getMonth()]} {nextMonth.getFullYear()}</span>
          </div>
          <button
            onClick={() => navigateMonth(1, true)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex space-x-4">
          {/* First Month */}
          <div className="flex-1">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className={`text-xs font-medium text-center py-2 ${day === 'Sat' || day === 'Sun' ? 'text-red-500' : 'text-gray-700'
                    }`}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={isDateDisabled(date)}
                  className={`
                    w-8 h-8 text-sm rounded flex items-center justify-center relative
                    ${!date ? 'invisible' : ''}
                    ${isDateDisabled(date) ? 'text-gray-300 cursor-not-allowed' : ''}
                    ${isDateSelected(date) ? 'bg-blue-500 text-white' : ''}
                    ${isDateInRange(date) && !isDateSelected(date) ? 'bg-blue-100' : ''}
                    ${!isDateSelected(date) && !isDateInRange(date) && !isDateDisabled(date) && isWeekend(date) ? 'text-blue-500' : ''}
                    ${!isDateSelected(date) && !isDateInRange(date) && !isDateDisabled(date) && !isWeekend(date) ? 'text-gray-700 hover:bg-gray-100' : ''}
                  `}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </div>

          {/* Second Month */}
          <div className="flex-1">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className={`text-xs font-medium text-center py-2 ${day === 'Sat' || day === 'Sun' ? 'text-red-500' : 'text-gray-700'
                    }`}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(nextMonth).map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={isDateDisabled(date)}
                  className={`
                    w-8 h-8 text-sm rounded flex items-center justify-center relative
                    ${!date ? 'invisible' : ''}
                    ${isDateDisabled(date) ? 'text-gray-300 cursor-not-allowed' : ''}
                    ${isDateSelected(date) ? 'bg-blue-500 text-white' : ''}
                    ${isDateInRange(date) && !isDateSelected(date) ? 'bg-blue-100' : ''}
                    ${!isDateSelected(date) && !isDateInRange(date) && !isDateDisabled(date) && isWeekend(date) ? 'text-blue-500' : ''}
                    ${!isDateSelected(date) && !isDateInRange(date) && !isDateDisabled(date) && !isWeekend(date) ? 'text-gray-700 hover:bg-gray-100' : ''}
                  `}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={applyDateRange}
            disabled={!selectedStartDate || !selectedEndDate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.booking-form-container')) {
        setShowDatePicker(null);
        setShowGuestPicker(false);
        setShowRoomPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const containerVariants = {
   
  };

  const itemVariants = {
    // hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      //  transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="py-8">
      <div className="mb-6">
        <div className="overflow-x-auto scrollbar-hide">
          <nav
            className="flex items-center gap-6 whitespace-nowrap text-sm"
            aria-label="Property sections"
          >
            {TABS.map((tab, index) => {
              const isActive = tab === activeTab;
              return (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3 py-2 focus:outline-none ${isActive
                      ? "text-blue font-semibold"
                      : "text-gray-600 hover:text-gray-800"
                    }`}
                  aria-current={isActive ? "page" : undefined}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{tab}</span>

                  <motion.span
                    className={`block h-0.5 mt-2 rounded-full ${isActive ? "bg-blue" : "bg-transparent"
                      }`}
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.15 }}
                    aria-hidden="true"
                  />
                </motion.button>
              );
            })}
          </nav>
        </div>
        <div className="border-t mt-4" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold">
            Pranaam
          </h1>
          <p className="text-gray-500">
            Alibaug, Maharashtra
          </p>

          <div className="flex items-center gap-3 my-6 text-sm">
            <div className="flex gap-1 items-center">
              <img
                src="/assets/booking/guestFav_left_leaf.svg"
                alt="left"
                className="h-6"
              />
              <h4 className="text-center font-bold text-md">Like a 5*</h4>
              <img
                src="/assets/booking/guestFav_right_leaf.svg"
                alt="left"
                className="h-6"
              />
            </div>

            <span className="flex items-center gap-1">
              <span>
                <img
                  src="/assets/booking/star.svg"
                  alt="star"
                  className="w-4"
                />
              </span>{" "}
              <span className="text-md font-semibold">
                4.6
                <span className="text-gray-500 text-md font-semibold">/5</span>
              </span>
            </span>
            <span className="w-0.5 h-6 bg-gray-400"></span>
            <a
              href="#"
              className="text-blue underline font-semibold text-sm"
            >
              63 Reviews
            </a>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="flex items-center gap-2 text-darkGray text-sm font-semibold bg-[#2F80ED1A] px-3 py-1 rounded-sm">
              <img src="/assets/booking/user.svg" alt="user" className="w-4" />{" "}
              Up to 15 Guests
            </span>
            <span className="flex items-center gap-2 text-darkGray text-sm font-semibold bg-[#2F80ED1A] px-3 py-1 rounded-sm">
              <img src="/assets/booking/room.svg" alt="user" className="w-4" />{" "}
              3 - 6 Rooms
            </span>
            <span className="flex items-center gap-2 text-darkGray text-sm font-semibold bg-[#2F80ED1A] px-3 py-1 rounded-sm">
              <img src="/assets/booking/bath.svg" alt="user" className="w-4" />{" "}
              6 Baths
            </span>
            <span className="flex items-center gap-2 text-darkGray text-sm font-semibold bg-[#2F80ED1A] px-3 py-1 rounded-sm">
              <img src="/assets/booking/meal.svg" alt="user" className="w-4" />{" "}
              Meals Available
            </span>
            <button className="flex items-center gap-2 font-semibold text-darkGray text-sm border border-red-200 px-3 py-1 rounded-sm hover:bg-red-50">
              <img src="/assets/booking/pdf.svg" alt="user" className="w-4" />{" "}
              View Brochure
            </button>
          </div>

          <div className="flex items-center flex-wrap gap-3 my-6 text-sm text-gray-700">
            <span className="font-semibold text-base text-gray-800 mr-1">
              Great for:
            </span>
            {items.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-gray-700"
              >
                <img src={icon} alt="icon" className="w-5" />
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-4 mt-4">
            {[
              { name: "Private Pool", icon: "/assets/booking/pool.svg" },
              { name: "Lawn", icon: "/assets/booking/lawn.svg" },
              { name: "WiFi", icon: "/assets/booking/wifi.svg" },
              { name: "Bar", icon: "/assets/booking/bar.svg" },
              { name: "Alfresco Dining", icon: "/assets/booking/dining.svg" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center justify-center text-center w-16"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-6 h-6 object-cover"
                  />
                </div>
                <span className="mt-2 text-sm text-gray-800 leading-tight">
                  {item.name}
                </span>
              </div>
            ))}

            <a
              href="#"
              className="text-blue-600 font-medium underline text-sm self-center"
            >
              +21 Amenities
            </a>
          </div>

          <div className="mt-30">
            <h3 className="text-lg font-semibold border-l-4 border-[#F5959E] pl-3">
              The Aveena Experience
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 font-['Marcellus'] text-white">
              {[
                {
                  img: "/assets/booking/lavida-features.png",
                  title: "FULLY-SERVICED VILLAS",
                },
                {
                  img: "/assets/booking/lavida-features1.png",
                  title: "FOUR COURSE MEAL",
                },
                {
                  img: "/assets/booking/lavida-features2.png",
                  title: "PREMIUM INTERIORS",
                },
                {
                  img: "/assets/booking/lavida-features3.png",
                  title: "CURATED EXPERIENCES",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="relative rounded-md overflow-hidden shadow-sm border border-gray-200"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-40 md:h-48 object-cover"
                  />
                  <p className="absolute inset-0 flex items-center justify-center text-center px-2 text-lg md:text-xl font-medium">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t mt-10" />

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-[#F5959E] pl-3">
              Pranaam – Villa in Alibaug
            </h2>

            <p className="mt-2 text-gray-600 italic text-sm leading-relaxed">
              {expanded ? fullText : previewText}
            </p>

            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 font-medium text-sm underline cursor-pointer"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>

            {/* Bottom CTA buttons */}
            <div className="mt-6 flex gap-4">
              <button className="px-5 py-2 rounded-sm text-sm font-medium bg-light border border-gray-300 hover:bg-gray-50 transition-colors">
                Explore Your Stay
              </button>

              <button className="px-5 py-2 border border-gray-300 rounded-sm text-sm font-medium bg-light hover:bg-gray-50 transition-colors">
                FAQ's
              </button>
            </div>
          </div>

          <div>
            <RulesAndSpaces />
          </div>

          <div>
            <GuestReviews />
          </div>







        </div>

        <aside className="w-full lg:w-[384px] lg:shrink-0">
          <div className="lg:sticky lg:top-24 rounded-lg overflow-visible border border-gray-200 lg:border-0 bg-white lg:bg-transparent shadow-sm lg:shadow-none">
            {/* Price Section */}
            <div className="bg-[linear-gradient(107.22deg,_rgba(23,255,82,0.11)_1.46%,_rgba(1,108,110,0.11)_99.96%)] px-6 py-4 rounded-t-lg lg:rounded-lg">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-darkGray">
                  ₹37,000
                </span>
                <span className="text-sm text-[#959595]">
                  (for 3 rooms) Per Night + Taxes
                </span>
              </div>


              <div className="flex flex-col gap-2 mb-4 relative booking-form-container overflow-visible">

                <div className="flex gap-2 w-full bg-white  rounded-lg p-3">
                  {/* Check-in */}
                  <div className="bg-white flex-1 cursor-pointer transition-colors">
                    <label className="text-xs text-[#959595] flex items-center gap-1 mb-1">
                      Check-in
                      <svg
                        className="w-3 h-3 text-pink-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                    <div
                      className="text-sm font-bold text-black"
                      onClick={() => {
                        setShowDatePicker(showDatePicker === 'dates' ? null : 'dates');
                        setShowGuestPicker(false);
                        setShowRoomPicker(false);
                      }}
                    >
                      {formatDate(checkInDate)}
                    </div>
                  </div>

                  {/* Check-out */}
                  <div className="bg-white flex-1 cursor-pointer transition-colors">
                    <label className="text-xs text-[#959595] flex items-center gap-1 mb-1">
                      Check-out
                      <svg
                        className="w-3 h-3 text-pink-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                    <div
                      className="text-sm font-bold text-black"
                      onClick={() => {
                        setShowDatePicker(showDatePicker === 'dates' ? null : 'dates');
                        setShowGuestPicker(false);
                        setShowRoomPicker(false);
                      }}
                    >
                      {formatDate(checkOutDate)}
                    </div>
                  </div>
                </div>

                {/* Date Range Picker */}
                <div className="relative">
                  <CustomDateRangePicker
                    isOpen={showDatePicker === 'dates'}
                    onClose={() => setShowDatePicker(null)}
                  />
                </div>

                {/* Guests and Rooms Row */}
                <div className="flex gap-2 w-full bg-white rounded-lg p-3">
                  {/* Guests */}
                  <div className="bg-white flex-1 cursor-pointer transition-colors relative">
                    <label className="text-xs text-[#959595] flex items-center gap-1 mb-1">
                      Guests
                      <svg
                        className="w-3 h-3 text-pink-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                    <div
                      className="text-sm font-bold text-black"
                      onClick={() => {
                        setShowGuestPicker(!showGuestPicker);
                        setShowDatePicker(null);
                        setShowRoomPicker(false);
                      }}
                    >
                      {formatGuests()}
                    </div>
                    {showGuestPicker && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] p-4 w-64">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Adults</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleGuestChange('adults', -1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium">{guests.adults}</span>
                              <button
                                onClick={() => handleGuestChange('adults', 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Children</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleGuestChange('children', -1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium">{guests.children}</span>
                              <button
                                onClick={() => handleGuestChange('children', 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          {/* Done Button */}
                          <div className="flex justify-end gap-2 pt-4 border-t">
                            <button
                              onClick={() => setShowGuestPicker(false)}
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* No. of Rooms */}
                  <div className="bg-white flex-1 cursor-pointer transition-colors relative">
                    <label className="text-xs text-[#959595] flex items-center gap-1 mb-1">
                      No. of Rooms
                      <svg
                        className="w-3 h-3 text-pink-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                    <div
                      className="text-sm font-bold text-black"
                      onClick={() => {
                        setShowRoomPicker(!showRoomPicker);
                        setShowDatePicker(null);
                        setShowGuestPicker(false);
                      }}
                    >
                      {rooms} Rooms
                    </div>
                    {showRoomPicker && (
                      <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] p-4 w-56">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Rooms</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleRoomChange(-1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium">{rooms}</span>
                              <button
                                onClick={() => handleRoomChange(1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          {/* Done Button */}
                          <div className="flex justify-end gap-2 pt-4 border-t">
                            <button
                              onClick={() => setShowRoomPicker(false)}
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>



            {/* Info Bars */}
            <div className="space-y-3 mb-4 mt-4 text-center">
              <div className="bg-[#2196531A] text-darkGreen text-sm px-4 py-2 ">
                Select Dates for Best Price
              </div>
              <div className="bg-[#E9F4EE] text-green text-sm px-4 py-2 flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <img
                    src="/assets/booking/reserve_offer.svg"
                    alt="reserve_offer"
                    className="w-6 h-6"
                  />
                </div>
                <h5 className="text-nowrap text-xs">
                  Reserve to get exciting offer for this property!
                </h5>
              </div>
            </div>


            {/* Select Dates Button */}
            <button className="w-full bg-green text-white text-xl font-medium py-4 px-4 rounded hover:bg-darkGreen transition-colors mb-4">
              Select Dates
            </button>

            {/* Cancellation Policy */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>For Cancellation and Refund Policy,</span>
              <a href="#" className="text-blue-600 underline">
                click here
              </a>
            </div>

            {/* Connect with Host */}
            <div className="bg-[linear-gradient(280.37deg,_rgba(156,205,251,0.2)_0%,_rgba(252,201,146,0.2)_100%),_linear-gradient(107.22deg,_rgba(23,255,82,0.11)_1.46%,_rgba(1,108,110,0.11)_99.96%)] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Connect with Host
                  </span>
                </div>
                <button className="border border-gray-400 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Request Callback
                </button>
              </div>
            </div>

          </div>
        </aside>



      </div>
    </section>
  );
}
