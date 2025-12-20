import React from "react";
import { FaLinkedin, FaInstagram, FaYoutube, FaHeadset } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F8FAFC] mt-20 border-t border-gray-200 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          {/* Logo */}
        <a href="/">
          <div className="flex justify-center md:justify-normal items-center gap-3 mb-6 md:mb-0">
            <img src="/assets/logo-f.png" alt="Avenaa" className="h-10" />
            <img src="/assets/avenaa-text.svg" alt="Avenaa" className="h-10" />
          </div>
        </a>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-4 text-gray-800 font-medium px-6">
            <div className="flex justify-center md:justify-normal flex-wrap gap-4">
              <a href="/about">About us</a>
              <a href="/blog">Blog</a>
              <a href="/faq">FAQs</a>
              <a href="/partner">Be our franchisee</a>
              <a href="#">Corporate enquiries</a>
              <a href="#">Download app</a>
            </div>

            {/* Secondary Nav */}
            <div className="flex justify-center md:justify-normal font-normal flex-wrap gap-6 mb-6 text-gray-500">
              <a href="/terms">Terms & conditions</a>
              <a href="/privacy">Privacy policy</a>
              <a href="/cancellation">Cancellation policy</a>
            </div>
          </div>

          {/* Social & Phone */}
          <div className="flex  flex-col gap-4 mt-6 md:mt-0">
            <div className="flex gap-4 justify-center md:justify-normal">
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <FaYoutube size={20} />
              </a>
            </div>
            <span className="flex justify-center md:justify-normal items-center gap-2 text-gray-600 text-nowrap">
              <FaHeadset />  +918062177157
            </span>
          </div>
        </div>

        {/* Hotel Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6 text-gray-700 font-medium">
          <button className="border-b-3 border-blue-500 pb-1">
            Top cities
          </button>
          <button>Budget hotels</button>
          <button>Couple friendly hotels</button>
          <button>Hotels near airport</button>
          <button>Hotels near railway station</button>
        </div>

        {/* Hotel Links (grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 mb-8">
          {[
            "Hotels Near me",
            "Hotels in Bangalore",
            "Hotels in Hyderabad",
            "Hotels in Chennai",
            "Hotels in Nagpur",
            "Hotels in Varanasi",
            "Hotels in Coimbatore",
            "Hotels in New Delhi",
            "Hotels in Kolkata",
            "Hotels in Jaipur",
            "Hotels in Ahmedabad",
            "Hotels in Udaipur",
            "Hotels in Nashik",
            "Hotels in Bhubaneswar",
            "Hotels in Pune",
            "Hotels in Goa",
            "Hotels in Indore",
            "Hotels in Noida",
            "Hotels in Kanpur",
            "Hotels in Manali",
            "Hotels in Patna",
            "Hotels in Mumbai",
            "Hotels in Gurgaon",
            "Hotels in Bhopal",
            "Hotels in Lucknow",
            "Hotels in Amritsar",
            "Hotels in Dehradun",
          ].map((city, i) => (
            <a key={i} href="#" className="text-gray-500 hover:text-gray-800">
              {city}
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs">
          <p className="text-center text-md font-normal ml-auto">
            © 2025 Brise Hospitality Management Opc Pvt Ltd ( Avenaa). All
            rights reserved.
          </p>
          <div className="ml-auto flex items-center flex-col gap-2 mt-4 md:mt-0">
            <span className="text-right font-normal text-md w-full">
              We accept:
            </span>
            <div className="flex gap-2">
              <img src="/assets/visa.png" alt="Visa" className="h-10" />
              <img
                src="/assets/MasterCard.png"
                alt="Mastercard"
                className="h-10"
              />
              <img src="/assets/Amex.png" alt="Amex" className="h-10" />
              <img src="/assets/Paytm.png" alt="UPI" className="h-10" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
