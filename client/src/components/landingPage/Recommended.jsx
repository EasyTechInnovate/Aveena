import Hotels from "../common/Hotels";
import { motion } from "framer-motion";

const hotels = [
  {
    name: "Pranaam",
    address: "Alibaug, Maharashtra",
    image: "/assets/hotels/Pranaam.png",
    maxGuests: "15",
    category: "Lonavala",
    rooms: "6",
    baths: "6",
    perNight: "43,660",
    rating: "4.6",
  },
  {
    name: "Gardenéa",
    address: "Alibaug, Maharashtra",
    image: "/assets/hotels/Gardenea.png",
    maxGuests: "26",
    category: "Alibaug",
    rooms: "7",
    baths: "6",
    perNight: "45,701",
    rating: "4.7",
  },
  {
    name: "Vista Serene",
    address: "Karjat, Maharashtra",
    image: "/assets/hotels/VistaSerene.png",
    maxGuests: "10",
    category: "Karjat",
    rooms: "3",
    baths: "3",
    perNight: "11,276",
    rating: "4.5",
  },
  {
    name: "Princess Vista - Pawna",
    address: "Lonavala, Maharashtra",
    image: "/assets/hotels/PrincessVista.png",
    maxGuests: "9",
    category: "Lonavala",
    rooms: "3",
    baths: "4",
    perNight: "50,740",
    rating: "4.8",
  },
];

const Recommended = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const hotelsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="mt-10 mb-8" variants={titleVariants}>
        <motion.h2 
          className="font-semibold text-3xl text-darkBlue"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Recommended stays for you
        </motion.h2>
        <motion.h4 
          className="text-darkBlue"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Based on your most recently viewed property
        </motion.h4>
      </motion.div>

      <motion.div 
        className="hotel-categories flex flex-wrap gap-3 my-6"
        variants={categoryVariants}
      >
        {["All", "Lonavala", "Alibaug", "Karjat"].map((category, index) => (
          <motion.button 
            key={category}
            className={`category-btn px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 text-base sm:text-lg font-medium ${
              category === "All" 
                ? "bg-blue/20 text-blue border-2 border-blue hover:bg-blue/30 active:bg-blue/40"
                : "text-gray-700 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div variants={hotelsVariants}>
        <Hotels hotels={hotels}/>
      </motion.div>
    </motion.div>
  );
};

export default Recommended;
