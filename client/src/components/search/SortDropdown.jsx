import React from 'react';

const SortDropdown = ({ value, onChange }) => {
  const options = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Star Rating' },
    { value: 'distance', label: 'Distance' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-darkBlue font-medium">Sort By:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-darkBlue focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all min-w-[200px] cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;