import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { completeProfile } from "../../services";
import { useAuth } from "../../context/AuthContext";

const Step3 = ({ phone, onClose }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // -------------------------------
  // SUBMIT PROFILE
  // -------------------------------
  const handleSubmit = async () => {
    setError("");

    const { firstName, lastName, email } = formData;

    if (!firstName || !lastName || !email) {
      setError("Please fill all fields.");
      return;
    }

    // Check if phone data is available
    if (!phone || !phone.countryCode || !phone.number) {
      setError("Phone information is missing. Please start over.");
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ Fixed: Include phone object in the request
      const response = await completeProfile({
        firstName,
        lastName,
        email,
        phone: {
          countryCode: phone.countryCode,
          number: phone.number,
        },
      });

      // ✅ Update token if a new one is returned
      if (response.data?.success && response.data?.data?.accessToken) {
        login(response.data.data.accessToken);
      }

      setIsSuccess(true);

      // ✅ close modal after success animation
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Profile update failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------------------
  // ANIMATIONS
  // -------------------------------
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.3)",
    },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex bg-white rounded-2xl h-[60vh] relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Image */}
      <div className="flex-1 p-4">
        <img
          src="/assets/auth/left.png"
          alt="profile"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center pr-4">
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div key="form">
                <motion.h2
                  className="text-2xl font-semibold mb-2"
                  variants={itemVariants}
                >
                  Complete Your Profile
                </motion.h2>

                <motion.p
                  className="mb-4 text-sm text-gray-600"
                  variants={itemVariants}
                >
                  Please provide your details to continue.
                  {phone && (
                    <span className="block text-xs text-gray-500 mt-1">
                      Phone: {phone.countryCode} {phone.number}
                    </span>
                  )}
                </motion.p>

                <div className="flex gap-3 mb-4">
                  <motion.input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-1/2 p-3 border rounded-lg outline-none"
                    variants={inputVariants}
                    whileFocus="focus"
                  />

                  <motion.input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-1/2 p-3 border rounded-lg outline-none"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>

                <motion.input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange("email", e.target.value)
                  }
                  className="w-full p-3 border rounded-lg outline-none mb-3"
                  variants={inputVariants}
                  whileFocus="focus"
                />

                {error && (
                  <p className="text-red-500 text-sm mb-2">{error}</p>
                )}

                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-xl font-medium transition ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green text-white hover:bg-darkGreen"
                  }`}
                  whileHover={!isSubmitting && { scale: 1.02 }}
                  whileTap={!isSubmitting && { scale: 0.98 }}
                >
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                variants={successVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
                  ✓
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-green">
                  Profile Updated!
                </h2>
                <p className="text-sm text-gray-600">
                  Your profile has been successfully completed.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Step3;