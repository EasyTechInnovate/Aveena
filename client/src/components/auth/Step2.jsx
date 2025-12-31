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

  /* ================= OTP LOGIC ================= */

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

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
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    const filled = pasted.split("");
    setOtp([...filled, ...Array(OTP_LENGTH - filled.length).fill("")]);
  };

  const handleVerify = async () => {
    setError("");
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setError(`Please enter the ${OTP_LENGTH}-digit OTP.`);
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOtp({
        phone,
        verificationCode: code,
      });

      const { accessToken, isProfileComplete } = res.data.data;
      login(accessToken);
      onNext({ isProfileComplete, phone });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <motion.div
      className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 p-4">
        <img
          src="/assets/auth/left.png"
          alt="Auth visual"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-1/2 px-6 py-6 relative">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-sm font-medium text-darkBlue hover:underline"
          >
            ← Back
          </button>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Enter OTP</h2>

          <p className="text-sm text-gray-600 mb-5">
            Enter the {OTP_LENGTH}-digit code sent to
            <br />
            <b>
              {phone?.countryCode} {phone?.number}
            </b>
          </p>

          {/* OTP INPUTS */}
          <div className="flex justify-between gap-2 mb-4">
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-10 h-12 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium mb-4 ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green text-white hover:bg-darkGreen"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Didn’t receive a code?
            <span className="ml-1 text-darkBlue font-medium cursor-pointer hover:underline">
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Step2;
