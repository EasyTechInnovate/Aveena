import React from "react";
import { Calendar } from "lucide-react";

const ViewPropertyPrice = ({ propertyData }) => {
  const cancellationDays = 12; // Selected option
  const selectedAvailability = "specific-date"; // "asap" or "specific-date"

  return (
    <div className="border-2 border-[#DFE0E480] bg-white p-8 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-2">Property Price</h2>
        <p className="text-gray-500 text-sm">
          You can Only view details you can't change any information
        </p>
      </div>

      <div className="space-y-8">
        {/* Price Per Night Section */}
        <div>
          <h3 className="font-semibold text-gray-800 text-lg mb-4">
            How much do you want to charge per night?
          </h3>
          <div>
            <label className="block font-semibold text-gray-800 mb-2">
              Price Guests Pay (Per room)
            </label>
            <input
              type="text"
              disabled
              value={propertyData.basePrice}
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
            />
            <p className="text-gray-600 text-sm mt-2">
              including taxes, commissions, and fees
            </p>
          </div>
        </div>

        {/* Cancellation Policies Section */}
        <div>
          <h3 className="font-semibold text-gray-800 text-lg mb-4">
            Cancellation Policies
          </h3>
          <p className="text-gray-700 mb-4">
            how many days before arrival can guest cancel their booking for free?
          </p>
          <div className="flex flex-wrap gap-3">
            {[1, 5, 12, 30].map((days) => (
              <button
                key={days}
                disabled
                className={`px-6 py-2.5 rounded-lg font-medium border-2 ${
                  days === cancellationDays
                    ? "bg-green text-white border-green"
                    : "bg-white text-gray-700 border-gray-300 cursor-not-allowed hover:bg-white"
                }`}
              >
                {days} Day{days > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Availability Section */}
        <div>
          <h3 className="font-semibold text-gray-800 text-lg mb-4">Availability</h3>
          <p className="text-gray-700 mb-4">
            What's your First date when Guest can check = in?
          </p>
          
          {/* Radio Buttons */}
          <div className="space-y-3 mb-4">
            <label className="flex items-center gap-3 cursor-not-allowed">
              <div className="relative">
                <input
                  type="radio"
                  name="availability"
                  value="asap"
                  checked={selectedAvailability === "asap"}
                  disabled
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAvailability === "asap"
                      ? "bg-green border-green"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {selectedAvailability === "asap" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <span className="text-gray-800 text-sm">As soon as possible</span>
            </label>

            <label className="flex items-center gap-3 cursor-not-allowed">
              <div className="relative">
                <input
                  type="radio"
                  name="availability"
                  value="specific-date"
                  checked={selectedAvailability === "specific-date"}
                  disabled
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAvailability === "specific-date"
                      ? "bg-green border-green"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {selectedAvailability === "specific-date" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <span className="text-gray-800 text-sm">On a Specific Date</span>
            </label>
          </div>

          {/* Date Selector */}
          <div className="mb-4">
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
            >
              <Calendar className="w-5 h-5 text-gray-600" />
              <span>Select Date</span>
            </button>
          </div>

          {/* Input Field */}
          <div>
            <input
              type="text"
              disabled
              placeholder="Enter Name"
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPropertyPrice;

