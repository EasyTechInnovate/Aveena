"use client";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function RulesAndSpaces({ propertyDetails = {} }) {
  // Use spaces from API if available, otherwise use default
  const apiSpaces = propertyDetails.spaces || [];
  const defaultSpaces = [
    {
      id: 1,
      title: "Bedroom 1",
      img: "/assets/booking/room.png",
      label: "King-sized bed",
      desc: [
        "This is an air-conditioned room on the first floor.",
        "The room offers a king-sized bed, WiFi access and an attached balcony with a pool view.",
        "It has an attached bathroom equipped with a geyser, towels, basic toiletries and a separate dressing area.",
      ],
    },
    {
      id: 2,
      title: "Bedroom 2",
      img: "/assets/booking/room.png",
      label: "King-sized bed",
      desc: [
        "This is an air-conditioned room on the first floor.",
        "The room offers a king-sized bed, WiFi access and a garden view.",
        "It has an attached bathroom equipped with a geyser, towels, basic toiletries and a separate dressing area.",
      ],
    },
    {
      id: 3,
      title: "Bedroom 3",
      img: "/assets/booking/room.png",
      label: "King-sized bed",
      desc: [
        "This is an air-conditioned room on the first floor.",
        "The room offers a king-sized bed, WiFi access and a garden view.",
        "It has an attached bathroom equipped with a bathtub, towels and toiletries.",
      ],
    },
    {
      id: 4,
      title: "Bedroom 4",
      img: "/assets/booking/room.png",
      label: "King-sized bed",
      desc: [
        "This is an air-conditioned room on the first floor.",
        "The room offers a king-sized bed, WiFi access and a garden view.",
        "It has an attached bathroom equipped with a bathtub, towels and toiletries.",
      ],
    },
    {
      id: 5,
      title: "Bedroom 5",
      img: "/assets/booking/room.png",
      label: "King-sized bed",
      desc: [
        "This is an air-conditioned room on the first floor.",
        "The room offers a king-sized bed, WiFi access and a garden view.",
      ],
    },
  ];

  // Map API spaces to component format, or use default
  const spaces = apiSpaces.length > 0 
    ? apiSpaces.map((space, index) => ({
        id: space._id || index + 1,
        title: space.title || `Space ${index + 1}`,
        img: space.image || "/assets/booking/room.png",
        label: space.header || space.title || "",
        desc: space.pointers || []
      }))
    : defaultSpaces;

  const itemVariants = {
    // hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
    }
  };

  return (
        <motion.div 
          className="py-8"
          variants={itemVariants}
        >
          <motion.section 
            className="mb-10"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-lg font-semibold mb-4 flex items-center gap-2 border-l-4 border-[#F5959E] pl-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Rules and Refund Policy
            </motion.h2>

            <motion.div 
              className="flex items-start justify-between mb-4 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Dashed line - centered vertically with icons (icon w-6 = 24px + p-2 padding = 8px each side, total 40px, center is 20px) */}
              <div className="absolute top-5" style={{ left: '32px', right: 'calc(33.333% - 32px)', borderTop: '2px dashed #9ca3af', zIndex: 0 }} />
              
              <motion.div 
                className="flex flex-col w-1/3 items-start relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-full p-2 relative z-30">
                  <img src="/assets/booking/green.svg" alt="" className="w-6"/>
                </div>
                <p className="text-sm font-semibold mt-2 text-left">
                  100% Future Stay Voucher / <br /> Refund
                </p>
                <span className="text-xs text-gray-500 text-left">Before 12 days</span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col w-1/3 items-start relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-full p-2 relative z-30">
                  <img src="/assets/booking/yellow.svg" alt="" className="w-6"/>
                </div>
                <p className="text-sm font-semibold mt-2 text-left">
                  50% Future Stay Voucher / <br /> Refund
                </p>
                <span className="text-xs text-gray-500 text-left">6 to 12 days</span>
              </motion.div>

              <motion.div 
                className="flex flex-col w-1/3 items-start relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-full p-2 relative z-30">
                  <img src="/assets/booking/red.svg" alt="" className="w-6"/>
                </div>
                <p className="text-sm font-semibold mt-2 text-left">No Refund</p>
                <span className="text-xs text-gray-500 text-left">Less than 6 days</span>
              </motion.div>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              <button className="border border-gray-300 rounded-sm px-4 py-2 text-sm font-medium bg-light">
                Refund Policy
              </button>
              <button className="border border-gray-300 rounded-sm px-4 py-2 text-sm font-medium bg-light">
                Home Rules and Policy
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Check-in time:{" "}
              <span className="font-semibold">2PM</span>, Check-out
              time: <span className="font-semibold">11AM</span>
              <br />
              <span className="italic text-xs">
                Note: Early check-in and late check-out is subject to
                availability (at an additional fee)
              </span>
            </div>
          </motion.section>

          <motion.section
            variants={itemVariants}
          >
            <motion.h2 
              className="text-lg font-semibold mb-4 flex items-center gap-2 border-l-4 border-[#F5959E] pl-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Spaces
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Carousel
                opts={{
                  align: "start",
                  slidesToScroll: 1,
                }}
                className="w-full relative"
              >
                <CarouselContent className="-ml-4">
                  {spaces.map((room, index) => (
                    <CarouselItem
                      key={room.id}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/2"
                    >
                      <motion.div 
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <div className="relative h-[240px] overflow-hidden">
                          <motion.img
                            src={room.img}
                            alt={room.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="absolute top-2 right-2 bg-white/70 text-black text-xs px-2 py-1 rounded">
                            {room.label}
                          </span>
                          <div className="absolute bottom-2 left-2 text-white font-medium drop-shadow">
                            {room.title}
                          </div>
                        </div>
                        <div className="p-4 text-sm leading-relaxed space-y-2">
                          {room.desc.map((d, i) => (
                            <p key={i} className="flex items-start gap-2">
                              <span className="text-lg leading-5">•</span> {d}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full" />
                <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full" />
              </Carousel>
            </motion.div>
          </motion.section>
        </motion.div>
  );
}
