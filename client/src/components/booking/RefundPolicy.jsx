"use client";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useNavigate } from "react-router-dom";

export default function RulesAndSpaces({ propertyDetails = {} }) {
  const navigate = useNavigate();
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
    visible: { opacity: 1 }
  };

  return (
    <motion.div 
      className="py-6 md:py-8"
      variants={itemVariants}
    >
      <motion.section 
        className="mb-10"
        variants={itemVariants}
      >
        <motion.h2 
          className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2 border-l-4 border-[#F5959E] pl-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Rules and Refund Policy
        </motion.h2>

        {/* --- Refund Timeline Section --- */}
        <motion.div 
          // Responsive: Flex Column on mobile, Flex Row on desktop
          className="flex flex-col md:flex-row items-start justify-between mb-8 relative gap-6 md:gap-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Dashed line - Hidden on mobile (hidden), visible on desktop (md:block) */}
          <div 
            className="hidden md:block absolute top-5" 
            style={{ left: '32px', right: 'calc(33.333% - 32px)', borderTop: '2px dashed #9ca3af', zIndex: 0 }} 
          />
          
          {/* Item 1 */}
          <motion.div 
            // Responsive: Row on mobile (Icon left of text), Col on desktop (Icon above text)
            className="flex flex-row md:flex-col w-full md:w-1/3 items-center md:items-start relative z-10 gap-4 md:gap-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-full p-2 relative z-30 shrink-0 shadow-sm border border-gray-100 md:border-none md:shadow-none">
              <img src="/assets/booking/green.svg" alt="" className="w-8 md:w-6"/>
            </div>
            <div>
              <p className="text-sm font-semibold mt-0 md:mt-2 text-left leading-tight">
                100% Future Stay Voucher / <br className="hidden md:block"/> Refund
              </p>
              <span className="text-xs text-gray-500 text-left block mt-1">Before 12 days</span>
            </div>
          </motion.div>
          
          {/* Item 2 */}
          <motion.div 
             className="flex flex-row md:flex-col w-full md:w-1/3 items-center md:items-start relative z-10 gap-4 md:gap-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-full p-2 relative z-30 shrink-0 shadow-sm border border-gray-100 md:border-none md:shadow-none">
              <img src="/assets/booking/yellow.svg" alt="" className="w-8 md:w-6"/>
            </div>
            <div>
              <p className="text-sm font-semibold mt-0 md:mt-2 text-left leading-tight">
                50% Future Stay Voucher / <br className="hidden md:block"/> Refund
              </p>
              <span className="text-xs text-gray-500 text-left block mt-1">6 to 12 days</span>
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div 
             className="flex flex-row md:flex-col w-full md:w-1/3 items-center md:items-start relative z-10 gap-4 md:gap-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-full p-2 relative z-30 shrink-0 shadow-sm border border-gray-100 md:border-none md:shadow-none">
              <img src="/assets/booking/red.svg" alt="" className="w-8 md:w-6"/>
            </div>
            <div>
              <p className="text-sm font-semibold mt-0 md:mt-2 text-left leading-tight">No Refund</p>
              <span className="text-xs text-gray-500 text-left block mt-1">Less than 6 days</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          <button className="border border-gray-300 rounded-sm px-4 py-2 text-sm font-medium bg-light w-full sm:w-auto" onClick={() => navigate('/refund-policy')}>
            Refund Policy
          </button>
          <button className="border border-gray-300 rounded-sm px-4 py-2 text-sm font-medium bg-light w-full sm:w-auto" onClick={() => navigate('/refund-policy')}>
            Home Rules and Policy
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg md:bg-transparent md:p-0">
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
            <span>Check-in time: <span className="font-semibold text-gray-700">2PM</span></span>
            <span className="hidden md:inline">|</span>
            <span>Check-out time: <span className="font-semibold text-gray-700">11AM</span></span>
          </div>
          <span className="italic text-xs block">
            Note: Early check-in and late check-out is subject to availability (at an additional fee)
          </span>
        </div>
      </motion.section>

     
    </motion.div>
  );
}