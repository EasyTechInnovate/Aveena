import React from "react";

const ViewPropertyPhotos = ({ propertyData }) => {
  // Mock image data - in real app, fetch from propertyData
  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      alt: "Villa exterior with outdoor dining area"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      alt: "Villa with pool at dusk"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      alt: "Villa with pool at dusk"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      alt: "Villa with pool at dusk"
    }
  ];

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
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
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

