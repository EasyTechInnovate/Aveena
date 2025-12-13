import React from 'react';

const FilterChips = ({ chips, onRemove, onRemoveAll }) => {
  if (chips.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {chips.map((chip, index) => (
        <span
          key={`${chip.key}-${chip.value}-${index}`}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded-full flex items-center gap-2 text-sm text-darkBlue hover:bg-gray-50 transition-colors shadow-sm"
        >
          {chip.label}
          <button
            onClick={() => onRemove(chip.key, chip.value)}
            className="text-gray-500 hover:text-red-500 transition-colors text-lg leading-none"
            aria-label={`Remove ${chip.label} filter`}
          >
            ×
          </button>
        </span>
      ))}
      <button
        onClick={onRemoveAll}
        className="text-sm text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap transition-colors font-medium"
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterChips;