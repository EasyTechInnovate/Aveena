import React from "react";

const Tour = () => {
  return (
    <div className="relative min-h-screen pt-20">
      {/* Background Image */}
      <img
        src="/assets/tour-bg.png"
        alt="tour bg"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24 lg:pb-40 text-center">
          
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Tour Packages Are <br className="hidden sm:block" />
            Coming Soon
          </h1>

          {/* Description */}
          <h5 className="text-sm sm:text-base text-white font-normal leading-relaxed max-w-3xl mx-auto">
            We’re curating unforgettable travel experiences just for you. From
            breathtaking landscapes to iconic landmarks, our upcoming tour
            packages are designed to make your next getaway stress-free,
            exciting, and memorable.
          </h5>

          {/* CTA */}
          <button className="mt-8 mx-auto w-full sm:w-auto py-3 px-10 sm:px-16 text-sm sm:text-md cursor-pointer bg-darkGreen text-white rounded-lg hover:opacity-90 transition">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tour;
