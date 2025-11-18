import React from "react";
import { AlertCircle } from "lucide-react";

const KYCInfoBanner = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-yellow-800" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 text-sm leading-relaxed">
            Submit Your KYC Information. Your details have been submitted successfully and are now awaiting admin approval. You'll be notified once your account is approved. If your personal KYC is still pending, please complete it to avoid delays.{" "}
            <a href="/update-kyc" className="text-green-600 font-medium hover:underline">
              Update KYC
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default KYCInfoBanner;

