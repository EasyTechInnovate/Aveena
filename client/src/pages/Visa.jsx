import React from "react";

const Visa = () => {
  return (
    <div className="relative min-h-screen pt-20">
      {/* Background Image */}
      <img
        src="/assets/visa-bg.png"
        alt="visa bg"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24 lg:pb-40 text-center">
          
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Hassle-Free Visa <br className="hidden sm:block" />
            Coming Soon
          </h1>

          {/* Description */}
          <h5 className="text-sm sm:text-base text-white font-normal leading-relaxed max-w-3xl mx-auto">
            We’re preparing to launch our dedicated Visa Service to make your
            international travel smoother than ever. Whether it’s for tourism,
            business, or study, our expert team will guide you through the
            process—step by step.
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

export default Visa;
