import React from "react";
import PartnerForm from "./PartnerForm";

const Hero = () => {
  return (
    <div className="min-h-screen md:min-h-[92vh] relative pt-20">
      {/* Background Image */}
      <img
        src="/assets/partner/cloud.jpg"
        alt="partner"
        className="w-full h-full object-cover absolute inset-0"
      />

      <img
        src="/assets/partner/whiteShadow.png"
        alt="partner"
        className="w-full h-full object-cover absolute Z-1"
      />

      <div className="bottom-20 left-1/2 transform px-10 -translate-x-1/2 w-full max-w-7xl absolute flex items-baseline justify-between">
        <img
          src="/assets/partner/building1.png"
          alt="partner"
          className="w-[10vw] md:w-[30vw] lg: object-contain"
        />

        <img
          src="/assets/partner/arrow.svg"
          alt="partner"
          className="w-38 object-contain absolute left-1/2 top-2/3  transform -translate-1/2"
        />

        <img
          src="/assets/partner/building2.png"
          alt="partner"
          className="w-[10vw] md:w-[30vw] object-contain"
        />
      </div>


      <div className="absolute bottom-2/5 flex flex-col gap-3 right-1/4">
        <div className="p-2 pr-8 bg-[#020617] shadow-2xl flex gap-2 rounded-full">
          <div className="bg-green p-4 rounded-full flex items-center justify-center">
            <img
              src="/assets/partner/occupancy.svg"
              alt="earnings"
              className="w-5"
            />
          </div>
          <div className="text-white">
            <h2 className="font-medium text-xl">Upto 60%</h2>
            <h5 className="text-[#FFFFFF99] text-sm font-normal">
              Increase in occupancy
            </h5>
          </div>
        </div>

        <div className="p-2 pr-8 bg-[#020617] flex shadow-2xl relative -left-1/2 gap-2 rounded-full">
          <div className="bg-green p-3 rounded-full flex items-center justify-center">
            <img
              src="/assets/partner/earnings.svg"
              alt="earnings"
              className="w-6"
            />
          </div>
          <div className="text-white">
            <h2 className="font-medium text-xl">Upto 200%</h2>
            <h5 className="text-[#FFFFFF99] text-sm font-normal">
              Increase in net earnings
            </h5>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight md:leading-12 text-darkBlue">
            Build a profitable property
            <br className="hidden sm:block" />
            business with <span className="text-darkGreen">Avenaa</span>
          </h1>
          <p className="text-sm sm:text-md text-center pt-3 sm:pt-4 text-darkBlue max-w-2xl mx-auto">
            Grow revenue, reduce hassle, and deliver great guest experiences
            <br className="hidden sm:block" />
            with aveenas. Join 1300+ hotel owners pan-India.
          </p>
        </div>
      </div>

      {/* Form Section */}

      <PartnerForm />
    </div>
  );
};

export default Hero;
