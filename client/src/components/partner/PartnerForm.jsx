import React from "react";

const PartnerForm = () => {
  return (
    <div className="max-w-7xl left-1/2 transform -translate-x-1/2 w-full bg-white rounded-2xl shadow-2xl p-4 md:p-6 absolute -bottom-60 md:-bottom-36">
      <h1 className="font-semibold text-lg md:text-xl mb-3 md:mb-4 text-center md:text-left">
        Tell us about your property
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        <div className="flex flex-col gap-1 md:gap-2 w-full md:flex-1">
          <label htmlFor="name" className="text-black text-sm md:text-normal">
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="p-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-darkGreen"
          />
        </div>
        <div className="flex flex-col gap-1 md:gap-2 w-full md:flex-1">
          <label htmlFor="phone" className="text-black text-sm md:text-normal">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            className="p-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-darkGreen"
          />
        </div>
        <div className="flex flex-col gap-1 md:gap-2 w-full md:flex-1">
          <label htmlFor="hotel" className="text-black text-sm md:text-normal">
            Hotel name
          </label>
          <input
            type="text"
            id="hotel"
            className="p-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-darkGreen"
          />
        </div>
        <div className="flex flex-col gap-1 md:gap-2 w-full md:flex-1">
          <label htmlFor="city" className="text-black text-sm md:text-normal">
            City name
          </label>
          <input
            type="text"
            id="city"
            className="p-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-darkGreen"
          />
        </div>
      </div>

      <button className="bg-darkGreen text-white py-3 md:py-4 flex items-center justify-center gap-2 px-6 md:px-8 mx-auto rounded-md mt-3 md:mt-4 cursor-pointer hover:bg-green-700 transition-colors w-full md:w-auto">
        Request a callback 
        <img src="/assets/RightArrow.svg" alt="arrow" className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default PartnerForm;