import React, { useState } from "react";
import UserDashboardLayout from "../components/account/UserDashboardLayout";

const Feedback = () => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log. Wire to API later.
    console.log({ type, message });
  };

  return (
    <UserDashboardLayout>
      <form onSubmit={handleSubmit} className="border rounded-2xl p-4 flex-1 max-h-fit">
        <div className="mb-2 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-semibold text-darkGray mb-2">Share your feedback</h1>
          <p className="text-darkGray text-sm">
            Get quick assistance and reliable solutions from our support team anytime you need help.
          </p>
        </div>

        <div className="mt-4">
          <label className="block text-darkGray text-sm font-semibold mb-2">Select Type Of Problem</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-xl px-4 py-4 focus:outline-none"
            required
          >
            <option value="" disabled>Select type</option>
            <option value="booking">Booking issue</option>
            <option value="payment">Payment</option>
            <option value="account">Account</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mt-6">
          <label className="block text-darkGray text-sm font-semibold mb-2">Describe</label>
          <textarea
            placeholder="Write here......"
            className="w-full min-h-[200px] border rounded-2xl px-4 py-4 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-green text-white font-medium px-4 py-3 rounded-lg"
          >
            Submit feedback
          </button>
        </div>
      </form>
    </UserDashboardLayout>
  );
};

export default Feedback;

