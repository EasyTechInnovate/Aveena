import React, { useState } from "react";

const IdentityVerification = () => {
  const [documents, setDocuments] = useState({
    aadhar: { status: 'verified', verified: true },
    pan: { status: 'pending', verified: false },
    passport: { status: 'not-uploaded', verified: false },
    driving: { status: 'not-uploaded', verified: false }
  });

  const handleUpload = (documentType) => {
    // Handle file upload logic here
    console.log(`Uploading ${documentType}`);
  };

  const handleUploadNew = (documentType) => {
    // Handle upload new document logic here
    console.log(`Uploading new ${documentType}`);
  };

  return (
    <div className="border rounded-2xl p-6 flex-1 max-h-fit">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-darkGray mb-2">Identity verification</h1>
        <p className="text-darkGray">
          Securely confirm user identity to ensure safe and trusted access.
        </p>
      </div>

      {/* Aadhar Card Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center justify-between">
          {/* Left: Document Title */}
          <div className="flex-1">
            <h3 className="font-semibold text-darkGray text-lg">Aadhar card</h3>
          </div>

          {/* Middle: Instructions */}
          <div className="flex-2 px-8">
            <p className="text-darkGray text-sm leading-relaxed">
              Ensure all details are visible, avoid glare or blur, and use the original card (no photocopies or screenshots).
            </p>
          </div>

          {/* Right: Verification Status and Action */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {documents.aadhar.verified ? (
              <>
                <div className="flex items-center gap-2">

                  <img src="/assets/account/verify.svg" alt="" className="w-6 h-6" />

                  <span className="text-green font-medium">Verified</span>
                <button
                  onClick={() => handleUploadNew('aadhar')}
                  className="bg-blue hover:bg-blue-700 text-nowrap text-sm text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                  Upload New
                </button>
                  </div>
              </>
            ) : (
              <button
                onClick={() => handleUpload('aadhar')}
                className="text-blue hover:text-blue-800 font-medium"
              >
                Upload Photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pan Card Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start justify-between">
          {/* Left: Document Title */}
          <div className="flex-1">
            <h3 className="font-semibold text-darkGray text-lg">Pan card</h3>
          </div>

          {/* Middle: Instructions */}
          <div className="flex-2 px-8">
            <p className="text-darkGray text-sm leading-relaxed">
              Ensure all details are visible, avoid glare or blur, and use the original card (no photocopies or screenshots).
            </p>
          </div>

          {/* Right: Status/Action */}
          <div className="flex-1 flex justify-end">
            {documents.pan.status === 'pending' ? null : (
              <button
                onClick={() => handleUpload('pan')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Upload Photo
              </button>
            )}
          </div>
        </div>

        {/* Status Message at Bottom */}
        {documents.pan.status === 'pending' && (
          <div className="mt-4">
            <p className="text-darkGray text-sm">
              Your document has been submitted and is currently under verification. This may take some time — we'll notify you once the process is complete.
            </p>
          </div>
        )}
      </div>

      {/* Passport Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center justify-between">
          {/* Left: Document Title */}
          <div className="flex-1">
            <h3 className="font-semibold text-darkGray text-lg">Passport</h3>
          </div>

          {/* Middle: Instructions */}
          <div className="flex-2 px-8">
            <p className="text-darkGray text-sm leading-relaxed">
              Ensure all details are visible, avoid glare or blur, and use the original card (no photocopies or screenshots).
            </p>
          </div>

          {/* Right: Action */}
          <div className="flex-1 flex items-center justify-end">
            <button
              onClick={() => handleUpload('passport')}
              className="text-blue font-medium transition-colors"
            >
              Upload Photo
            </button>
          </div>
        </div>
      </div>

      {/* Driving Licence Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center justify-between">
          {/* Left: Document Title */}
          <div className="flex-1">
            <h3 className="font-semibold text-darkGray text-lg">Driving licence</h3>
          </div>

          {/* Middle: Instructions */}
          <div className="flex-2 px-8">
            <p className="text-darkGray text-sm leading-relaxed">
              Ensure all details are visible, avoid glare or blur, and use the original card (no photocopies or screenshots).
            </p>
          </div>

          {/* Right: Action */}
          <div className="flex-1 flex items-center justify-end">
            <button
              onClick={() => handleUpload('driving')}
              className="text-blue font-medium transition-colors"
            >
              Upload Photo
            </button>
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <div className="space-y-4 text-sm">
        {/* Personal Info Disclaimer */}
        <div>
          <p className="text-darkGray">
            To help protect your personal info, don't submit your Aadhaar or your Pan card or number. Instead, you can submit a driving licence or passport.{" "}
            <a href="#" className=" underline">
              Learn more
            </a>
          </p>
        </div>

        {/* Privacy Policy Disclaimer */}
        <div>
          <p className="text-darkGray">
            Your ID will be handled according to our{" "}
            <a href="#" className=" underline">
              Privacy Policy
            </a>{" "}
            and will not be shared with your Host or guests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;
