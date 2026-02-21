import React from "react";

const ViewPropertyPhotos = ({ propertyData }) => {

  return (
    <div className="border-2 border-[#DFE0E480] bg-white p-8 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-2">Property Photos</h2>
        <p className="text-gray-500 text-sm">
          You can Only view details you can't change any information
        </p>
      </div>

      {/* Photo Gallery */}
      <div className="grid grid-cols-4 gap-4">
        {propertyData.propertyMedia?.map((photo, index) => (
          <div
            key={index}
            className="relative w-full aspect-4/3 rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x300?text=Property+Photo";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPropertyPhotos;

