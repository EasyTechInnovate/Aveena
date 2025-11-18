import React from "react";
import { FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

const Step1 = ({ onNext, onClose }) => {
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

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
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
          alt="" 
          className="object-cover w-full h-full rounded-lg" 
        />
      </motion.div>

      {/* Right Side (Form Section) */}
      <div className="w-full md:flex-2 flex flex-col justify-center items-center pr-4">
        <motion.button 
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
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
          <motion.p 
            className="mb-6 text-sm"
            variants={itemVariants}
          >
            Unlock a world of travel with one account across Expedia, Hotels.com, and Vrbo.
          </motion.p>

          <motion.div 
            className="flex items-center border rounded-lg overflow-hidden mb-4"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <select className="p-3 bg-transparent outline-none border-r">
              <option>+91</option>
            </select>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              className="w-full p-3 outline-none"
            />
          </motion.div>

          <motion.button   
            onClick={onNext} 
            className="bg-green text-white w-full py-3 rounded-lg font-medium hover:bg-darkGreen transition mb-4"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Get OTP
          </motion.button>

          <motion.div 
            className="flex justify-center gap-4 mb-4"
            variants={itemVariants}
          >
            <motion.button 
              className="flex items-center text-nowrap gap-2 border rounded-lg px-4 py-3 w-full justify-center hover:bg-gray-100 transition"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaGoogle className="text-lg" />
              </motion.div>
              <span>Sign in with Google</span>
            </motion.button>

            <motion.button 
              className="flex text-nowrap items-center gap-2 border rounded-lg px-4 py-3 w-full justify-center hover:bg-gray-100 transition"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <MdEmail className="text-lg" />
              </motion.div>
              <span>Sign in with Email</span>
            </motion.button>
          </motion.div>

          <motion.p 
            className="text-xs text-gray-500 text-center"
            variants={itemVariants}
          >
            By continuing, you have read and agree to our{" "}
            <motion.a 
              href="#" 
              className="text-blue hover:underline"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Terms and Conditions
            </motion.a>
            ,{" "}
            <motion.a 
              href="#" 
              className="text-blue hover:underline"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Privacy Statement
            </motion.a>
            , and{" "}
            <motion.a 
              href="#" 
              className="text-blue hover:underline"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Aaveena Rewards Terms and Conditions
            </motion.a>
            .
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Step1;
