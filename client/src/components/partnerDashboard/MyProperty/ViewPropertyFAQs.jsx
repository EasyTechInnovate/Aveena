import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const ViewPropertyFAQs = ({ propertyData }) => {
  const [expandedFaqs, setExpandedFaqs] = useState([]);

  // Safely access faqs, defaulting to an empty array if undefined
  const faqs = propertyData?.faqs || [];

  const toggleFaq = (id) => {
    setExpandedFaqs((prev) => {
      if (prev.includes(id)) {
        return prev.filter((faqId) => faqId !== id);
      } else {
        return [...prev, id];
      }
    });
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
        {faqs.length > 0 ? (
          faqs.map((faq) => {
            // Use _id consistently (or fallback to index if _id is missing)
            const faqId = faq._id || faq.id; 
            const isExpanded = expandedFaqs.includes(faqId);
            
            return (
              <div
                key={faqId}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* FAQ Question Row */}
                <div 
                  className="flex items-start justify-between p-4 cursor-pointer"
                  onClick={() => toggleFaq(faqId)}
                >
                  <h3 className="text-gray-800 font-medium text-sm flex-1 pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  <button
                    className="shrink-0 w-6 h-6 rounded-full bg-green flex items-center justify-center text-white hover:bg-darkGreen transition-colors"
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
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-gray-600 text-sm leading-relaxed border-t pt-3">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No FAQs available for this property.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPropertyFAQs;