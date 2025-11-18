import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Step3 = ({onClose}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.3)",
      transition: { duration: 0.2 }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Close modal after success animation
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <motion.div 
      className="flex bg-white rounded-2xl h-[60vh] relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Side (Images Grid) */}
      <motion.div 
        className="flex-1 p-4"
        variants={imageVariants}
      >
        <img
          src="/assets/auth/left.png"
          alt="auth left"
          className="object-cover w-full h-full rounded-lg"
        />
      </motion.div>

      {/* Right Side (Form Section) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center pr-4">
        <motion.button 
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          ×
        </motion.button>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                  className="text-2xl font-semibold mb-2"
                  variants={itemVariants}
                >
                  Update Profile info
                </motion.h2>
                <motion.p 
                  className="mb-6 text-sm text-gray-600"
                  variants={itemVariants}
                >
                  Update your legal name and contact email to proceed
                </motion.p>

                <motion.div 
                  className="flex gap-3 mb-4"
                  variants={itemVariants}
                >
                  <motion.input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-1/2 p-3 border rounded-lg outline-none focus:border-green-500"
                    variants={inputVariants}
                    whileFocus="focus"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-1/2 p-3 border rounded-lg outline-none focus:border-green-500"
                    variants={inputVariants}
                    whileFocus="focus"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.input
                  type="email"
                  placeholder="Contact Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-3 border rounded-lg outline-none focus:border-green-500 mb-6"
                  variants={itemVariants}
                  whileFocus="focus"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-500 text-white w-full py-3 rounded-xl font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  variants={itemVariants}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Updating...
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Update
                      </motion.span>
                    )}
                  </AnimatePresence>
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
                <motion.div
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <motion.svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>
                <motion.h2 
                  className="text-2xl font-semibold mb-2 text-green-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Profile Updated!
                </motion.h2>
                <motion.p 
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Your profile has been successfully updated.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Step3;
