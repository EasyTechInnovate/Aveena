import React from "react";

const Tour = () => {
  return (
    <div className="h-screen relative pt-20">
      <img src="/assets/tour-bg.png" alt="tour bg" className="h-screen" />

      <div className="bg-black/40 w-full flex pb-40 text-center h-full absolute top-0 left-0">
        <div className="max-w-7xl mx-auto mt-auto">
          <h1 className="text-5xl font-bold text-white mb-4">
            Our Tour Packages Are <br />
            Coming Soon
          </h1>
          <h5 className="text-white font-normal">
            We’re curating unforgettable travel experiences just for you. From
            breathtaking landscapes <br />to iconic landmarks, our upcoming tour
            packages are designed to make your next getaway <br />stress-free,
            exciting, and memorable.
          </h5>
          <button className="py-2 px-16 text-md cursor-pointer bg-darkGreen text-white mt-8 rounded">Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default Tour;
