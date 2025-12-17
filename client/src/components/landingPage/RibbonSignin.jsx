import React, { useState } from "react";
import Step1 from "../auth/Step1";
import Step2 from "../auth/Step2";
import Step3 from "../auth/Step3";
import Modal from "../common/Modal";
import { useAuth } from "../../context/AuthContext";

const RibbonSignin = () => {
<<<<<<< HEAD
  const { isLoggedIn, refreshProfile } = useAuth();
=======
  const { isLoggedIn } = useAuth();
>>>>>>> dd81ab68ad52f6811e1cc2eec59ae94996be9e7f
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [phoneData, setPhoneData] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

<<<<<<< HEAD
  const handleLoginComplete = async () => {
    await refreshProfile();
=======
  const handleLoginComplete = () => {
>>>>>>> dd81ab68ad52f6811e1cc2eec59ae94996be9e7f
    setIsModalOpen(false);
    setStep(1);
  };

  if (isLoggedIn) return null;

  return (
    <div className="ribbon bg-darkBlue p-4 sm:p-6 rounded-2xl max-w-7xl mx-auto my-4 sm:my-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      {/* Left Section */}
      <div className="flex items-center gap-4 sm:gap-6 text-white">
        <img
          src="/assets/ribbon.svg"
          alt="ribbon"
          className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
        />
        <h4 className="font-normal text-sm sm:text-base md:text-lg text-center sm:text-left">
          Members save 10% or more on over 100,000 hotels worldwide when signed in
        </h4>
      </div>

      {/* Right Section */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="sm:ml-auto flex items-center justify-center gap-2 bg-green px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-md text-white cursor-pointer text-sm sm:text-base w-full sm:w-auto mt-4 sm:mt-0 hover:bg-green/90 transition-colors duration-200"
      >
        Sign In
      </button>

      {/* Modal for Sign In Steps */}
      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setStep(1);
      }}>
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

export default RibbonSignin;
