import React, { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { uploadToImageKit } from "../../../utils/uploadImage";

const UploadPropertyMedia = ({ propertyId, onComplete }) => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);

    try {
      const uploadPromises = files.map((file) => uploadToImageKit(file));
      
      // Wait for all images to upload to ImageKit
      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Filter out any nulls (failed uploads)
      const validUrls = uploadedUrls.filter((url) => url !== null);

      setImages((prev) => [...prev, ...validUrls]);
    } catch (error) {
      console.error("Failed to upload images", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleFinish = async () => {
    try {
      if (images.length > 0) {
        const formattedMedia = images.map((url) => ({
          type: "image",
          url: url,
        }));

        await fetch(`${import.meta.env.VITE_API_URL}/properties/details`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            propertyId: propertyId,
            propertyMedia: formattedMedia,
          }),
        });
      }
      onComplete();
    } catch (error) {
      console.error(error);
      onComplete(); 
    }
  };

  return (
    <div className="border-2 border-[#DFE0E480] bg-white p-6 rounded-2xl mt-4">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="font-bold text-2xl mb-1 text-gray-800">Upload Photos</h2>
          <p className="text-gray-500 text-sm">
            Upload high-quality images of your property to attract more bookings.
          </p>
        </div>
        <label className="cursor-pointer bg-green hover:bg-darkGreen text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
          <UploadCloud className="w-5 h-5" />
          <span>{isUploading ? "Uploading..." : "Add Photos"}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {images.map((img, index) => (
          <div key={index} className="relative group rounded-xl overflow-hidden aspect-4/3 border border-gray-200">
            <img src={img} alt={`Property ${index}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => removeImage(index)}
                className="bg-white/20 hover:bg-red-500 p-2 rounded-full text-white backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {images.length === 0 && !isUploading && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium">No photos uploaded yet</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add Photos" to begin</p>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          onClick={handleFinish}
          className="bg-green hover:bg-darkGreen px-8 py-2.5 rounded-lg text-white font-medium transition-colors"
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
};

export default UploadPropertyMedia;