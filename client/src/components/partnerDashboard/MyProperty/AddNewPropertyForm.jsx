import React, { useState } from "react";
import SuccessMessage from "../../common/SuccessMessage";
import { Check } from "lucide-react";

const availableAmenities = [
  "Lawn",
  "Private Pool",
  "Balcony/ Terrace",
  "AC",
  "Wi-Fi",
  "Indoor/ Outdoor Games",
  "Music System/ Speaker",
  "TV",
  "Refrigerator",
  "Bar",
  "Wheelchair Friendly",
  "Parking",
  "Fire Extinguisher",
  "Tea-Coffee Maker",
  "Safety Locker",
  "Bathrobe",
  "Water Dispenser",
  "Toiletries"
];

const AddNewPropertyForm = ({ onCancel, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    propertyType: "apartment",
    propertyName: "",
    description: "",
    country: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    postalCode: "",
    latitude: "",
    longitude: "",
    basePrice: "",
    minRentalIncome: "",
    salesTarget: "",
    adults: "",
    childrens: "",
    noOfRooms: "",
    noOfBaths: "",
    totalUnits: 1,
    amenties: [],
    coverImage: "",
    kycDocument: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const isSelected = prev.amenties.includes(amenity);
      return {
        ...prev,
        amenties: isSelected
          ? prev.amenties.filter((a) => a !== amenity)
          : [...prev.amenties, amenity],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        propertyName: formData.propertyName,
        type: formData.propertyType.toLowerCase(),
        address: {
          fullAddress: `${formData.address}${formData.apt ? `, ${formData.apt}` : ''}, ${formData.city}, ${formData.state}, ${formData.country}`,
          zipCode: formData.postalCode
        },
        location: {
          latitude: Number(formData.latitude) || 0, 
          longitude: Number(formData.longitude) || 0
        },
        capacity: {
          adults: Number(formData.adults) || 1,
          childrens: Number(formData.childrens) || 0
        },
        noOfRooms: Number(formData.noOfRooms) || 1,
        noOfBaths: Number(formData.noOfBaths) || 1,
        basePrice: Number(formData.basePrice) || 0,
        totalUnits: Number(formData.totalUnits) || 1,
        amenties: formData.amenties,
        description: formData.description || "New Property Listing",
        coverImage: formData.coverImage || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        minimumRentalIncome: Number(formData.minRentalIncome),
        saleTarget: Number(formData.salesTarget),
        kycDocument: formData.kycDocument || "https://example.com/kyc.pdf"
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/properties`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        console.error("Failed to create property");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {submitted ? (
        <div className="flex flex-col gap-4">
          <SuccessMessage
            title="Details Submitted Successfully"
            message="Your details have been submitted successfully and are now awaiting admin approval. You’ll be notified once your account is approved."
            linkText="Go to Dashboard"
            linkHref="/dashboard"
          />
          <button
            onClick={onCancel}
            className="self-end bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
          >
            Close
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="border-2 border-[#DFE0E480] bg-white p-6 rounded-2xl mt-4"
        >
          <h2 className="font-semibold text-xl mb-1">Add New Property</h2>
          <p className="text-gray-500 mb-6">
            Please fill below details and upload your property
          </p>

          <h3 className="font-semibold mb-3 text-lg text-darkBlue">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-1">Property Name</label>
              <input
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                placeholder="Ocean View Villa"
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Select Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-white"
              >
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="home">Home</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Beautiful 2BHK villa with ocean view..."
              className="w-full border rounded-lg p-2 min-h-20"
              required
            />
          </div>

          <h3 className="font-semibold mb-3 text-lg text-darkBlue">Address & Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-white"
                required
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="India">India</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <input
                name="address"
                placeholder="Street Address (e.g., 123 Beach Road)"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
            <input
              name="apt"
              placeholder="Apt, Suite, etc."
              value={formData.apt}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-lg p-2"
              required
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border rounded-lg p-2"
              required
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="border rounded-lg p-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div>
              <input
                name="latitude"
                type="number"
                step="any"
                placeholder="Latitude (e.g., 15.2993)"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div>
              <input
                name="longitude"
                type="number"
                step="any"
                placeholder="Longitude (e.g., 74.1240)"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
          </div>

          <h3 className="font-semibold mb-3 text-lg text-darkBlue">Property Specs</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div>
              <label className="block text-sm mb-1">Adults</label>
              <input name="adults" type="number" placeholder="4" value={formData.adults} onChange={handleChange} className="w-full border rounded-lg p-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Children</label>
              <input name="childrens" type="number" placeholder="2" value={formData.childrens} onChange={handleChange} className="w-full border rounded-lg p-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Rooms</label>
              <input name="noOfRooms" type="number" placeholder="2" value={formData.noOfRooms} onChange={handleChange} className="w-full border rounded-lg p-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Baths</label>
              <input name="noOfBaths" type="number" placeholder="2" value={formData.noOfBaths} onChange={handleChange} className="w-full border rounded-lg p-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Total Units</label>
              <input name="totalUnits" type="number" placeholder="1" value={formData.totalUnits} onChange={handleChange} className="w-full border rounded-lg p-2 bg-gray-50" title="Must be 1 for Villas/Apartments" required />
            </div>
          </div>

          <h3 className="font-semibold mb-3 text-lg text-darkBlue">Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 mb-8">
            {availableAmenities.map((amenity) => {
              const isChecked = formData.amenties.includes(amenity);
              return (
                <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? "bg-green border-green"
                        : "border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <span className="text-gray-700 text-sm select-none">{amenity}</span>
                </label>
              );
            })}
          </div>

          <h3 className="font-semibold mb-3 text-lg text-darkBlue">Financials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div>
              <label className="block font-semibold mb-1">Base Price / Night</label>
              <input
                name="basePrice"
                type="number"
                placeholder="5000"
                value={formData.basePrice}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Minimum Rental Income</label>
              <input
                name="minRentalIncome"
                type="number"
                placeholder="50000"
                value={formData.minRentalIncome}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Sales Target</label>
              <input
                name="salesTarget"
                type="number"
                placeholder="200000"
                value={formData.salesTarget}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>

          <h3 className="font-semibold mb-3 text-lg text-darkBlue">Media & Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block font-semibold mb-1">Cover Image URL</label>
              <input
                name="coverImage"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">KYC Document URL</label>
              <input
                name="kycDocument"
                type="url"
                placeholder="https://example.com/kyc.pdf"
                value={formData.kycDocument}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-400 px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green hover:bg-darkGreen px-8 py-2 rounded-lg text-white font-medium disabled:opacity-50 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Property"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddNewPropertyForm;