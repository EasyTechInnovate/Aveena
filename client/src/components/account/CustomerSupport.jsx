import React, { useState } from "react";

const CustomerSupport = () => {
  const [activeCategory, setActiveCategory] = useState('stays');
  const [expandedItem, setExpandedItem] = useState(0);

  const categories = [
    { id: 'stays', name: 'Stays', icon: '/assets/account/stays.svg' },
    { id: 'visa', name: 'Visa Service', icon: '/assets/account/visa.svg' },
    { id: 'tour', name: 'Tour Package', icon: '/assets/account/tour.svg' }
  ];

  const faqItems = [
    {
      question: "Should users be able to filter hotels (by price, location, star rating, amenities, etc.)?",
      answer: "In this agreement \"aveenas\" refers to the corporate entity Casa2 Stays Private Limited as well as its website www.aveenas.com and mobile application and other services as the context provides."
    },
    {
      question: "Will the website include user accounts for booking history, saved hotels, and loyalty rewards?",
      answer: "Yes, our platform includes comprehensive user account features for managing bookings, saving preferences, and earning loyalty rewards."
    },
    {
      question: "Do you need a multi-language and multi-currency feature for international travelers?",
      answer: "We support multiple languages and currencies to accommodate international travelers and provide a seamless booking experience."
    },
    {
      question: "Should the website support special deals, discounts, and promo codes?",
      answer: "Yes, our platform includes a robust system for managing special deals, discounts, and promotional codes to provide value to our customers."
    },
    {
      question: "Should the website support special deals, discounts, and promo codes?",
      answer: "Yes, our platform includes a robust system for managing special deals, discounts, and promotional codes to provide value to our customers."
    },
    {
      question: "Should the website support special deals, discounts, and promo codes?",
      answer: "Yes, our platform includes a robust system for managing special deals, discounts, and promotional codes to provide value to our customers."
    },
    {
      question: "Should the website support special deals, discounts, and promo codes?",
      answer: "Yes, our platform includes a robust system for managing special deals, discounts, and promotional codes to provide value to our customers."
    }
  ];

  const toggleExpanded = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div className="border rounded-2xl p-6 flex-1 max-h-fit">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-darkGray mb-2">Customer Support</h1>
        <p className="text-darkGray">
          Get quick assistance and reliable solutions from our support team anytime you need help.
        </p>
      </div>

      <div className="border rounded-2xl p-6">
        {/* Navigation/Category Section */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex items-center gap-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col justify-center items-center gap-2 pb-2 px-4 border-b-2 transition-colors ${
                activeCategory === category.id
                  ? 'text-black border-green'
                  : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              <span className="text-lg"><img src={category.icon} alt={category.name} className="w-10 h-10" /></span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-0">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-darkGray font-medium pr-4">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 text-green transition-transform ${
                  expandedItem === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedItem === index && (
              <div className="pb-4">
                <p className="text-darkGray text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
