import React from "react";

const Story = () => {
  return (
    <div className="py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          Real stories. Real growth.
        </h1>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
          {/* First Story Card */}
          <div className="rounded-2xl overflow-hidden relative shadow-lg">
            <img 
              src="/assets/partner/mr.zainudhin.png" 
              alt="mr.zainudhin" 
              className="w-full h-auto object-cover"
            />

            <div className="absolute w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent top-0 left-0 flex flex-col p-4 md:p-6 text-white">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 md:pb-6">
                "Our income has grown <br /> significantly after <br /> joining
                aveenas"
              </h1>
              <p className="text-sm md:text-md font-medium">Mr. Zainudhin</p>
              <p className="text-xs md:text-sm font-light">Mumbai, India</p>
            </div>

            <img
              src="/assets/partner/youtube.png"
              alt="youtube"
              className="w-12 md:w-16 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>

          {/* Second Story Card */}
          <div className="rounded-2xl overflow-hidden relative shadow-lg">
            <img
              src="/assets/partner/mr.manmohanSingh.png"
              alt="mr.manmohanSingh"
              className="w-full h-auto object-cover"
            />

            <div className="absolute w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent top-0 left-0 flex flex-col p-4 md:p-6 text-white">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 md:pb-6">
                "My occupancy has <br /> increased to 100% from <br />50% earlier."
              </h1>
              <p className="text-sm md:text-md font-medium">Mr. Manmohan Singh</p>
              <p className="text-xs md:text-sm font-light">Delhi, India</p>
            </div>

            <img
              src="/assets/partner/youtube.png"
              alt="youtube"
              className="w-12 md:w-16 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;