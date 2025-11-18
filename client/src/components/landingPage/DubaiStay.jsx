import React from 'react'
import { motion } from 'framer-motion'

const DubaiStay = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className='max-w-7xl mx-auto rounded-2xl my-7 overflow-hidden flex flex-col lg:flex-row border-2 border-gray-300'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Image Section */}
      <motion.div 
        className="lg:flex-1"
        variants={imageVariants}
      >
        <motion.img 
          src="/assets/dubaistay.png" 
          alt="Dubai skyline and attractions" 
          className='h-64 w-full object-cover lg:h-full'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {/* Content Section */}
      <motion.div 
        className="px-6 py-8 lg:flex-1 lg:flex lg:flex-col lg:justify-center"
        variants={contentVariants}
      >
        <motion.img 
          src="/assets/emirates.png" 
          alt="Emirates logo" 
          className='w-20 mb-6'
          variants={logoVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        />
        <motion.h1 
          className='font-semibold text-xl md:text-2xl text-darkBlue mb-4'
          variants={textVariants}
        >
          Book an unforgettable Dubai stay
        </motion.h1>
        <motion.p 
          className='text-darkBlue text-base md:text-md'
          variants={textVariants}
        >
          Sunny beaches, luxury hotels, diverse cuisine - there's something for everyone.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default DubaiStay