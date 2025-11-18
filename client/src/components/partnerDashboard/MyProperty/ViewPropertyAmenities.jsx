import React from "react";
import { Check } from "lucide-react";

const ViewPropertyAmenities = ({ propertyData }) => {
  // General Amenities (left column)
  const generalAmenities = [
    { id: 1, name: "Lawn", checked: false },
    { id: 2, name: "Private Pool", checked: false },
    { id: 3, name: "Balcony/ Terrace", checked: false },
    { id: 4, name: "AC", checked: false },
    { id: 5, name: "Wi-Fi", checked: false },
    { id: 6, name: "Indoor/ Outdoor Games", checked: false },
    { id: 7, name: "Music System/ Speaker", checked: false },
    { id: 8, name: "TV", checked: false },
    { id: 9, name: "Refrigerator", checked: false },
    { id: 10, name: "Bar", checked: false },
    { id: 11, name: "Wheelchair Friendly", checked: false },
    { id: 12, name: "Parking", checked: false },
    { id: 13, name: "Fire Extinguisher", checked: false },
    { id: 14, name: "Other", checked: true },
  ];

  // Paid Amenities (right column)
  const paidAmenities = [
    { id: 1, name: "Lawn", checked: false, price: null },
    { id: 2, name: "Private Pool", checked: false, price: null },
    { id: 3, name: "Balcony/ Terrace", checked: false, price: null },
    { id: 4, name: "AC", checked: false, price: null },
    { id: 5, name: "Wi-Fi", checked: false, price: null },
    { id: 6, name: "Indoor/ Outdoor Games", checked: false, price: null },
    { id: 7, name: "Fire Extinguisher", checked: false, price: null },
    { id: 8, name: "Other", checked: true, price: 16800 },
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

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - General Amenities */}
        <div>
          <div className="space-y-4">
            {generalAmenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    amenity.checked
                      ? "bg-green border-green"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {amenity.checked && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
                <span className="text-gray-800 text-sm">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Paid Amenities */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-6">Paid Amenities</h3>
          <div className="space-y-4">
            {paidAmenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      amenity.checked
                        ? "bg-green border-green"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {amenity.checked && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-gray-800 text-sm">{amenity.name}</span>
                </div>
                {amenity.checked && amenity.price && (
                  <span className="text-gray-800 font-medium text-sm">
                    ₹{amenity.price.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPropertyAmenities;

