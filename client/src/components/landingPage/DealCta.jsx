import React from 'react'

const DealCta = () => {
  return (
    <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative my-6 sm:my-8 md:my-10">
      {/* Background Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
        <img
          src="/assets/deal-cta.png"
          alt="deal cta"
          className="w-full h-full object-cover"
        />

        {/* CTA Box */}
        <div className="bg-darkGreen p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-10 left-3 sm:left-4 md:left-6 lg:left-10 max-w-[calc(100%-1.5rem)] sm:max-w-[90%] md:max-w-[70%] lg:max-w-md">
          <h1 className="text-white font-medium text-base sm:text-lg md:text-2xl lg:text-3xl leading-tight sm:leading-snug">
            Bundle your trip. <br /> Boost your savings
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-[500] mt-1 sm:mt-2 text-[#F5F5F5] leading-relaxed">
            Don't miss our package deals to this season's top <br className="hidden sm:block"/> destinations.
          </p>
          <button className="bg-[#0C0E1C] py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-6 mt-3 sm:mt-4 text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg rounded-full cursor-pointer w-full sm:w-auto">
            Book a package deal
          </button>
        </div>
      </div>
    </div>
  )
}

export default DealCta
