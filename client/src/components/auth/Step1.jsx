import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import { sendOtp, googleLogin } from "../../services";
import { useAuth } from "../../context/AuthContext";

function Step1({ onNext, onClose }) {
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login: authLogin } = useAuth();

  const handleSendOtp = async () => {
    setError("");

    if (!phone || phone.length < 8) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);

      await sendOtp({
        phone: {
          countryCode,
          number: phone,
        },
      });

      onNext({
        phone: {
          countryCode,
          number: phone,
        },
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      setGoogleLoading(true);
      setError("");

      const authResponse = await googleLogin({ code: tokenResponse.code });

      if (authResponse.data?.data?.accessToken) {
        authLogin(authResponse.data.data.accessToken);

        onNext({
          googleAuth: true,
          isProfileComplete: authResponse.data.data.isProfileComplete,
        });
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to login with Google. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = (error) => {
    console.error("Google Login Failed:", error);
    setError("Google login failed. Please try again.");
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: "auth-code",
  });

  // ---------------- ANIMATION VARIANTS ----------------
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex bg-white rounded-2xl relative h-[60vh] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* LEFT IMAGE */}
      <motion.div className="flex-2 p-4" variants={imageVariants}>
        <img
          src="/assets/auth/left.png"
          alt=""
          className="object-cover w-full h-full rounded-lg"
        />
      </motion.div>

      {/* FORM */}
      <div className="w-full md:flex-2 flex flex-col justify-center items-center pr-4">
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>

        <div className="w-full max-w-md">
          <motion.h2
            className="text-2xl font-semibold mb-2"
            variants={itemVariants}
          >
            Sign in or create an account
          </motion.h2>

          <motion.p className="mb-6 text-sm" variants={itemVariants}>
            Unlock a world of travel with one account across Expedia,
            Hotels.com, and Vrbo.
          </motion.p>

          {/* PHONE INPUT */}
          <motion.div
            className="flex items-center border rounded-lg overflow-hidden mb-1"
            variants={itemVariants}
          >
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="p-3 bg-transparent outline-none border-r"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
            </select>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Mobile Number"
              className="w-full p-3 outline-none"
            />
          </motion.div>

          {/* ERROR */}
          {error && (
            <motion.p
              className="text-red-500 text-sm mb-2"
              variants={itemVariants}
            >
              {error}
            </motion.p>
          )}

          {/* SEND OTP BUTTON */}
          <motion.button
            onClick={handleSendOtp}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition mb-4 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green hover:bg-darkGreen text-white"
            }`}
            variants={itemVariants}
            whileHover={!loading && { scale: 1.02 }}
            whileTap={!loading && { scale: 0.98 }}
          >
            {loading ? "Sending OTP..." : "Get OTP"}
          </motion.button>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"
            variants={itemVariants}
          >
            <motion.button
              onClick={login}
              disabled={googleLoading || loading}
              className={`flex items-center justify-center gap-2 w-full rounded-lg border px-4 py-3 text-sm font-medium
      ${
        googleLoading || loading
          ? "bg-gray-100 opacity-50 cursor-not-allowed"
          : "hover:bg-gray-50 transition"
      }`}
              whileHover={!googleLoading && !loading && { scale: 1.02 }}
              whileTap={!googleLoading && !loading && { scale: 0.98 }}
            >
              <FaGoogle className="text-lg" />
              <span>{googleLoading ? "Loading..." : "Google"}</span>
            </motion.button>

            <motion.button
              onClick={login}
              disabled={googleLoading || loading}
              className={`flex items-center justify-center gap-2 w-full rounded-lg border px-4 py-3 text-sm font-medium
      ${
        googleLoading || loading
          ? "bg-gray-100 opacity-50 cursor-not-allowed"
          : "hover:bg-gray-50 transition"
      }`}
              whileHover={!googleLoading && !loading && { scale: 1.02 }}
              whileTap={!googleLoading && !loading && { scale: 0.98 }}
            >
              <MdEmail className="text-lg" />
              <span>Email</span>
            </motion.button>
          </motion.div>

          <motion.p
            className="text-xs text-gray-500 text-center"
            variants={itemVariants}
          >
            By continuing, you agree to the Terms and Privacy Policy.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default Step1;
