import React, { useState } from "react";
import {
  sendOtp,
  verifyOtp,
  completeProfile
} from "../services";

const Test = () => {
  const [otp, setOtp] = useState("");
  const email = "swera7827@gmail.com";

  // ---------------- SEND OTP ----------------
  const handleSendOtp = async () => {
    try {
      const res = await sendOtp({ email });
      console.log("OTP sent:", res.data);
      alert("OTP sent to email!");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ---------------- VERIFY OTP ----------------
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP first");
      return;
    }

    try {
      const res = await verifyOtp({
        email,
        verificationCode: otp
      });

      console.log("OTP verified:", res.data);

      // store tokens
      localStorage.setItem(
        "accessToken",
        res.data.data.accessToken
      );
      localStorage.setItem(
        "refreshToken",
        res.data.data.refreshToken
      );

      alert("OTP verified successfully!");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("OTP verification failed!");
    }
  };

  // ---------------- COMPLETE PROFILE ----------------
  const handleCompleteProfile = async () => {
    try {
      const res = await completeProfile({
        firstName: "John",
        lastName: "Doe",
        email: "swera7827@gmail.com",
        phone: {
          countryCode: "+91",
          number: "1234567890",
        },
      });

      console.log("Profile Completed:", res.data);
      alert("Profile completed!");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Profile completion failed!");
    }
  };

  return (
    <div className="h-screen flex flex-col gap-3 items-center justify-center">

      <button
        onClick={handleSendOtp}
        className="bg-blue-500 px-4 py-2 rounded text-white"
      >
        Send OTP
      </button>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="border px-2 py-1 rounded"
      />

      <button
        onClick={handleVerifyOtp}
        className="bg-green-500 px-4 py-2 rounded text-white"
      >
        Verify OTP
      </button>

      <button
        onClick={handleCompleteProfile}
        className="bg-purple-500 px-4 py-2 rounded text-white"
      >
        Complete Profile
      </button>

    </div>
  );
};

export default Test;
