import React from "react";
import UserSidebar from "../components/account/UserSidebar";

const HelpCentre = () => {
  return (
    <div className="flex gap-4 max-w-7xl mx-auto mt-6 pt-20">
      <UserSidebar />
      <div className="border rounded-2xl p-6 flex-1 max-h-fit">
        <div className="mb-2 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-darkGray mb-2">Visit the Help Centre</h1>
          <p className="text-darkGray">
            Get quick assistance and reliable solutions from our support team anytime you need help.
          </p>
        </div>

        <div className="">
          <div className="divide-y">
            <div className="py-4 flex items-center justify-between">
              <div className="pr-6">
                <h2 className="text-xl font-semibold text-darkGray">Email With Us</h2>
                <p className="text-darkGray mt-2">
                  Reach out to us via email for detailed support and personalized assistance
                </p>
              </div>
              <a href="mailto:support@avenaa.com" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl whitespace-nowrap">Email Us</a>
            </div>

            <div className="py-4 flex items-center justify-between">
              <div className="pr-6">
                <h2 className="text-xl font-semibold text-darkGray">Connect With Call</h2>
                <p className="text-darkGray mt-2">
                  Reach out to us via Call for detailed support and personalized assistance
                  <span className="ml-2 font-semibold text-darkGray">+91 132 4574 686</span>
                </p>
              </div>
              <a href="tel:+911324574686" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl whitespace-nowrap">Call Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCentre;

