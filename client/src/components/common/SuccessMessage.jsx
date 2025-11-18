import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const SuccessMessage = ({ title, message, linkText, linkHref }) => {
  return (
    <div className="flex items-start gap-3 bg-[#F2FFFA] border border-[#A9E5C1] rounded-xl p-4 mt-6 text-gray-700">
      <CheckCircleIcon className="w-6 h-6 text-green-600 mt-0.5" />
      <div>
        <p className="font-semibold text-green-700">{title}</p>
        <p className="text-sm mt-1">
          {message}{" "}
          {linkText && (
            <a href={linkHref} className="text-green-600 font-medium">
              {linkText}
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;
