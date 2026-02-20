import React, { useState } from "react";
import { Check, UploadCloud } from "lucide-react";
import UploadPropertyMedia from "./UploadPropertyMedia";
import { uploadToImageKit } from "../../../utils/uploadImage";

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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createdPropertyId, setCreatedPropertyId] = useState(null);
  
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

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingImage(true);

    try {
      const imageUrl = await uploadToImageKit(file);
      
      if (imageUrl) {
        setFormData((prev) => ({ ...prev, coverImage: imageUrl }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploadingImage(false);
    }
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
        coverImage: formData.coverImage,
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
        const data = await response.json();
        setCreatedPropertyId(data?.data?.property?._id || data?.property?._id);
        setSubmitted(true);
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
        <UploadPropertyMedia 
          propertyId={createdPropertyId} 
          onComplete={() => {
            if (onSuccess) onSuccess();
            onCancel();
          }} 
        />
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
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Select Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 bg-white focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="hotel">Hotel</option>
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
              className="w-full border rounded-lg p-2 min-h-20 focus:ring-2 focus:ring-green-500 outline-none"
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
                className="w-full border rounded-lg p-2 bg-white focus:ring-2 focus:ring-green-500 outline-none"
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
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
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
              className="border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
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
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
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
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
          </div>

          <h3 className="font-semibold mb-3 text-lg text-darkBlue">Property Specs</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div>
              <label className="block text-sm mb-1">Adults</label>
              <input name="adults" type="number" placeholder="4" value={formData.adults} onChange={handleChange} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Children</label>
              <input name="childrens" type="number" placeholder="2" value={formData.childrens} onChange={handleChange} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Rooms</label>
              <input name="noOfRooms" type="number" placeholder="2" value={formData.noOfRooms} onChange={handleChange} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Baths</label>
              <input name="noOfBaths" type="number" placeholder="2" value={formData.noOfBaths} onChange={handleChange} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Total Units</label>
              <input name="totalUnits" type="number" placeholder="1" value={formData.totalUnits} onChange={handleChange} className="w-full border rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none" required />
            </div>
          </div>

          <h3 className="font-semibold mb-3 text-lg text-darkBlue">Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 mb-8">
            {availableAmenities.map((amenity) => {
              const isChecked = formData.amenties.includes(amenity);
              return (
                <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors border ${
                      isChecked
                        ? "bg-[#22C55E] border-[#22C55E]"
                        : "border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                  </div>
                  
                  {/* 👇 THIS IS THE MISSING PIECE 👇 */}
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  {/* 👆 ======================= 👆 */}

                  <span className="text-gray-700 text-[15px] select-none">{amenity}</span>
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
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
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
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
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
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
          </div>

          <h3 className="font-semibold mb-3 text-lg text-darkBlue">Media & Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block font-semibold mb-2">Upload Cover Image</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-gray-50 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                  <UploadCloud className="w-5 h-5 text-gray-600" />
                  <span>Choose Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverImageUpload}
                  />
                </label>
                {isUploadingImage && <span className="text-sm text-green-600 animate-pulse">Uploading...</span>}
              </div>
              {formData.coverImage && (
                <div className="mt-3">
                  <img src={formData.coverImage} alt="Cover Preview" className="h-24 w-32 object-cover rounded-lg border" />
                </div>
              )}
            </div>
            
            <div>
              <label className="block font-semibold mb-2">KYC Document URL</label>
              <input
                name="kycDocument"
                type="url"
                placeholder="https://example.com/kyc.pdf"
                value={formData.kycDocument}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-400 px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              disabled={isLoading || isUploadingImage}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green hover:bg-darkGreen px-8 py-2 rounded-lg text-white font-medium disabled:opacity-50 transition-colors"
              disabled={isLoading || isUploadingImage || !formData.coverImage}
            >
              {isLoading ? "Submitting..." : "Proceed to Photos"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddNewPropertyForm;