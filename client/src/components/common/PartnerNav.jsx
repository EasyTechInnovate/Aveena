import React, { useState } from "react";

const PartnerNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="nav bg-white w-full shadow-[0px_10px_50px_0px_#0000000F] rounded-bl-2xl rounded-br-2xl">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo and Hamburger */}
        <div className="flex items-center">
          {/* Logo */}
          <div id="logo" className="max-w-32 md:max-w-40">
            <a href="/"><img
              src="/assets/logo.png"
              alt="Avenna Logo"
              className="w-full h-full object-cover"
            /></a>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 items-center">
          <div className="flex gap-2 text-sm font-semibold items-center">
            <img src="/assets/partner/home.svg" alt="home" className="h-4" />
            <h1>Home</h1>
          </div>
          <div className="flex gap-2 font-semibold text-sm items-center">
            <img
              src="/assets/partner/accommodations.svg"
              alt="Accommodations"
              className="w-4"
            />
            <h1>Accommodations</h1>
          </div>
          <div className="flex gap-2 text-sm font-semibold items-center">
            <img
              src="/assets/partner/home.svg"
              alt="List your property"
              className="h-4"
            />
            <h1>List your property</h1>
          </div>

          <div className="flex gap-2 text-sm font-semibold items-center border-2 rounded-md px-4 py-2 border-[#D1D5DB99]">
            <img
              src="/assets/partner/earning.svg"
              alt="earning"
              className="h-4"
            />
            <h1>Start Earning</h1>
          </div>
          <div className="flex gap-2 text-sm font-semibold items-center border-2 rounded-md px-4 py-2 border-[#D1D5DB99]">
            <img
              src="/assets/partner/call.svg"
              alt="call"
              className="h-4"
            />
            <h1 className="hidden xl:block">+919403893962</h1>
          </div>

          <div className="flex gap-4 text-sm font-semibold items-center border-2 rounded-md p-2 border-[#737373]">
            <img
              src="/assets/partner/user.svg"
              alt="call"
              className="h-7"
            />
            <img
              src="/assets/partner/hamburger.svg"
              alt="call"
              className="h-6"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex gap-4 text-sm font-semibold items-center border-2 rounded-md p-2 border-[#737373]"
          >
            <img
              src="/assets/partner/user.svg"
              alt="User"
              className="h-7"
            />
            <img
              src="/assets/partner/hamburger.svg"
              alt="Menu"
              className="h-6"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-bl-2xl rounded-br-2xl z-50 p-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 text-sm font-semibold items-center p-2">
                <img src="/assets/partner/home.svg" alt="home" className="h-4" />
                <h1>Home</h1>
              </div>
              <div className="flex gap-2 font-semibold text-sm items-center p-2">
                <img
                  src="/assets/partner/accommodations.svg"
                  alt="Accommodations"
                  className="w-4"
                />
                <h1>Accommodations</h1>
              </div>
              <div className="flex gap-2 text-sm font-semibold items-center p-2">
                <img
                  src="/assets/partner/home.svg"
                  alt="List your property"
                  className="h-4"
                />
                <h1>List your property</h1>
              </div>

              <div className="flex gap-2 text-sm font-semibold items-center border-2 rounded-md px-4 py-2 border-[#D1D5DB99]">
                <img
                  src="/assets/partner/earning.svg"
                  alt="earning"
                  className="h-4"
                />
                <h1>Start Earning</h1>
              </div>
              <div className="flex gap-2 text-sm font-semibold items-center border-2 rounded-md px-4 py-2 border-[#D1D5DB99]">
                <img
                  src="/assets/partner/call.svg"
                  alt="call"
                  className="h-4"
                />
                <h1>+919403893962</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerNav;