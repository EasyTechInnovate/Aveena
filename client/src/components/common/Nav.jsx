import React, { useState } from "react";
import Step1 from "../auth/Step1";
import Step2 from "../auth/Step2";
import Modal from "../common/Modal";
import UserMenu from "./UserMenu";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [phoneData, setPhoneData] = useState(null);

  const navigate = useNavigate();
  const { isAuth: isLoggedIn, refreshProfile } = useAuth();

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "List your property", href: "/partner" },
    { name: "Trip", href: "/trips-bookings" },
    { name: "Support", href: "/customer-support" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLoginComplete = async () => {
    await refreshProfile();
    setIsModalOpen(false);
    setStep(1);
  };

  return (
    <div className="nav bg-white w-full shadow-[0px_10px_50px_0px_#0000000F] fixed top-0 left-0 right-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
        {/* Logo & Hamburger */}
        <div className="flex items-center">
          <button
            className="md:hidden mr-3 text-darkGray"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="max-w-32 md:max-w-40">
            <Link to="/">
              <img
                src="/assets/logo.png"
                alt="Avenna Logo"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-darkGray font-medium">
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="hover:text-darkGreen"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-2 bg-darkBlue px-3 py-3 rounded-md text-white"
            >
              <img src="/assets/frame.svg" alt="download" className="w-6 h-5" />
              Get The App
            </button>

            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green px-6 py-3 rounded-xl text-white"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Action */}
        <div className="md:hidden">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green px-3 py-2 rounded-md text-white"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md">
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block py-2 text-darkGray"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      {/* Auth Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStep(1);
        }}
      >
        {step === 1 ? (
          <Step1
            onNext={({ phone, googleAuth }) => {
              if (googleAuth) {
                handleLoginComplete();
              } else {
                setPhoneData(phone);
                setStep(2);
              }
            }}
            onClose={() => setIsModalOpen(false)}
          />
        ) : (
          <Step2
            phone={phoneData}
            onBack={() => setStep(1)}
            onNext={handleLoginComplete}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Nav;
