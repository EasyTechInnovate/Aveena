import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { completeProfile } from "../../services";

const Profile = () => {
  const { user, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: {
      countryCode: "",
      number: "",
    },
    dateOfBirth: "",
    nationality: "",
    gender: "",
    address: {
      country: "",
      city: "",
      state: "",
      aptorsuiteorfloor: "",
      fullAddress: "",
      zipCode: "",
    },
  });

  // Load user data into form
  useEffect(() => {
    if (user) {
      const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toISOString().split("T")[0];
      };

      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: {
          countryCode: user.phone?.countryCode || "",
          number: user.phone?.number || "",
        },
        dateOfBirth: formatDate(user.dateOfBirth),
        nationality: user.nationality || "",
        gender: user.gender || "",
        address: {
          country: user.address?.country || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          aptorsuiteorfloor: user.address?.aptorsuiteorfloor || "",
          fullAddress: user.address?.fullAddress || "",
          zipCode: user.address?.zipCode || "",
        },
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSuccess(false);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill in all required fields (Name and Email)");
      return;
    }

    if (!formData.phone.countryCode || !formData.phone.number) {
      setError("Please provide a valid phone number");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: {
          countryCode: formData.phone.countryCode,
          number: formData.phone.number,
        },
        ...(formData.dateOfBirth && { dateOfBirth: formData.dateOfBirth }),
        ...(formData.nationality && { nationality: formData.nationality }),
        ...(formData.gender && { gender: formData.gender }),
        ...(Object.values(formData.address).some((val) => val) && {
          address: {
            ...(formData.address.country && { country: formData.address.country }),
            ...(formData.address.city && { city: formData.address.city }),
            ...(formData.address.state && { state: formData.address.state }),
            ...(formData.address.aptorsuiteorfloor && {
              aptorsuiteorfloor: formData.address.aptorsuiteorfloor,
            }),
            ...(formData.address.fullAddress && {
              fullAddress: formData.address.fullAddress,
            }),
            ...(formData.address.zipCode && { zipCode: formData.address.zipCode }),
          },
        }),
      };

      const response = await completeProfile(payload);

      if (response.data?.success) {
        setIsSuccess(true);
        // Refresh user profile
        await refreshProfile();
        // Hide success message after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-2xl p-4 sm:p-6 flex-1 max-h-fit w-full">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="relative w-fit">
          <img
            src="/assets/account/user.png"
            alt="user"
            className="w-14 sm:w-16 aspect-square"
          />
          <div className="bg-green p-1.5 sm:p-2 rounded-full aspect-square w-fit flex items-center cursor-pointer justify-center absolute bottom-0 -right-2 sm:-right-3">
            <img src="/assets/account/pencil.svg" alt="edit" className="w-2.5 sm:w-3" />
          </div>
        </div>

        <div>
          <h1 className="font-semibold text-lg sm:text-xl">Personal details</h1>
          <p className="text-xs sm:text-sm text-darkGray">
            Update your info and find out how it's used.
          </p>
        </div>
      </div>
      <hr className="my-4" />

      {/* Success Message */}
      {isSuccess && (
        <div className="mb-4 p-3 bg-green/10 border border-green rounded-xl text-green text-sm">
          Profile updated successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-darkGray">
                First Name <span className="text-red-500">*</span>
              </h4>
              <input
                type="text"
                className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-darkGray">
                Last Name <span className="text-red-500">*</span>
              </h4>
              <input
                type="text"
                className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-darkGray">
                Email address <span className="text-red-500">*</span>
              </h4>
              <input
                type="email"
                className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                placeholder="business@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-darkGray">
                Phone number <span className="text-red-500">*</span>
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base max-w-[120px]"
                  placeholder="+91"
                  value={formData.phone.countryCode}
                  onChange={(e) =>
                    handleInputChange("phone.countryCode", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                  placeholder="1234567890"
                  value={formData.phone.number}
                  onChange={(e) =>
                    handleInputChange("phone.number", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-darkGray">
                Date of birth
              </h4>
              <input
                type="date"
                className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-darkGray">
                Nationality
              </h4>
              <div className="relative">
                <select
                  className="p-3 sm:p-4 border rounded-xl outline-none w-full appearance-none bg-white text-sm sm:text-base"
                  value={formData.nationality}
                  onChange={(e) =>
                    handleInputChange("nationality", e.target.value)
                  }
                >
                  <option value="">Select Nationality</option>
                  <option value="American">American</option>
                  <option value="British">British</option>
                  <option value="Canadian">Canadian</option>
                  <option value="Australian">Australian</option>
                  <option value="Indian">Indian</option>
                  <option value="German">German</option>
                  <option value="French">French</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-darkGray">
                Gender
              </h4>
              <div className="relative">
                <select
                  className="p-3 sm:p-4 border rounded-xl outline-none w-full appearance-none bg-white text-sm sm:text-base"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs sm:text-sm font-semibold text-darkGray">
              Address
            </h4>

            {/* First row of address fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col flex-1 gap-2">
                <div className="relative">
                  <select
                    className="p-3 sm:p-4 border rounded-xl outline-none w-full appearance-none bg-white text-sm sm:text-base"
                    value={formData.address.country}
                    onChange={(e) =>
                      handleInputChange("address.country", e.target.value)
                    }
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <input
                  type="text"
                  className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                  placeholder="Full Address"
                  value={formData.address.fullAddress}
                  onChange={(e) =>
                    handleInputChange("address.fullAddress", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <input
                  type="text"
                  className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                  placeholder="Apt. Suite, Floor"
                  value={formData.address.aptorsuiteorfloor}
                  onChange={(e) =>
                    handleInputChange(
                      "address.aptorsuiteorfloor",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            {/* Second row of address fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col flex-1 gap-2">
                <div className="relative">
                  <input
                    type="text"
                    className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) =>
                      handleInputChange("address.city", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <div className="relative">
                  <input
                    type="text"
                    className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={(e) =>
                      handleInputChange("address.state", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <input
                  type="text"
                  className="p-3 sm:p-4 border rounded-xl outline-none w-full text-sm sm:text-base"
                  placeholder="Postal Code"
                  value={formData.address.zipCode}
                  onChange={(e) =>
                    handleInputChange("address.zipCode", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button - Right Aligned */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 sm:p-4 bg-green rounded-xl text-white text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green/90 transition-colors"
          >
            {isLoading ? "Saving..." : "Save Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
