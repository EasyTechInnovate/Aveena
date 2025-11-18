import React from "react";
import { motion } from "framer-motion";
import HomeSection from "../components/booking/HomeSection";
import BookingOverview from "../components/booking/BookingOverview";

function BookingPage() {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible" className="mx-auto pt-20 max-w-7xl px-4"
    >
      <motion.div variants={sectionVariants}>
        <HomeSection />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <BookingOverview />
      </motion.div>

      


      
      
    </motion.div>
  );
}

export default BookingPage;
