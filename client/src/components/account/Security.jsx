import React, { useState } from "react";

const Security = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState("user@example.com");

  const handleSaveEmail = () => {
    setIsEditingEmail(false);
    // Here you would typically save the email to your backend
  };

  const handleCancelEmail = () => {
    setIsEditingEmail(false);
    // Reset email to original value if needed
  };

  return (
    <div className="border rounded-2xl p-6 flex-1 max-h-fit">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-darkGray mb-2">Security settings</h1>
        <p className="text-darkGray">
          Keep your account safe with a secure password and by signing out of devices you're not actively using.
        </p>
      </div>

      {/* Email Address Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-darkGray mb-2">Email address</h3>
            {isEditingEmail ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-darkGray mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full max-w-md p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email Address"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCancelEmail}
                    className="text-blue font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEmail}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  {/* <p className="text-darkGray font-semibold">Email address</p> */}
                  <p className="text-darkGray">{email}</p>
                </div>
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="text-blue font-medium"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two-factor Authentication Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-darkGray mb-2">Two-factor authentication</h3>
            <p className="text-darkGray">
              Increase your account's security by setting up two-factor authentication.
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Edit
          </button>
        </div>
      </div>

      {/* Active Sessions Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-darkGray mb-2">Active sessions</h3>
            <p className="text-darkGray">
              Selecting "Sign out" will sign you out from all devices except this one. This can take up to 10 minutes.
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Edit
          </button>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-red-600 mb-2">Delete account</h3>
            <p className="text-darkGray">
              Permanently delete your avenaa account and data.
            </p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Security;
