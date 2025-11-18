import React, { useState } from "react";

const UploadKycDocuments = ({ onCancel }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && ["image/jpeg", "image/jpg", "image/png"].includes(selected.type)) {
      setFile(selected);
    } else {
      alert("Please upload only JPG, JPEG, or PNG files.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && ["image/jpeg", "image/jpg", "image/png"].includes(droppedFile.type)) {
      setFile(droppedFile);
    } else {
      alert("Please upload only JPG, JPEG, or PNG files.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file before submitting.");
      return;
    }
    console.log("File submitted:", file);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-[#DFE0E480] bg-white p-6 rounded-2xl mt-4"
    >
      <h2 className="font-semibold text-lg mb-1">Upload Your Property KYC Documents</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Please upload valid documents to complete your KYC verification. You can use utility bills,
        property tax receipts, or other accepted proof of address and identity.
      </p>

      <hr className="border-gray-200 mb-6" />

      {/* Upload Box */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all
          ${dragActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-gray-600 mb-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-6L12 4.5m0 0 4.5 6m-4.5-6V15"
          />
        </svg>

        {file ? (
          <p className="text-green-700 font-medium">
            {file.name} uploaded successfully
          </p>
        ) : (
          <>
            <p className="text-gray-700">
              <span className="font-medium">Drag and Drop</span> Or
            </p>
            <label
              htmlFor="file-upload"
              className="bg-gray-100 border border-gray-300 mt-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              Upload Photo
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        )}

        <p className="text-xs text-gray-500 mt-2">JPG, JPEG or PNG, Max 47 MB each</p>
      </div>

      <hr className="border-gray-200 mt-8 mb-6" />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-400 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UploadKycDocuments;
