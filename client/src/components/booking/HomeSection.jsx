// client/src/components/booking/HomeSection.jsx
import React, { useState } from "react";
import { XCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LikeButton from "../common/LikeButton";

function HomeSection({ property }) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  if (!property) return null;

  const propertyData = property.property || {};
  const propertyDetails = property.propertyDetails || {};
  const propertyMedia = propertyDetails.propertyMedia || [];

  const photos = [
    propertyData.coverImage,
    ...propertyMedia.map(item => item.url)
  ].filter(Boolean);

  const getLocationString = () => propertyData.address?.fullAddress || "Alibaug, Maharashtra";
  const getPropertyTitle = () => propertyData.name || "Pranaam Villa";
  const getPropertyType = () => propertyData.type || "Villa";

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: `${getPropertyType()}s in ${getLocationString().split(',')[0] || 'Location'}`, href: "#" },
    { label: getPropertyTitle(), current: true }
  ];

  return (
    <>
      {/* Container with overflow protection */}
      <div className="pt-4 pb-2 md:py-4 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* Header: Breadcrumbs & Brochure Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 gap-2">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.current ? (
                  <span className="text-gray-700 font-medium line-clamp-1 max-w-[150px] md:max-w-none">
                    {item.label}
                  </span>
                ) : (
                  <a href={item.href} className="hover:underline whitespace-nowrap">
                    {item.label}
                  </a>
                )}
                {index < breadcrumb.length - 1 && <ChevronRight size={14} />}
              </React.Fragment>
            ))}
          </div>

          {/* <button className="hidden md:flex items-center gap-2 border border-red-400 hover:bg-red-200 text-red-600 font-medium px-3 py-2 rounded-sm text-sm transition-colors duration-200">
            <img src="/assets/pdf.svg" alt="PDF Icon" className="w-5 h-5" />
            <span>View Brochure</span>
          </button> */}
        </div>

        {/* Image Grid */}
        <div className="flex flex-col lg:flex-row gap-4 mt-4 h-auto lg:h-[450px]">
          
          {/* Main Image (Mobile: Full Width, Desktop: 2/3 Width) */}
          <div className="relative w-full lg:w-2/3 rounded-lg overflow-hidden h-[250px] md:h-[400px] lg:h-full group">
            <img
              src={photos[0] || "/assets/Outdoors.png"}
              alt={getPropertyTitle()}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { e.target.src = "/assets/Outdoors.png"; }}
            />

            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded shadow-sm font-semibold text-gray-800">
              <img src="/assets/BestRated.svg" alt="Best Rated" className="w-3.5 h-3.5" />
              Best Rated
            </span>

            <button
              onClick={() => setShowGallery(true)}
              className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm font-medium text-white bg-black/60 backdrop-blur-md rounded hover:bg-black/80 transition border border-white/20"
            >
              <img src="/assets/view.svg" alt="View" className="w-4 h-4" />
              View Photos ({photos.length})
            </button>
          </div>

          {/* Side Images (Hidden on Mobile/Tablet, visible on Large Desktop) */}
          <div className="hidden lg:flex w-1/3 flex-col gap-4 h-full">
            <div className="relative rounded-lg overflow-hidden h-1/2 group">
              <img
                src={photos[1] || "/assets/chef.png"}
                alt="Chef"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = "/assets/chef.png"; }}
              />
              <div className="absolute top-3 right-3 z-10">
                <LikeButton />
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-1/2 group cursor-pointer" onClick={() => setShowGallery(true)}>
              <img
                src={photos[2] || "https://images.unsplash.com/photo-1560347876-aeef00ee58a1"}
                alt="Property"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <span className="text-white font-semibold text-lg border border-white/50 px-4 py-2 rounded bg-black/20 backdrop-blur-sm">
                  +{photos.length > 2 ? photos.length - 2 : 0} More
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RESPONSIVE GALLERY MODAL --- */}
      <AnimatePresence mode="wait">
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-0 md:p-4"
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full h-full md:max-w-6xl md:h-[85vh] bg-black md:bg-white md:rounded-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button (Mobile: Top Right, Desktop: Hidden inside sidebar) */}
              <button 
                onClick={() => setShowGallery(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white md:hidden"
              >
                <XCircle size={24} />
              </button>

              {/* Main Image Area */}
              <div className="flex-1 bg-black flex items-center justify-center relative w-full h-[60vh] md:h-full">
                <motion.img
                  key={selectedImg}
                  src={photos[selectedImg]}
                  alt="selected"
                  className="max-h-full max-w-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Sidebar / Bottom Bar */}
              <div className="w-full h-[40vh] md:w-[350px] md:h-full bg-white md:border-l flex flex-col">
                <div className="p-4 border-b flex justify-between items-center bg-white">
                  <h2 className="font-semibold text-gray-900">Gallery ({photos.length})</h2>
                  <button onClick={() => setShowGallery(false)} className="hidden md:block text-gray-500 hover:text-black">
                    <XCircle size={24} />
                  </button>
                </div>
                
                {/* Thumbnails Grid */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                   <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
                    {photos.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImg(i)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImg === i ? "border-blue-600 ring-2 ring-blue-100" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                   </div>
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