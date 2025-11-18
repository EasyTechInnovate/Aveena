import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { motion } from "framer-motion";

const favourites = [
  {
    name: "Sea view",
    image: "/assets/sea-view.png",
  },
  {
    name: "Apart hotel",
    image: "/assets/apart-hotel.png",
  },
  {
    name: "Spa",
    image: "/assets/spa.png",
  },
  {
    name: "Apartment",
    image: "/assets/apartment.png",
  },
  {
    name: "Resort",
    image: "/assets/resort.png",
  },
];

const FavouriteStay = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto my-10 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1 
        className="text-3xl text-darkBlue font-semibold mb-6"
        variants={titleVariants}
      >
        Discover your new favourite stay
      </motion.h1>

      <motion.div variants={carouselVariants}>
        <Carousel>
          <CarouselContent className="my-6">
            {favourites.map((fav, index) => (
              <CarouselItem
                key={index}
                className="aspect-[9/12] max-w-[180px] md:max-w-[180px] lg:max-w-[280px]"
              >
                <motion.div 
                  className="relative rounded-2xl h-full overflow-hidden shadow-md"
                  variants={cardVariants}
                  whileHover="hover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Image */}
                  <motion.img
                    src={fav.image}
                    alt={fav.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-black/30 flex items-end p-3"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h5 
                      className="font-semibold text-md text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {fav.name}
                    </motion.h5>
                  </motion.div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </motion.div>
  );
};

export default FavouriteStay;