import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TravelerSelector from "../common/TravelerSelector";
import LocationSelector from "../common/LocationSelector";
import DatePicker from "../common/DatePicker";
import { motion, AnimatePresence } from "framer-motion";


const tabs = [
  { name: "Stays", icon: "/assets/stays.svg" },
  { name: "Tour Package", icon: "/assets/tour-package.svg", path: "/tour" },
  { name: "Visa Service", icon: "/assets/visa-services.svg", path: "/visa" },
];

const Search = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [travelers, setTravelers] = useState({
    adults: 2,
    childrens: 0,
    rooms: 1,
  });
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
    if (tab.path) {
      navigate(tab.path);
    }
  };

const handleSearch = () => {
  if (!location) {
    alert("Please select a location.");
    return;
  }

  const params = new URLSearchParams({
    location,
    checkIn: dates.checkIn,
    checkOut: dates.checkOut,
    adults: travelers.adults,
    childrens: travelers.childrens,
    rooms: travelers.rooms,
  }).toString();

  navigate(`/search?${params}`);
};


  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      id="search"
      className="max-w-7xl mx-auto mb-6 border-2 border-gray-200 rounded-2xl w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Tabs */}
      <div className="search-top flex items-center justify-center">
        <div className="flex items-center gap-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.name}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-300 ${
                activeTab === tab.name
                  ? "text-green border-b-[3px] border-green"
                  : "text-darkBlue border-b-[3px] border-transparent hover:text-green"
              }`}
              variants={tabVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.img
                src={tab.icon}
                alt={tab.name}
                className="w-10 h-10 object-contain mb-1"
                whileHover={{ rotate: activeTab === tab.name ? 0 : 5 }}
                transition={{ duration: 0.2 }}
              />
              <h5 className="font-semibold">{tab.name}</h5>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Content */}
      <div className="search-bottom border-t-2 border-gray-200 p-8">
        <AnimatePresence mode="wait">
          {activeTab === "Stays" && (
            <motion.div
              key="stays"
              id="stays"
              className="flex items-center gap-4 flex-wrap lg:flex-nowrap"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Where */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <LocationSelector
                  value={location}
                  onChange={setLocation}
                  className="w-full"
                />
              </motion.div>

              {/* Dates */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <DatePicker
                  value={dates}
                  onChange={setDates}
                  className="w-full"
                />
              </motion.div>

              {/* Travellers */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <TravelerSelector
                  value={travelers}
                  onChange={setTravelers}
                  className="w-full"
                />
              </motion.div>

              {/* Search Button */}
              <motion.button 
                onClick={handleSearch}
                className="flex items-center gap-2 bg-green px-6 py-4 rounded-xl text-white font-medium hover:bg-darkGreen transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img 
                  src="/assets/search.svg" 
                  alt="search stay" 
                  className="w-5 h-5"
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                />
                Search
              </motion.button>
            </motion.div>
          )}

          {activeTab === "Tour Package" && (
            <motion.p 
              key="tour"
              className="text-darkBlue font-medium"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Redirecting to tour packages...
            </motion.p>
          )}
          
          {activeTab === "Visa Service" && (
            <motion.p 
              key="visa"
              className="text-darkBlue font-medium"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Redirecting to visa services...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Search;