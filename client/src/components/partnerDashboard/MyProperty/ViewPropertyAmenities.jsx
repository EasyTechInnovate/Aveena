import React, { useMemo } from "react";
import { Check } from "lucide-react";

const ViewPropertyAmenities = ({ propertyData }) => {
  // Use useMemo to prevent unnecessary recalculations on re-renders
  const generalAmenities = useMemo(() => {
    // Standard list of amenities to check against
    const standardAmenitiesList = [
      "Lawn",
      "Private Pool",
      "Balcony/ Terrace",
      "AC",
      "Air conditioner", // Mapping API equivalent
      "Wi-Fi",
      "free wifi", // Mapping API equivalent
      "Indoor/ Outdoor Games",
      "Music System/ Speaker",
      "TV",
      "Refrigerator",
      "Bar",
      "Wheelchair Friendly",
      "Parking",
      "Fire Extinguisher",
    ];

    // Get amenities from API, fallback to empty array if undefined
    const apiAmenities = Array.isArray(propertyData?.amenties)
      ? propertyData.amenties.map((a) => a.toLowerCase())
      : [];

    // Map the standard list to state objects
    let mappedAmenities = standardAmenitiesList.map((name, index) => {
      return {
        id: index + 1,
        name: name,
        // Check if the lowercase version of the standard name exists in the API array
        checked: apiAmenities.includes(name.toLowerCase()),
      };
    });

    // Handle "Other" amenities from the API that aren't in the standard list
    const otherAmenities = propertyData?.amenties?.filter(
      (apiAmenity) =>
        !standardAmenitiesList.some(
          (standard) => standard.toLowerCase() === apiAmenity.toLowerCase()
        )
    ) || [];

    // If there are 'other' amenities, add them to the list as checked
    if (otherAmenities.length > 0) {
      otherAmenities.forEach((other, index) => {
        mappedAmenities.push({
          id: `other-${index}`,
          name: other,
          checked: true,
        });
      });
    }

    // Optional: Consolidate known duplicates (e.g., 'AC' and 'Air conditioner')
    // Find if 'air conditioner' is true, make 'AC' true, then remove 'air conditioner'
    const hasAirCon = mappedAmenities.find((a) => a.name.toLowerCase() === "air conditioner")?.checked;
    if (hasAirCon) {
        const acIndex = mappedAmenities.findIndex((a) => a.name === "AC");
        if(acIndex !== -1) mappedAmenities[acIndex].checked = true;
    }
    
    const hasFreeWifi = mappedAmenities.find((a) => a.name.toLowerCase() === "free wifi")?.checked;
    if (hasFreeWifi) {
        const wifiIndex = mappedAmenities.findIndex((a) => a.name === "Wi-Fi");
        if(wifiIndex !== -1) mappedAmenities[wifiIndex].checked = true;
    }
    
    // Filter out the API mapping duplicates from the final display list
    mappedAmenities = mappedAmenities.filter(a => a.name !== "Air conditioner" && a.name !== "free wifi");

    return mappedAmenities;

  }, [propertyData?.amenties]);

  // Note: The API response you provided doesn't show a separation for "Paid Amenities"
  // or pricing structure for amenities. So, for now, we will leave this static or
  // hide it if no data exists. Adjust this based on your actual API data structure if it changes.
  const paidAmenities = [
    { id: 1, name: "Lawn", checked: false, price: null },
    { id: 2, name: "Private Pool", checked: false, price: null },
    { id: 3, name: "Balcony/ Terrace", checked: false, price: null },
    { id: 4, name: "AC", checked: false, price: null },
    { id: 5, name: "Wi-Fi", checked: false, price: null },
    { id: 6, name: "Indoor/ Outdoor Games", checked: false, price: null },
    { id: 7, name: "Fire Extinguisher", checked: false, price: null },
    { id: 8, name: "Other", checked: false, price: 16800 },
  ];

  return (
    <div className="border-2 border-[#DFE0E480] bg-white p-8 rounded-2xl shadow-sm">
      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-2">Property Amenities</h2>
        <p className="text-gray-500 text-sm">
          You can Only view details you can't change any information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - General Amenities */}
        <div>
          <div className="space-y-4">
            {generalAmenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                    amenity.checked
                      ? "bg-green border-green"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {amenity.checked && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
                <span className="text-gray-800 text-sm capitalize">{amenity.name}</span>
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
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
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