import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const ViewPropertyFAQs = ({ propertyData }) => {
  const [expandedFaqs, setExpandedFaqs] = useState([1]); // First FAQ is expanded by default

  // Mock FAQ data - in real app, fetch from propertyData
  const faqs = [
    {
      id: 1,
      question: "Should users be able to filter hotels (by price, location, star rating, amenities, etc.)?",
      answer: 'In this agreement "FabHotels" refers to the corporate entity Brise Hospitality Management Opc Pvt Ltd as well as its website www.fabhotels.com and mobile application and other services as the context provides.',
    },
    {
      id: 2,
      question: "Should users be able to filter hotels (by price, location, star rating, amenities, etc.)?",
      answer: 'In this agreement "FabHotels" refers to the corporate entity Brise Hospitality Management Opc Pvt Ltd as well as its website www.fabhotels.com and mobile application and other services as the context provides.',
    },
  ];

  const toggleFaq = (id) => {
    setExpandedFaqs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]
    );
  };

  return (
    <div className="border-2 border-[#DFE0E480] bg-white p-8 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-2">Property FAQ's</h2>
        <p className="text-gray-500 text-sm">
          You can Only view details you can't change any information
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isExpanded = expandedFaqs.includes(faq.id);
          return (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* FAQ Question Row */}
              <div className="flex items-start justify-between p-4">
                <h3 className="text-gray-800 font-medium text-sm flex-1 pr-4 leading-relaxed">
                  {faq.question}
                </h3>
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-green flex items-center justify-center text-white hover:bg-darkGreen transition-colors"
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" strokeWidth={3} />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" strokeWidth={3} />
                  )}
                </button>
              </div>

              {/* FAQ Answer (shown when expanded) */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewPropertyFAQs;

