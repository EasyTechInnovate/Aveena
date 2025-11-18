import React from "react";

const ViewPropertyInformation = ({ propertyData }) => {
  // Default data structure
  const property = {
    propertyType: propertyData?.propertyType || "Homes",
    propertyName: propertyData?.propertyName || "",
    country: propertyData?.country || "",
    address: propertyData?.address || "",
    apt: propertyData?.apt || "",
    city: propertyData?.city || "",
    state: propertyData?.state || "",
    postalCode: propertyData?.postalCode || "",
    minRentalIncome: propertyData?.minRentalIncome || "",
    salesTarget: propertyData?.salesTarget || "",
  };

  return (
    <div className="border-2 border-[#DFE0E480] bg-white p-8 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="font-semibold text-xl mb-2">Property Information</h2>
          <p className="text-gray-500 text-sm">
            You can Only view details you can't change any information
          </p>
        </div>
        <button className="bg-green hover:bg-darkGreen text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          Upload KYC Details
        </button>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Property Type</label>
        <select
          disabled
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
          value={property.propertyType}
        >
          <option>Homes</option>
          <option>Apartments</option>
          <option>Offices</option>
          <option>Villas</option>
        </select>
      </div>

      {/* Property Name */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Property Name</label>
        <input
          type="text"
          disabled
          placeholder="Enter Name"
          value={property.propertyName}
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
        />
      </div>

      {/* Address */}
      <h3 className="font-semibold mb-4">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select
          disabled
          className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
          value={property.country}
        >
          <option value="">Select Country</option>
          <option>USA</option>
          <option>UK</option>
          <option>India</option>
        </select>
        <input
          type="text"
          disabled
          placeholder="Address"
          value={property.address}
          className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          disabled
          placeholder="Apt. Suite, Floor"
          value={property.apt}
          className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
        />
        <select
          disabled
          className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
          value={property.city}
        >
          <option value="">City</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <select
          disabled
          className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
          value={property.state}
        >
          <option value="">State</option>
        </select>
        <input
          type="text"
          disabled
          placeholder="Postal Code"
          value={property.postalCode}
          className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
        />
      </div>

      {/* Income + Sales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">
            Minimum Rental Income
          </label>
          <input
            type="text"
            disabled
            placeholder="Enter Amount"
            value={property.minRentalIncome}
            className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Sales Target</label>
          <input
            type="text"
            disabled
            placeholder="Enter Amount"
            value={property.salesTarget}
            className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 text-gray-700 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPropertyInformation;

