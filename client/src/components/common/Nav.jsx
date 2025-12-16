import React, { useState } from "react";
import Step1 from "../auth/Step1";
import Step2 from "../auth/Step2";
import Step3 from "../auth/Step3";
import Modal from "../common/Modal";
import UserMenu from "./UserMenu";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [phoneData, setPhoneData] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);


const { isAuth: isLoggedIn, login, logout } = useAuth();

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "List your property", href: "/partner" },
    { name: "Trip", href: "/trips-bookings" },
    { name: "Support", href: "/customer-support" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLoginComplete = () => {
    login(); // ⬅️ mark as logged in globally
    setIsModalOpen(false);
    setStep(1); // Reset to step 1 for next time
  };

  return (
    <div className="nav bg-white w-full shadow-[0px_10px_50px_0px_#0000000F] fixed top-0 left-0 right-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 h-[80px] flex justify-between items-center">
        {/* === Logo and Hamburger === */}
        <div className="flex items-center">
          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden mr-3 text-darkGray focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <div id="logo" className="max-w-32 md:max-w-40">
            <Link to="/">
              <img
                src="/assets/logo.png"
                alt="Avenna Logo"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>

        {/* === Desktop Navigation === */}
        <div className="menus hidden md:flex items-center gap-6 lg:gap-8 text-darkGray font-medium">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="hover:text-darkGreen transition-colors duration-300 whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}

          {/* === Nav Actions === */}
          <div className="navAction flex items-center gap-2 lg:gap-3">
            <button
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-2 bg-darkBlue px-2 py-2 lg:px-3 lg:py-3 rounded-md text-white cursor-pointer text-sm lg:text-base"
            >
              <img
                src="/assets/frame.svg"
                alt="download"
                className="w-6 h-5 lg:w-8 lg:h-6"
              />
              Get The App
            </button>

            {/* === Conditional Auth Section === */}
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-green px-4 py-2 lg:px-6 lg:py-3 rounded lg:rounded-xl text-white cursor-pointer text-sm lg:text-base"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* === Mobile Actions === */}
        <div className="flex md:hidden items-center gap-2">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green px-3 py-2  rounded-md lg:rounded-xl text-white cursor-pointer text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* === Mobile Dropdown Menu === */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md">
          <div className="flex flex-col space-y-3">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="py-2 text-darkGray font-medium hover:text-darkGreen transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* App Button (Mobile) */}
            <div className="pt-2 border-t border-gray-100">
              <button className="flex items-center justify-center gap-2 bg-darkBlue w-full px-4 py-3 rounded-xl text-white cursor-pointer mt-2">
                <img
                  src="/assets/frame.svg"
                  alt="download"
                  className="w-6 h-5"
                />
                Get The App
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Sign In Modal === */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStep(1); // Reset to step 1 when closing
        }}
      >
    {step === 1 ? (
  <Step1
    onNext={({ phone }) => {
      setPhoneData(phone);
      setStep(2);
    }}
    onClose={() => setIsModalOpen(false)}
  />
) : step === 2 ? (
  <Step2
    phone={phoneData}
    onBack={() => setStep(1)}
    onNext={({ isProfileComplete: profileComplete }) => {
      setIsProfileComplete(profileComplete);
      // Skip Step 3 if profile is already complete
      if (profileComplete) {
        handleLoginComplete();
      } else {
        setStep(3);
      }
    }}
    onClose={() => setIsModalOpen(false)}
  />
) : (
  <Step3
   phone={phoneData}
    onClose={handleLoginComplete}
  />
)}


      </Modal>
    </div>
  );
};

export default Nav;
