import React from 'react';

const SearchTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all-stay', label: 'All Stay', icon: '/assets/search/stay.svg' },
    { id: 'hotels', label: 'Hotels', icon: '/assets/search/hotel.svg' },
    { id: 'homes', label: 'Homes', icon: '/assets/search/home.svg' },
  ];

  return (
    <div className="flex justify-between gap-2 border rounded-full p-2 bg-gray-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center gap-2 flex-1 justify-center px-4 md:px-8 py-3 
            rounded-full font-medium text-sm transition-all duration-300
            ${activeTab === tab.id
              ? 'bg-green-600 text-white shadow-md'
              : 'border border-gray-300 text-darkBlue bg-white hover:bg-gray-100'
            }
          `}
        >
          <img
            src={tab.icon}
            alt={tab.label}
            className="w-5 h-5 md:w-6 md:h-6"
          />
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SearchTabs;