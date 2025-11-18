import React, { useState } from "react";
import { XCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LikeButton from "../common/LikeButton";

function HomeSection() {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  const photos = [
    "/assets/Outdoors.png",
    "/assets/chef.png",
    // "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
    // "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    // "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    // "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  ];

  return (
    <>
      <div className="p-4 max-w-7xl mx-auto">
        {/* Breadcrumb and Brochure Button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <a href="#" className="hover:underline">
              Home
            </a>
            <ChevronRight size={16} />
            <a href="#" className="hover:underline">
              Villas in Alibaug
            </a>
            <ChevronRight size={16} />
            <span className="text-gray-700 font-medium">
              Pranaam Villa in Alibaug
            </span>
          </div>

          <button className="flex items-center gap-2 border border-red-400 hover:bg-red-200 text-red-600 font-medium px-3 py-2 rounded-sm text-sm transition-colors duration-200">
            <img src="/assets/pdf.svg" alt="PDF Icon" className="w-5 h-5" />
            <span>View Brochure</span>
          </button>
        </div>

        {/* Main Image Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mt-4 gap-4">
          <div className="relative w-full lg:w-2/3 rounded-md overflow-hidden">
            <img
              src="/assets/Outdoors.png"
              alt="Villa view"
              className="w-full h-[300px] lg:h-[450px] object-cover"
            />

            <span className="absolute top-3 left-3 bg-white/90 flex items-center gap-2 text-xs px-3 py-2 rounded-md shadow font-medium">
              <img
                src="/assets/BestRated.svg"
                alt="Best Rated"
                className="w-4 h-4"
              />
              Best Rated
            </span>

            {/* View Photos Button */}
            <button
              onClick={() => setShowGallery(true)}
              className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black/50 backdrop-blur-md rounded-sm hover:bg-black/70 transition border border-gray-400"
            >
              <img
                src="/assets/view.svg"
                alt="View"
                className="w-5 h-5"
              />
              View Photos
            </button>
          </div>

          {/* Right side images */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="relative rounded-md overflow-hidden h-[200px] lg:h-[215px]">
              <img
                src="/assets/chef.png"
                alt="Chef"
                className="w-full h-full object-cover"
              />

              <button className="absolute top-3 right-15 flex items-center justify-center w-11 h-10 rounded-full transition">
                <img src="/assets/export.svg" alt="Export" className="w-11 h-11" />
              </button>

              <LikeButton />
            </div>

            <div className="relative rounded-md overflow-hidden h-[200px] lg:h-[215px]">
              <img
                src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1"
                alt="Poolside"
                className="w-full h-full object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                onClick={() => setShowGallery(true)}
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-semibold text-lg">+40 More</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence mode="wait">
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.15,
              ease: "easeOut"
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowGallery(false)}
            style={{ willChange: "opacity" }}
          >
            <motion.div
              initial={{ 
                scale: 0.9, 
                y: 10,
                opacity: 0
              }}
              animate={{ 
                scale: 1, 
                y: 0,
                opacity: 1
              }}
              exit={{ 
                scale: 0.9, 
                y: 10,
                opacity: 0
              }}
              transition={{ 
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="bg-white rounded-2xl shadow-xl max-w-6xl w-full h-[80vh] overflow-hidden flex"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)"
              }}
            >
              {/* Left — Big Image */}
              <div className="flex-1 bg-black flex items-center justify-center">
                <motion.img
                  key={selectedImg}
                  src={photos[selectedImg]}
                  alt="selected"
                  className="max-h-full max-w-full w-full object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ willChange: "transform, opacity" }}
                />
              </div>

              {/* Right — Thumbnails */}
              <div className="w-1/3 bg-gray-50 border-l overflow-y-auto p-3">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">Gallery</h2>
                  <motion.button
                    onClick={() => setShowGallery(false)}
                    className="text-gray-600 hover:text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.1 }}
                  >
                    <XCircle size={22} />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {photos.map((src, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedImg(i)}
                      className={`rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImg === i
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: i * 0.02,
                        duration: 0.15
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ willChange: "transform" }}
                    >
                      <img
                        src={src}
                        alt={`photo-${i}`}
                        className="w-full h-24 object-cover"
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HomeSection;
