import React from "react";
import { Download, FileText } from "lucide-react";

const SignPatron = () => {
  return (
    <div className="p-6 bg-white rounded-xl border border-[#DFE0E480]">
      {/* Title */}
      <h2 className="text-lg font-semibold text-darkBlue mb-1">
        Sign Patron Document
      </h2>
      <p className="text-sm text-[#1e1e1e] mb-5">
      You need to digitally sign the Patron Document using your Aadhaar through DigiLocker. Once signed, the document will be available in PDF format and automatically linked for verification.
      </p>

<div className="w-full border-b border-border my-4"/>

      {/* Document box */}
      <div className="bg-light rounded-lg p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {/* PDF icon — replace src later */}
          <div className="flex-shrink-0">
            <img
              src="/assets/partnerDashboard/pdf.svg"
              alt="PDF Icon"
              className="w-16 h-16"
            />
          </div>
          <div>
            <h3 className="font-semibold text-[#1e1e1e]">
              Patron Agreement.PDF
            </h3>
            <p className="text-sm text-[#1e1e1e]">
              This PDF contains the Patron Agreement that must be digitally
              signed using your Aadhaar via DigiLocker. Please review the
              agreement carefully and complete the e-sign process to proceed
              with verification.
            </p>
          </div>
        </div>

        {/* Download icon */}
        <button className="flex-shrink-0 my-auto p-2 border border-[#DFE0E4] rounded-xl cursor-pointer bg-white text-gray-500 hover:text-gray-700">
          <Download size={20} />
        </button>
      </div>

      {/* Button */}
      <div className="mt-5 flex justify-end">
        <button className="bg-green text-white px-5 py-2 rounded-md font-medium hover:bg-green-700 transition">
          Sign With DigiLocker
        </button>
      </div>
    </div>
  );
};

export default SignPatron;
