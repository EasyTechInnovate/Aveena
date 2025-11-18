import FavouriteStay from "../components/landingPage/FavouriteStay";
import DubaiStay from "../components/landingPage/DubaiStay";
import Recommended from "../components/landingPage/Recommended";
import RibbonSignin from "../components/landingPage/RibbonSignin";
import Search from "../components/landingPage/Search";
import React from "react";
import DealCta from "../components/landingPage/DealCta";
import Trusted from "../components/landingPage/Trusted";
import Deals from "../components/landingPage/Deals";
import CtaJoin from "../components/landingPage/CtaJoin";
import BannerApp from "../components/landingPage/BannerApp";
import { motion } from "framer-motion";

const Home = () => {
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

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-30"
    >
      <motion.div variants={sectionVariants}>
        <Search />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <RibbonSignin />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <Recommended />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <DubaiStay />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <FavouriteStay />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <DealCta />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <Recommended />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <Trusted />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <Deals />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <CtaJoin />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <BannerApp />
      </motion.div>
    </motion.div>
  );
};

export default Home;
