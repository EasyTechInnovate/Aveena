import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const Step2 = ({ onBack, onNext, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const otpVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    focus: {
      scale: 1.1,
      boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.3)",
      transition: { duration: 0.2 }
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(4 - newOtp.length).fill('')]);
  };

  return (
    <motion.div 
      className="flex bg-white rounded-2xl relative h-[60vh] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Side (Images Grid) */}
      <motion.div 
        className="flex-2 p-4"
        variants={imageVariants}
      >
        <img
          src="/assets/auth/left.png"
          alt="Auth side"
          className="object-cover w-full h-full rounded-lg"
        />
      </motion.div>

      {/* Right Side (OTP Section) */}
      <div className="w-full md:flex-2 flex flex-col justify-center items-center pr-4 relative">
        {/* Close button */}
        <motion.button 
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          ×
        </motion.button>

        <div className="w-full max-w-md">
          {/* Go Back */}
          <motion.button 
            onClick={onBack} 
            className="flex items-center text-darkBlue font-medium mb-6 hover:underline"
            variants={itemVariants}
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            ← Go Back
          </motion.button>

          {/* OTP Header */}
          <motion.h2 
            className="text-2xl font-semibold mb-2"
            variants={itemVariants}
          >
            Enter OTP
          </motion.h2>
          <motion.p 
            className="text-sm text-gray-600 mb-6"
            variants={itemVariants}
          >
            Enter the secure code we sent to <b>+91 123 4346 653</b>. Check your
            message or spam folder.
          </motion.p>

          {/* OTP Input Boxes */}
          <motion.div 
            className="flex justify-between mb-6"
            variants={itemVariants}
          >
            {[0, 1, 2, 3].map((index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center border border-gray-300 rounded-lg text-xl font-medium focus:outline-none focus:ring-2 focus:ring-green"
                variants={otpVariants}
                whileFocus="focus"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </motion.div>

          {/* Verify Button */}
          <motion.button 
            onClick={onNext} 
            className="bg-green text-white w-full py-3 rounded-lg font-medium hover:bg-darkGreen transition mb-4"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Verify OTP
          </motion.button>

          {/* Resend Code */}
          <motion.p 
            className="text-sm text-center text-gray-600"
            variants={itemVariants}
          >
            Didn't receive a code?{" "}
            <motion.a 
              href="#" 
              className="text-darkBlue font-medium hover:underline"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Resend Code
            </motion.a>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Step2;
