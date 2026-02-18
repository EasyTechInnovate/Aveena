import React, { useState } from "react";
import SuccessMessage from "../../common/SuccessMessage";

const AddNewPropertyForm = ({ onCancel, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    propertyType: "Homes",
    propertyName: "",
    country: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    postalCode: "",
    minRentalIncome: "",
    salesTarget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        propertyName: formData.propertyName,
        type: formData.propertyType.toLowerCase(),
        address: {
          fullAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}`,
          zipCode: formData.postalCode
        },
        location: {
          latitude: 0,
          longitude: 0
        },
        capacity: {
          adults: 1,
          childrens: 0
        },
        noOfRooms: 1,
        noOfBaths: 1,
        basePrice: 0,
        totalUnits: 1,
        amenties: [],
        description: "New Property Listing",
        coverImage: "https://img.freepik.com/free-photo/copy-smell-romantic-espresso-nice_1232-3947.jpg?semt=ais_hybrid&w=740&q=80",
        minimumRentalIncome: Number(formData.minRentalIncome),
        saleTarget: Number(formData.salesTarget),
        kycDocument: ""
      };

      const response = await fetch(`http://localhost:5000/api/v1/properties`,
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
        console.log("response after property onboarding : ", response)
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
            please fill below details and upload your property
          </p>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Select Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="Homes">Homes</option>
              <option value="Apartments">Apartments</option>
              <option value="Offices">Offices</option>
              <option value="Villas">Villas</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Property Name</label>
            <input
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <h3 className="font-semibold mb-2">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="India">India</option>
            </select>
            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-lg p-2"
              required
            />
            <input
              name="apt"
              placeholder="Apt. Suite, Floor"
              value={formData.apt}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
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
              <label className="block font-semibold mb-1">
                Minimum Rental Income
              </label>
              <input
                name="minRentalIncome"
                type="number"
                placeholder="Enter Amount"
                value={formData.minRentalIncome}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Sales Target</label>
              <input
                name="salesTarget"
                type="number"
                placeholder="Enter Amount"
                value={formData.salesTarget}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-400 px-4 py-2 rounded-lg"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green px-6 py-2 rounded-lg text-white disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddNewPropertyForm;