import React from "react";
import { FaLinkedin, FaInstagram, FaYoutube, FaHeadset } from "react-icons/fa";

const TABS = [
  "Top cities",
  "Budget hotels",
  "Couple friendly hotels",
  "Hotels near airport",
  "Hotels near railway station",
];

const CITIES = [
  "Hotels Near me", "Hotels in Bangalore", "Hotels in Hyderabad", "Hotels in Chennai",
  "Hotels in Nagpur", "Hotels in Varanasi", "Hotels in Coimbatore", "Hotels in New Delhi",
  "Hotels in Kolkata", "Hotels in Jaipur", "Hotels in Ahmedabad", "Hotels in Udaipur",
  "Hotels in Nashik", "Hotels in Bhubaneswar", "Hotels in Pune", "Hotels in Goa",
  "Hotels in Indore", "Hotels in Noida", "Hotels in Kanpur", "Hotels in Manali",
  "Hotels in Patna", "Hotels in Mumbai", "Hotels in Gurgaon", "Hotels in Bhopal",
  "Hotels in Lucknow", "Hotels in Amritsar", "Hotels in Dehradun",
];

const PAYMENT_ICONS = ["visa", "MasterCard", "Amex", "Paytm"];

const Footer = () => {
  return (
    <footer className="bg-[#F8FAFC]  border-t border-gray-200 text-sm text-gray-600 font-[Matter]">
      <div className="max-w-7xl mx-auto px-3 py-10">
        
        {/* --- Top Row: Logo, Nav, Socials --- */}
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-8 mb-8">
          
          {/* Logo */}
          <a href="/">
            <img
              src="/assets/avenaa_full_logo.png"
              alt="Avenaa"
              className="h-20 object-contain" // Adjusted height for better proportion
            />
          </a>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 font-medium text-gray-800">
              <a href="/about" className="hover:text-blue-600 transition">About us</a>
              <a href="/blog" className="hover:text-blue-600 transition">Blog</a>
              <a href="/faq" className="hover:text-blue-600 transition">FAQs</a>
              <a href="/partner" className="hover:text-blue-600 transition">Be our franchisee</a>
              <a href="#" className="hover:text-blue-600 transition">Corporate enquiries</a>
              <a href="#" className="hover:text-blue-600 transition">Download app</a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-gray-500">
              <a href="/terms" className="hover:text-gray-900 transition">Terms & conditions</a>
              <a href="/privacy" className="hover:text-gray-900 transition">Privacy policy</a>
              <a href="/cancellation" className="hover:text-gray-900 transition">Cancellation policy</a>
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition"><FaLinkedin size={22} /></a>
              <a href="#" className="text-gray-500 hover:text-pink-600 transition"><FaInstagram size={22} /></a>
              <a href="#" className="text-gray-500 hover:text-red-600 transition"><FaYoutube size={22} /></a>
            </div>
            <span className="flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap">
              <FaHeadset /> +91 80621 77157
            </span>
          </div>
        </div>

        {/* --- Middle Row: Tabs & Cities --- */}
        <div className="border-t border-b border-gray-200 py-8 mb-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6 text-gray-700 font-medium">
            {TABS.map((tab, i) => (
              <button
                key={i}
                className={`pb-1 transition-colors ${i === 0 ? "border-b-2 border-blue-500 text-blue-600" : "hover:text-blue-500"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-4">
            {CITIES.map((city, i) => (
              <a key={i} href="#" className="text-xs text-gray-500 hover:text-gray-900 transition truncate">
                {city}
              </a>
            ))}
          </div>
        </div>

        {/* --- Bottom Row: Copyright & Payments --- */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © 2025 Brise Hospitality Management Opc Pvt Ltd (Avenaa). All rights reserved.
          </p>

          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-xs text-gray-400">We accept:</span>
            <div className="flex gap-3">
              {PAYMENT_ICONS.map((icon, i) => (
                <img
                  key={i}
                  src={`/assets/${icon}.png`}
                  alt={icon}
                  className="h-8 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;