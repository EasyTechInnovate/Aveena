import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { motion } from "framer-motion";

const reviews = [
  {
    text: "I highly recommend this hotel. The rooms are good and cozy, the location is convenient, and the staff is kind and welcoming.",
    author: "Ajahar",
    initials: "A",
    stayedAt: "aveena 7 Square",
    location: "Mumbai",
    date: "20 Jul"
  },
  {
    text: "Amazing, attentive staff and comfortable, clean rooms. Great location! I'd live here if I could. Definitely coming back. Thank you for the wonderful experience!",
    author: "Ram Kumar",
    initials: "RK",
    stayedAt: "aveena Bliss",
    location: "Ahmedabad",
    date: "30 Jul"
  },
  {
    text: "A true example of excellent hospitality! It was a pleasure visiting this property. The breakfast was well-assorted. I would highly recommend this hotel.",
    author: "Rakesh",
    initials: "R",
    stayedAt: "aveena Sapphire 83",
    location: "Gurgaon",
    date: "14 Jun"
  }
];



const Trusted = () => {
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

  const carouselVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const reviewVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="p-8 bg-light my-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="trusted-content max-w-7xl mx-auto">
        <motion.h1 
          className="font-normal text-3xl"
          variants={titleVariants}
        >
          Trusted by <motion.span 
            className="text-darkGreen"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >100,000+</motion.span> verified
          guests
        </motion.h1>

        <motion.div variants={carouselVariants}>
          <Carousel>
            <CarouselContent className="ml-4 gap-8 my-8">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 max-w-[400px]"
                >
                  <motion.div
                    className="p-8 rounded-2xl bg-white flex flex-col justify-between h-full"
                    variants={reviewVariants}
                    whileHover="hover"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Review text */}
                    <motion.h1 
                      className="text-darkBlue text-base leading-relaxed mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      "{review.text}"
                    </motion.h1>

                    {/* Bottom author section */}
                    <motion.div 
                      className="flex items-center gap-4 mt-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {/* Avatar Initial */}
                      <motion.div 
                        className="w-10 h-10 aspect-square rounded-full bg-green-100 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-green font-semibold">
                          {review.initials}
                        </span>
                      </motion.div>

                      {/* Author details */}
                      <div>
                        <h3 className="text-darkBlue font-semibold">{review.author}</h3>
                        <p className="text-gray-500 text-sm">
                          Stayed at {review.stayedAt} in {review.location} in {review.date}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Trusted;
