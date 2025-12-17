import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { verifyOtp } from "../../services";
import { useAuth } from "../../context/AuthContext";

const OTP_LENGTH = 6;

const Step2 = ({ phone, onBack, onNext, onClose }) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const { login } = useAuth();

  const handleOtpChange = (index, value) => {
    if (value.length > 1 || !/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    const newOtp = pastedData.split("");

    setOtp([...newOtp, ...Array(OTP_LENGTH - newOtp.length).fill("")]);
  };

  const handleVerify = async () => {
    setError("");

    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setError(`Please enter the ${OTP_LENGTH}-digit OTP.`);
      return;
    }

    if (!phone || !phone.countryCode || !phone.number) {
      setError("Phone data is missing. Please go back and re-enter.");
      return;
    }

    const payload = {
      phone: {
        countryCode: phone.countryCode,
        number: phone.number,
      },
      verificationCode: code,
    };

    try {
      setLoading(true);

      const res = await verifyOtp(payload);
      const { accessToken, isProfileComplete } = res.data.data;

      await login(accessToken);

      onNext({ 
        isProfileComplete, 
        phone: payload.phone
      });

  } catch (err) {
    console.error(err);
    setError(
      err.response?.data?.message || "Invalid OTP. Please try again."
    );
  } finally {
    setLoading(false);
  }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const otpVariants = {
    focus: {
      scale: 1.1,
      boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.3)",
    },
  };

  return (
    <motion.div
      className="flex bg-white rounded-2xl relative h-[60vh] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left image */}
      <motion.div className="flex-2 p-4" variants={imageVariants}>
        <img
          src="/assets/auth/left.png"
          alt="Auth side"
          className="object-cover w-full h-full rounded-lg"
        />
      </motion.div>

      {/* Right (OTP form) */}
      <div className="w-full md:flex-2 flex flex-col justify-center items-center pr-4 relative">
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>

        <div className="w-full max-w-md">
          <motion.button
            onClick={onBack}
            className="flex items-center text-darkBlue font-medium mb-6 hover:underline"
            variants={itemVariants}
            whileHover={{ x: -5 }}
          >
            ← Go Back
          </motion.button>

          <motion.h2 className="text-2xl font-semibold mb-2" variants={itemVariants}>
            Enter OTP
          </motion.h2>

          <motion.p className="text-sm text-gray-600 mb-6" variants={itemVariants}>
            Enter the {OTP_LENGTH}-digit code sent to:
            <br />
            <b>{phone?.countryCode} {phone?.number}</b>
          </motion.p>

          {/* OTP Boxes */}
          <motion.div
            className="flex justify-between gap-2 mb-4"
            variants={itemVariants}
          >
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl font-medium focus:outline-none"
                variants={otpVariants}
                whileFocus="focus"
              />
            ))}
          </motion.div>

          {error && (
            <p className="text-red-500 text-sm mb-2">
              {error}
            </p>
          )}

          {/* Verify button */}
          <motion.button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium mb-3 transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green text-white hover:bg-darkGreen"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </motion.button>

          <motion.p className="text-sm text-center text-gray-600" variants={itemVariants}>
            Didn’t receive a code?
            <span className="text-darkBlue font-medium ml-1 hover:underline cursor-pointer">
              Resend OTP
            </span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Step2;
