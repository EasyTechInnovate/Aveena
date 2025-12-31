"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, Star, StarHalf } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

function ReadMore({ text, maxChars = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxChars;

  return (
    <p className="text-gray-700 leading-relaxed text-lg">
      {isExpanded || !shouldTruncate ? text : `${text.slice(0, maxChars)}...`}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-1 text-gray-500 underline hover:text-gray-700 focus:outline-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </p>
  );
}

export default function GuestReviews({
  rating = 4.6,
  count = 63,
  summary = `The villa offers a serene ambience with beautiful decor, lush gardens,
  and fantastic amenities like pools, private dining, and thoughtful service.
  Great for families and groups who want a mix of relaxation and luxury.`,
  photos = [
    "/assets/bedroom.png",
    "/assets/bedroom.png",
    "/assets/bedroom.png",
    "/assets/bedroom.png",
    "/assets/bedroom.png",
    "/assets/bedroom.png",
  ],
}) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const villas = [
    {
      name: "Moksh Villa",
      price: "₹40,239",
      description:
        "Moksh Villa is special because of its: - Convenient location, easily accessible yet offering tranquility - Surroundings that are enveloped in lush greenery, creating a serene atmosphere - Orchard and cascading waterfalls that add natural beauty to the...",
      image: "/assets/booking/room.png",
    },
    {
      name: "Jay House",
      price: "₹40,840",
      description:
        "Imagine being cast away in the heart of Alibaug, surrounded by unending greenery and fascinating encounters. Jay House may be one of this city's best-kept secrets. With a large selection of tempting facilities that must be experienced, this spacious vacation house transports you into...",
      image: "/assets/booking/lavida-features.png",
    },
    {
      name: "Villa Amaaya",
      price: "₹26,679",
      description:
        "Nestled in unending expanses of green verdancy and foliage, Villa Amaaya is a spacious holiday home in the coastal town of Alibaug. Approximately 5 km. away from Kih beach, this villa has everything you would need for a sun-kissed getaway, be it the huge oval-shape...",
      image: "/assets/booking/lavida-features1.png",
    },
    {
      name: "Villa Serenity",
      price: "₹35,500",
      description:
        "Experience ultimate luxury at Villa Serenity, featuring panoramic ocean views and world-class amenities. This stunning property offers private beach access and personalized concierge services for an unforgettable stay...",
      image: "/assets/booking/lavida-features2.png",
    },
    {
      name: "Ocean Breeze Villa",
      price: "₹28,900",
      description:
        "Wake up to the sound of waves at Ocean Breeze Villa. This beachfront property combines modern comfort with traditional architecture, offering direct access to pristine beaches and water sports facilities...",
      image: "/assets/booking/lavida-features3.png",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setTotalSlides(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Escape" && setShowGallery(false);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div>
      <div>
        <h3 className="text-lg font-semibold mb-6 border-l-4 border-[#F5959E] pl-3">
          Guest Reviews
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-start gap-5">
            <div className="flex flex-col items-center justify-center flex-1 shrink-0">
              <div className="relative w-fit flex justify-center items-center gap-2 mt-8">
                <div className="flex justify-center items-center gap-1 text-yellow-500">
                  <Star
                    className="w-4 h-4 transform -translate-y-[4px] rotate-[-30deg]"
                    fill="#FFA500"
                  />
                  <Star
                    className="w-6 h-6 transform -translate-y-[12px] rotate-[-15deg]"
                    fill="#FFA500"
                  />
                  <Star
                    className="w-10 h-10 transform -translate-y-[22px]"
                    fill="#FFA500"
                  />
                  <Star
                    className="w-6 h-6 transform -translate-y-[12px] rotate-[15deg]"
                    fill="#FFA500"
                  />
                  <StarHalf
                    className="w-4 h-4 transform -translate-y-[4px] rotate-[30deg]"
                    fill="#FFA500"
                  />
                </div>
              </div>

              {/* Rating Number */}
              <div className="mt-2 text-3xl font-bold leading-none">
                {Number(rating).toFixed(1)}
                <span className="text-sm font-semibold text-gray-500">/5</span>
              </div>

              {/* Tagline */}
              <div className="flex gap-1 items-center">
                <img
                  src="/assets/booking/guestFav_left_leaf.svg"
                  alt="left leaf"
                  className="h-6"
                />
                <h4 className="text-center font-bold text-md">Like a 5*</h4>
                <img
                  src="/assets/booking/guestFav_right_leaf.svg"
                  alt="right leaf"
                  className="h-6"
                />
              </div>

              {/* Review Count */}
              <a
                href="#"
                className="text-xs text-blue font-bold mt-1 underline"
              >
                ({count} Reviews)
              </a>
            </div>

            {/* Summary */}
            <div className="flex-1 self-start">
              <h4 className="text-sm font-semibold mb-1">Summary</h4>
              <ReadMore text={summary} maxChars={60} />

              <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                <img
                  src="/assets/booking/ai_stars.svg"
                  alt="ai_stars"
                  className="w-4"
                />
                <span className="text-xs text-blue">
                  Based on real reviews, summarised by AI
                </span>
              </div>
            </div>
          </div>

          {/* Photos Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Guest Photos</h4>
              <button
                onClick={() => setShowGallery(true)}
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                See all
              </button>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="row-span-2">
                <img
                  src={photos[0]}
                  alt="guest main"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => {
                    setSelectedImg(photos[0]);
                    setShowGallery(true);
                  }}
                />
              </div>

              <div className="grid grid-rows-2 gap-2">
                {photos.slice(1, 3).map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    alt={`guest small ${i + 1}`}
                    className="w-full h-20 object-cover rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelectedImg(p);
                      setShowGallery(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <div className="rounded-full bg-green/10 border border-green px-4 py-1 text-green">
                <h4 className="text-sm font-medium">All</h4>
              </div>
              <div className="rounded-full border border-darkGray px-4 py-1 text-darkGray">
                <h4 className="text-sm font-medium">amenities</h4>
              </div>
              <div className="rounded-full border border-darkGray px-4 py-1 text-darkGray">
                <h4 className="text-sm font-medium">stay</h4>
              </div>

              <div className="rounded-full border border-darkGray px-4 py-1 text-darkGray">
                {" "}
                <h4 className="text-sm font-medium">food</h4>{" "}
              </div>
              <div className="rounded-full border border-darkGray px-4 py-1 text-darkGray">
                {" "}
                <h4 className="text-sm font-medium">service</h4>{" "}
              </div>
              <div className="rounded-full border border-darkGray px-4 py-1 text-darkGray">
                {" "}
                <h4 className="text-sm font-medium">view</h4>{" "}
              </div>
            </div>

            <div className="flex items-center gap-2 border-l-3 border-gray-300 pl-4">
              <h4>Sort by:</h4>
              <div className="rounded-full bg-green/10 border border-green px-4 py-1 text-green">
                <h4 className="text-sm font-medium">All</h4>
              </div>
              <div className="rounded-full border border-darkGray px-4 py-1 text-darkGray">
                <h4 className="text-sm font-medium">amenities</h4>
              </div>
            </div>
          </div>

          <div className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Review Card 1 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full w-14 h-14 flex items-center justify-center bg-amber-300">
                    <h4 className="text-xl text-white font-semibold">MM</h4>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      Maj. MAHENDRA VISHVANATH ITKARKAR
                    </h3>
                    <p className="text-sm text-gray-500">few months ago</p>
                  </div>
                  <div>
                    <div className="p-1 rounded bg-[#2196531A] flex items-center gap-1 mb-2">
                      <img
                        src="/assets/booking/top-review.svg"
                        alt="star"
                        className="w-4"
                      />
                      <h5 className="text-sm font-normal">Top Review</h5>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/booking/star.svg"
                        alt="star"
                        className="w-4"
                      />
                      <span className="text-sm font-medium">5</span>
                      <span className="text-sm text-gray-500">/5</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 my-4">
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Stay
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Service
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      View
                    </h4>
                  </div>
                </div>

                <div className="mb-4">
                  <ReadMore
                    text="Our experience was Simply Fantastic The property was mich more beautiful than the pictures The staff was very helpful throughout our stay. Highly recommended for families and groups who want a mix of relaxation and luxury."
                    maxChars={100}
                  />
                </div>

                <div className="flex py-4 gap-4 mb-4">
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden relative">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                    <div className="absolute bg-black/30 w-full h-full top-0 flex items-center justify-center">
                      <h4 className="text-white text-2xl font-bold">1+</h4>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <h5 className="text-lg font-medium text-gray-500">
                    Was this helpful?
                  </h5>
                  <span className="flex items-center gap-1">
                    <img
                      src="/assets/booking/like.svg"
                      alt="like"
                      className="w-6 h-6"
                    />
                    <h5 className="text-lg font-medium text-gray-500">4</h5>
                  </span>
                </div>
              </div>

              {/* Review Card 2 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full w-14 h-14 flex items-center justify-center bg-amber-300">
                    <h4 className="text-xl text-white font-semibold">IS</h4>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      Ishan Selarka Selarka
                    </h3>
                    <p className="text-sm text-gray-500">few months ago</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/booking/star.svg"
                        alt="star"
                        className="w-4"
                      />
                      <span className="text-sm font-medium">5</span>
                      <span className="text-sm text-gray-500">/5</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 my-4">
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Stay
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Food
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Service
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      View
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Amenities
                    </h4>
                  </div>
                </div>

                <div className="mb-4">
                  <ReadMore
                    text="Dear manager DUTTA We recently had the pleasure of staying at pranam villa with my family members. Great experience overall. The food was delicious and the amenities were top-notch. The service staff was very attentive and made our stay memorable."
                    maxChars={100}
                  />
                </div>

                <div className="flex py-4 gap-4 mb-4">
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden relative">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                    <div className="absolute bg-black/30 w-full h-full top-0 flex items-center justify-center">
                      <h4 className="text-white text-2xl font-bold">2+</h4>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <h5 className="text-lg font-medium text-gray-500">
                    Was this helpful?
                  </h5>
                  <span className="flex items-center gap-1">
                    <img
                      src="/assets/booking/like.svg"
                      alt="like"
                      className="w-6 h-6"
                    />
                    <h5 className="text-lg font-medium text-gray-500">5</h5>
                  </span>
                </div>
              </div>

              {/* Review Card 3 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full w-14 h-14 flex items-center justify-center bg-amber-300">
                    <h4 className="text-xl text-white font-semibold">GJ</h4>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Gunjan Jain</h3>
                    <p className="text-sm text-gray-500">few months ago</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/booking/star.svg"
                        alt="star"
                        className="w-4"
                      />
                      <span className="text-sm font-medium">5</span>
                      <span className="text-sm text-gray-500">/5</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 my-4">
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Stay
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Food
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Service
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Amenities
                    </h4>
                  </div>
                </div>

                <div className="mb-4">
                  <ReadMore
                    text="The stay here was amazing! Experience was A1. The food was amazing, the hospitality was top notch, and the amenities were excellent. Perfect getaway destination for families and groups."
                    maxChars={100}
                  />
                </div>

                <div className="flex py-4 gap-4 mb-4">
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" w-28 h-20 rounded-2xl overflow-hidden relative">
                    <img
                      src="/assets/booking/review-img.png"
                      alt="user"
                      className="w-full h-full"
                    />
                    <div className="absolute bg-black/30 w-full h-full top-0 flex items-center justify-center">
                      <h4 className="text-white text-2xl font-bold">1+</h4>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <h5 className="text-lg font-medium text-gray-500">
                    Was this helpful?
                  </h5>
                  <span className="flex items-center gap-1">
                    <img
                      src="/assets/booking/like.svg"
                      alt="like"
                      className="w-6 h-6"
                    />
                    <h5 className="text-lg font-medium text-gray-500">4</h5>
                  </span>
                </div>
              </div>

              {/* Review Card 4 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full w-14 h-14 flex items-center justify-center bg-amber-300">
                    <h4 className="text-xl text-white font-semibold">RS</h4>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">RANDHIR SAWANT</h3>
                    <p className="text-sm text-gray-500">Most recent</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/booking/star.svg"
                        alt="star"
                        className="w-4"
                      />
                      <span className="text-sm font-medium">5</span>
                      <span className="text-sm text-gray-500">/5</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 my-4">
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Stay
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Food
                    </h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="/assets/booking/tag-tick.svg"
                      alt="review"
                      className="w-6 h-6"
                    />
                    <h4 className="text-lg text-[#1E1E1ECC] font-semibold">
                      Service
                    </h4>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-lg font-normal">
                    awesome property, ambience, good food and service.
                  </h2>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <h5 className="text-lg font-medium text-gray-500">
                    Was this helpful?
                  </h5>
                  <span className="flex items-center gap-1">
                    <img
                      src="/assets/booking/like.svg"
                      alt="like"
                      className="w-6 h-6"
                    />
                    <h5 className="text-lg font-medium text-gray-500">3</h5>
                  </span>
                </div>
              </div>
            </div>

            {/* See All Reviews Link */}
            <div className="text-center mt-8">
              <a
                href="#"
                className="text-blue-600 font-medium hover:underline text-lg"
              >
                See all Reviews
              </a>
            </div>
          </div>
        </div>

        {/* Villa Amenities Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 border-l-4 border-[#F5959E] pl-3">
            Villa Amenities
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {/* BBQ */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/bbq.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">BBQ</h4>
                <p className="text-green text-sm font-medium">₹1,500</p>
              </div>
            </div>

            {/* Lawn */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/lawn1.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Lawn</h4>
              </div>
            </div>

            {/* Private Pool */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/pool1.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Private Pool</h4>
              </div>
            </div>

            {/* Balcony/ Terrace */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/balcony.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Balcony/ Terrace</h4>
              </div>
            </div>

            {/* AC */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/ac.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">AC</h4>
              </div>
            </div>

            {/* Wi-Fi */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/wifi1.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Wi-Fi</h4>
              </div>
            </div>

            {/* Indoor/ Outdoor Games */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/indoor.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Indoor/ Outdoor Games</h4>
              </div>
            </div>

            {/* Music System/ Speaker */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/music.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Music System/ Speaker</h4>
              </div>
            </div>

            {/* TV */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/tv.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">TV</h4>
              </div>
            </div>

            {/* Refrigerator */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/refrigerator.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Refrigerator</h4>
              </div>
            </div>

            {/* Bar */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/bar1.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Bar</h4>
              </div>
            </div>

            {/* Wheelchair Friendly */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/wheelchair.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Wheelchair Friendly</h4>
              </div>
            </div>

            {/* Parking */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/parking.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Parking</h4>
              </div>
            </div>

            {/* Fire Extinguisher */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/booking/fire.svg"
                  alt=""
                  className="w-fill h-full"
                />
              </div>
              <div>
                <h4 className="text-lg text-darkGray">Fire Extinguisher</h4>
              </div>
            </div>

            {/* +7 more */}
            <div className="flex items-center gap-4 p-4">
              <div>
                <a
                  href="#"
                  className="text-blue-600 font-medium hover:underline"
                >
                  +7 more
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Meals Section */}

        {/* Villa Location Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 border-l-4 border-[#F5959E] pl-3">
            Villa Location
          </h3>

          {/* Location Card with Map */}
          <div className="bg-gray-50 rounded-lg mb-8">
            {/* Embedded Map */}
            <div className="w-lg h-80 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.234567890123!2d72.8791234567890!3d18.7654321098765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8b8b8b8b8b8%3A0x1234567890abcdef!2sAlibaug%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Villa Location Map"
              ></iframe>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {isLocationExpanded ? (
                <>
                  An ideal getaway from the city's chaotic life, Alibaug shares
                  its boundaries with the magnificent Arabian Sea. It is most
                  commonly known for its sea forts, virgin beaches, black sand,
                  mouthwatering seafood and a myriad of adventurous water
                  sports. So, while you're here, make sure to explore the
                  historic forts, relax on the pristine beaches, and indulge in
                  the local culinary delights that this coastal paradise has to
                  offer.
                  <br />
                  <br />
                  The region is also famous for its colonial architecture, with
                  several heritage buildings and churches that tell the story of
                  its Portuguese past. Visitors can enjoy activities like
                  kayaking, parasailing, and jet skiing along the pristine
                  coastline. The local markets offer fresh seafood, traditional
                  Konkani cuisine, and handmade crafts that make for perfect
                  souvenirs.
                  <br />
                  <br />
                  For those interested in history, the nearby forts like Kolaba
                  Fort and Murud-Janjira Fort offer fascinating insights into
                  the region's maritime heritage. The area is also home to
                  several luxury resorts and beachside villas that provide the
                  perfect setting for a relaxing vacation.
                </>
              ) : (
                "An ideal getaway from the city's chaotic life, Alibaug shares its boundaries with the magnificent Arabian Sea. It is most commonly known for its sea forts, virgin beaches, black sand, mouthwatering seafood and a myriad of adventurous water sports. So, while you're here, make sure to explore the historic forts, relax on the pristine beaches, and indulge in the local culinary delights that this coastal paradise has to offer."
              )}
            </p>
            <button
              onClick={() => setIsLocationExpanded(!isLocationExpanded)}
              className="text-blue-600 hover:underline mt-2 inline-block focus:outline-none"
            >
              {isLocationExpanded ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-200"></div>
        </div>

        {/* Experiences Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4 border-l-4 border-[#F5959E] pl-3">
            Experiences
          </h3>
          <div className="flex gap-4 mb-6">
            <div className="w-1/3 rounded-2xl overflow-hidden">
              <img
                src="/assets/booking/exp-img-0.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/3 rounded-2xl overflow-hidden">
              <img
                src="/assets/booking/exp-img-2.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/3 rounded-2xl overflow-hidden">
              <img
                src="/assets/booking/exp-img-3.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Discover unique experiences and activities that will make your stay
            at Pranaam truly memorable. From local cultural tours to adventure
            activities, we have something special for every guest.
          </p>
          <button className="px-4 py-2 text-darkGray text-sm font-medium rounded border-2 border-darkGray transition-colors">
            View Experiences
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h3 className="text-2xl font-bold border-l-4 border-[#F5959E] pl-3">
              FAQ's related to Pranaam - Alibaug
            </h3>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Explore Your Stay Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h3 className="text-2xl font-bold border-l-4 border-[#F5959E] pl-3">
              Explore Your Stay
            </h3>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Nearby Villas Section */}
        <div className="mt-16">
          {/* Section Header with Navigation */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold border-l-4 border-[#F5959E] pl-3">
              Nearby Villas
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => api?.scrollPrev()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={!api?.canScrollPrev()}
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-sm text-gray-600 font-medium">
                {current}/{totalSlides}
              </span>
              <button
                onClick={() => api?.scrollNext()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={!api?.canScrollNext()}
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Villa Cards Container with Carousel */}
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {villas.map((villa, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={villa.image}
                        alt={villa.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {villa.name}
                      </h4>
                      <p className="text-lg font-semibold mb-3">
                        {villa.price}{" "}
                        <span className="text-sm font-normal text-gray-600">
                          /Night
                        </span>
                      </p>
                      <p className="text-sm text-darkGray leading-relaxed">
                        {villa.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
              ease: "easeOut",
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={() => setShowGallery(false)}
            style={{ willChange: "opacity" }}
          >
            <motion.div
              initial={{
                y: 8,
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                y: 8,
                scale: 0.95,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className=" w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
              }}
            >
              {/* Left: Large Selected Image */}
              <div className="flex-1 bg-gray-50 flex items-center justify-center p-4">
                <motion.img
                  key={selectedImg || photos[0]}
                  src={selectedImg || photos[0]}
                  alt="Selected"
                  className="max-h-[80vh] w-full rounded-lg object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ willChange: "transform, opacity" }}
                />
              </div>

              {/* Right: Thumbnail List */}
              <div className="w-full md:w-64 border-l border-gray-200 p-4 overflow-y-auto max-h-[80vh]">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-sm">Guest Photos</h5>
                  <motion.button
                    onClick={() => setShowGallery(false)}
                    aria-label="Close gallery"
                    className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.1 }}
                  >
                    <XCircle size={18} />
                  </motion.button>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
                  {photos.map((p, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedImg(p)}
                      className={`overflow-hidden rounded-md border transition-colors ${
                        selectedImg === p
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.02,
                        duration: 0.15,
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ willChange: "transform" }}
                    >
                      <img
                        src={p}
                        alt={`photo ${i + 1}`}
                        className="w-full h-20 object-cover"
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
    </motion.div>
  );
}
