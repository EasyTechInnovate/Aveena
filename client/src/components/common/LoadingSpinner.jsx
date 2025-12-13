import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'green' }) => {
  const sizeClasses = {
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  const colorClasses = {
    green: 'border-green-600',
    white: 'border-white',
    gray: 'border-gray-400',
  };

  return (
    <div className={`animate-spin rounded-full mx-auto border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  );
};

export default LoadingSpinner;