import { motion } from "framer-motion";
import React from 'react'


const ComingSoon =() => {
  const handleEnquireClick = () => {
    window.location.href = "mailto:booking@avenaa.co.in";
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-8"
      style={{ backgroundColor: '#F2FFFC' }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src="/assets/background.svg"
          alt="City skyline background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">

        {/* Coming Soon Text */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-800 mb-4 sm:mb-8 tracking-wider"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "backOut" }}
        >
          COMING SOON
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl leading-relaxed px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
        >
          We&apos;re rebuilding <span className="text-green-600 font-semibold">Avenaa</span> to serve you faster, smoother, and smarter than ever before!
        </motion.p>

        {/* Enquire Now Button */}
        <motion.button
          onClick={handleEnquireClick}
          className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg mb-8 sm:mb-16"
          style={{ backgroundColor: '#22943F' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(34, 148, 63, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Enquire Now
        </motion.button>

        {/* Contact Information */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200 w-full max-w-xs sm:max-w-lg md:max-w-none"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.9, ease: "easeOut" }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              className="text-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.2, ease: "easeOut" }}
            >
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                For Booking enquiries
              </h3>
              <a
                href="mailto:booking@avenaa.co.in"
                className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors break-all"
              >
                booking@avenaa.co.in
              </a>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.4, ease: "easeOut" }}
            >
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                For Patron enquiries
              </h3>
              <a
                href="mailto:patron@avenaa.co.in"
                className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-green-600 transition-colors break-all"
              >
                patron@avenaa.co.in
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ComingSoon;