"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Accordion = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-3 overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-darkBlue font-medium focus:outline-none"
      >
        <span>{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-darkBlue bg-light rounded-full" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white bg-green rounded-full" />
        )}
      </button>

      {/* Expandable content */}
      <div
        className={` mx-4 text-sm leading-relaxed transition-all duration-300 ${
          open ? "max-h-40 opacity-100 p-2 pb-3 border-t" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

const Faq = () => {
  const faqs = [
    {
      q: "Should users be able to filter hotels (by price, location, star rating, amenities, etc.)?",
      a: 'In this agreement "aveenas" refers to the corporate entity Brise Hospitality Management Opc Pvt Ltd as well as its website www.aveenas.com and mobile application and other services as the context provides.',
    },
    {
      q: "Will the website include user accounts for booking history, saved hotels, and loyalty rewards?",
      a: "Yes, user accounts can include booking history, wishlist, and loyalty rewards features.",
    },
    {
      q: "Do you need a multi-language and multi-currency feature for international travelers?",
      a: "Yes, this feature helps international users to book in their preferred language and currency.",
    },
  ];

  return (
    <>
      <div className="bg-light py-30 pt-30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-darkBlue font-bold text-3xl mb-4">
            Frequently Asked Questions
          </h1>
          <p>
            Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis
            facilisis conv allis nisl nec <br /> tempor. Donec consectetur
            dapibus ultricies. Fusce luctus lobo.
          </p>
        </div>
      </div>

      <div>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mx-auto mt-8">
            {faqs.map((item, i) => (
              <Accordion key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
