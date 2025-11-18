import React from "react";

const CallBack = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between relative items-end max-w-7xl mx-auto my-8 md:my-16 rounded-3xl px-4 md:px-0">
      <div className="flex-1 h-full text-white px-6 md:px-14 pt-10 md:pt-16 pb-8 md:pb-2 relative z-10 w-full">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Feeling unsure? <span className="text-green-400">Let's talk.</span>
        </h1>
        <p className="pt-2 font-light leading-tight mb-4 md:mb-2 text-sm md:text-base">
          Our experts will walk you through how the <br className="hidden md:block" />
          partnership works — no strings attached.
        </p>
        <button className="py-2 flex gap-2 items-center px-4 bg-white text-cyprus my-4 md:my-8 rounded-md cursor-pointer font-semibold text-sm md:text-base w-full md:w-auto justify-center">
          Request a callback
          <img src="/assets/arrowBlack.svg" alt="" className="w-4 h-4" />
        </button>
      </div>
         <img
          src="/assets/partner/man.png"
          alt="avenaa-office"
          className="relative z-1 max-w-40 md:mr-20 mx-auto md:max-w-54 w-full h-auto md:object-cover"
        />
      <div className="w-full bg-cyprus h-full md:h-60 absolute rounded-3xl z-0"></div>
    </div>
  );
};

export default CallBack;