import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hotels = ({ hotels }) => {
  const navigate = useNavigate();

  /* =========================
     CLICK HANDLER
     ========================= */
  const handleHotelClick = (hotel) => {
    if (hotel._id) {
      navigate(`/booking/${hotel._id}`);
    }
  };

  const hotelVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hover: {
      scale: 1.01,
      y: -2,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Carousel>
      <CarouselContent className="my-8">
        {hotels.map((hotel, index) => (
          <CarouselItem
            key={index}
            className="pl-4 max-w-[320px] md:max-w-[350px] lg:max-w-[400px]"
          >
            <div
              className="block cursor-pointer"
              onClick={() => handleHotelClick(hotel)}
            >
              <motion.div
                className="hotel rounded-2xl overflow-hidden shadow bg-white flex flex-col"
                variants={hotelVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
              >
                {/* Top */}
                <div className="hotel-top relative">
                  <motion.img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-52 object-cover rounded-t-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Best Rated Badge */}
                  {index === 0 && (
                    <motion.div
                      className="best-rated bg-darkGreen text-white text-sm px-3 py-1 flex gap-2 items-center absolute bottom-0 right-0 rounded-tl-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <img src="/assets/bestRating.svg" alt="rate" />
                      <span>Best Rated</span>
                    </motion.div>
                  )}
                </div>

                {/* Details */}
                <div className="hotel-details p-5 flex flex-col flex-1">
                  <motion.div
                    className="hd-top border-b border-gray-200 pb-3 mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <h3 className="font-semibold text-lg text-darkBlue">
                      {hotel.name}
                    </h3>

                    <span className="flex gap-2 items-center mt-1 text-sm">
                      <img
                        src="/assets/address.svg"
                        alt="location"
                        className="h-4"
                      />
                      <p className="text-[#1E1E1E]/75">
                        {hotel.address}
                      </p>
                    </span>

                    <div className="flex items-center gap-1 text-[#4F4F4F]/80 flex-wrap mt-2 text-xs">
                      <span>Upto</span> {hotel.maxGuests} <span>Guests</span>
                      <img src="/assets/start4.svg" alt="star" className="w-3" />
                      {hotel.rooms} <span>Rooms</span>
                      <img src="/assets/start4.svg" alt="star" className="w-3" />
                      {hotel.baths} <span>Baths</span>
                    </div>
                  </motion.div>

                  {/* Bottom */}
                  <motion.div
                    className="hd-bottom flex items-center justify-between mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div>
                      <h2 className="font-semibold text-xl">
                        ₹{hotel.perNight}
                      </h2>
                      <h5 className="text-[#1E1E1E]/75 text-sm">
                        Per Night + Taxes
                      </h5>
                    </div>

                    <motion.div
                      className="border rounded-md p-2 hover:bg-gray-50 transition"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src="/assets/hotel-airo.svg"
                        alt="Book Now"
                        className="w-8"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Hotels;
