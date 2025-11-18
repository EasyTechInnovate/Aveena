import React, { useState } from "react";
import UserSidebar from "../components/account/UserSidebar";

const PaymentMethods = () => {
  const [cardholder, setCardholder] = useState("Leslie Alexander");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    // Placeholder submit; integrate with backend later
    console.log({ cardholder, cardNumber, expiry });
  };

  return (
    <div className="flex gap-4 max-w-7xl mx-auto mt-6 pt-20">
      <UserSidebar />
      <div className="flex-1 max-h-fit">
        <div className="mb-2 border border-gray-200 p-4 rounded-2xl">

        <div className="mb-2 border-b border-gray-200 pb-4">
          <h1 className="text-xl font-semibold text-darkGray">Payment methods</h1>
          <p className="text-darkGray text-sm">Save money on your next adventure with Us</p>
        </div>

          <div className="flex items-center my-4 gap-16 text-sm">
            <div className="font-semibold">Payment cards</div>
            <div className="text-darkGray">Pay with Card</div>
            <button className="text-blue-600 font-semibold ml-auto">Add New Card</button>
          </div>

          <div className=" rounded-2xl bg-light p-4 flex justify-between">
            <div className="flex gap-16 justify-between text-sm">
              <div>
                <div className="text-darkGray text-sm">Card Holder Name</div>
                <div className="text-lg font-medium">Leslie Alexander</div>
              </div>
              <div>
                <div className="text-darkGray text-sm">Card Number</div>
                <div className="text-lg font-medium">1214 xxxx xxxx xx34</div>
              </div>
              <div className="flex">
                <div>
                  <div className="text-darkGray text-sm">Expiration date</div>
                  <div className="text-lg font-medium">03/31</div>
                </div>
              </div>
            </div>
                <button className="px-2 ml-auto">⋮</button>
          </div>
        </div>

        <div className="border rounded-2xl mt-6 p-4">
          <h2 className="text-xl font-semibold">Add New Card</h2>
          <p className="text-darkGray text-sm">Enter valid Details and add your Card</p>

          <form onSubmit={handleAdd} className="mt-4 border-t pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-darkGray mb-2">Cardholder's name <span className="text-red-500">*</span></label>
                <input
                  value={cardholder}
                  onChange={(e) => setCardholder(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none"
                  placeholder="Name on card"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-darkGray mb-2">Card number <span className="text-red-500">*</span></label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none"
                  placeholder="xxxx xxxx xxxx xxxx"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-darkGray mb-2">Expiration date <span className="text-red-500">*</span></label>
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-40 border rounded-xl px-4 py-3 focus:outline-none"
                  placeholder="MM/YY"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-green text-white px-4 py-3 rounded-lg font-medium">Save Details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;

