import React, { useState } from "react";
import SuccessMessage from "../../common/SuccessMessage";

const AddNewPropertyForm = ({ onCancel }) => {
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

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };


  return (
    <>
    {submitted &&(
 <SuccessMessage
        title="Details Submitted Successfully"
        message="Your details have been submitted successfully and are now awaiting admin approval. You’ll be notified once your account is approved. If your personal KYC is still pending, please complete it to avoid delays."
        linkText="Update KYC"
        linkHref="/update-kyc"
      />
    )}
   

    <form
      onSubmit={handleSubmit}
      className="border-2 border-[#DFE0E480] bg-white p-6 rounded-2xl mt-4"
    >
      <h2 className="font-semibold text-xl mb-1">Add New Property</h2>
      <p className="text-gray-500 mb-6">
        please fill below details and upload your property
      </p>

      {/* Property Type */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Property Type</label>
        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option>Homes</option>
          <option>Apartments</option>
          <option>Offices</option>
          <option>Villas</option>
        </select>
      </div>

      {/* Property Name */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Property Name</label>
        <input
          name="propertyName"
          value={formData.propertyName}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Address */}
      <h3 className="font-semibold mb-2">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option value="">Select Country</option>
          <option>USA</option>
          <option>UK</option>
          <option>India</option>
        </select>
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded-lg p-2"
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
        />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />
        <input
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />
      </div>

      {/* Income + Sales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block font-semibold mb-1">
            Minimum Rental Income
          </label>
          <input
            name="minRentalIncome"
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
            placeholder="Enter Amount"
            value={formData.salesTarget}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-400 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
    </>

  );
};

export default AddNewPropertyForm;
