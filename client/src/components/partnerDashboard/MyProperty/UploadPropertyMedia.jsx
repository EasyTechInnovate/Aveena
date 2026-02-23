import React, { useState } from "react";
import { UploadCloud, X, Plus, Trash2 } from "lucide-react";
import { uploadToImageKit } from "../../../utils/uploadImage";

const UploadPropertyMedia = ({ propertyId, onComplete }) => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // 👇 ADDED: State to catch and show backend errors
  const [errorMessage, setErrorMessage] = useState("");

  const [villaLocationDescription, setVillaLocationDescription] = useState("");
  const [spaces, setSpaces] = useState("");
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  console.log("Upload image page for property id: ", propertyId);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    setErrorMessage(""); // Clear errors when interacting

    try {
      const uploadPromises = files.map((file) => uploadToImageKit(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter((url) => url !== null);
      setImages((prev) => [...prev, ...validUrls]);
    } catch (error) {
      console.error("Failed to upload images", error);
      setErrorMessage("Failed to upload to ImageKit. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
    if (errorMessage) setErrorMessage("");
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleFinish = async () => {
    setIsSaving(true);
    setErrorMessage("");

    try {
      if (images.length === 0) {
        throw new Error("Please upload at least one image.");
      }

      const formattedMedia = images.map((url) => ({
        type: "image",
        url: url,
      }));

      // 👇 CHANGED: Formatting spaces as objects [{name: "Pool"}] instead of strings to prevent the backend validation error
      const formattedSpaces = spaces
        .split(",")
        .map((space) => space.trim())
        .filter((space) => space !== "")
        .map((space) => ({ name: space })); // Try sending as objects!

      const formattedFaqs = faqs.filter(
        (faq) => faq.question.trim() !== "" && faq.answer.trim() !== ""
      );

      const payload = {
        propertyId: propertyId,
        propertyMedia: formattedMedia,
        spaces: [],
        meals: {}, 
        villaLocationDescription: villaLocationDescription,
        experiences: {}, 
        faqs: formattedFaqs,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/properties/details`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });

      // 👇 ADDED: Parse the backend response BEFORE deciding what to do
      const data = await response.json();

      if (!response.ok) {
        // If backend throws an error, throw it so the catch block gets it!
        throw new Error(data.message || "Failed to update property details");
      }
      
      // 👇 SUCCESS: Only call onComplete (which redirects) if response is 100% OK!
      onComplete(); 

    } catch (error) {
      console.error("Error finalizing property media and details:", error);
      // 👇 FAIL: Show error on UI and DO NOT call onComplete()
      setErrorMessage(error.message); 
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border-2 border-[#DFE0E480] bg-white p-6 rounded-2xl mt-4">
      {/* --- IMAGE UPLOAD SECTION --- */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="font-bold text-2xl mb-1 text-gray-800">Upload Photos</h2>
          <p className="text-gray-500 text-sm">
            Upload high-quality images of your property to attract more bookings.
          </p>
        </div>
        <label className={`cursor-pointer bg-green hover:bg-darkGreen text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}>
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

      <hr className="my-8 border-gray-200" />

      {/* --- PROPERTY DETAILS SECTION --- */}
      <div className="mb-8">
        <h2 className="font-bold text-2xl mb-1 text-gray-800">Additional Details</h2>
        <p className="text-gray-500 text-sm mb-6">
          Provide more information about the property layout and common questions.
        </p>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label className="block font-semibold mb-2">Location Description</label>
            <textarea
              value={villaLocationDescription}
              onChange={(e) => {
                setVillaLocationDescription(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="e.g., Located in Nerul, Bardez, just 10 mins from the beach..."
              className="w-full border rounded-lg p-3 min-h-20 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Available Spaces</label>
            <input
              type="text"
              value={spaces}
              onChange={(e) => {
                setSpaces(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="e.g., Living Room, Private Garden, Rooftop Deck (comma separated)"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-lg mb-4 text-darkBlue">Frequently Asked Questions</h3>
          
          {faqs.map((faq, index) => (
            <div key={index} className="flex gap-4 mb-4 items-start">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  placeholder="Question (e.g., Is parking available?)"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Answer (e.g., Yes, free parking is available on-site.)"
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              {faqs.length > 1 && (
                <button
                  onClick={() => removeFaq(index)}
                  className="mt-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove FAQ"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addFaq}
            className="flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors mt-2"
          >
            <Plus className="w-4 h-4" /> Add Another FAQ
          </button>
        </div>
      </div>

      {/* 👇 ADDED: The Error Alert Block 👇 */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium">
          ⚠️ {errorMessage}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          onClick={handleFinish}
          disabled={isUploading || isSaving || images.length === 0}
          className="bg-green hover:bg-darkGreen px-8 py-2.5 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Finish Setup"}
        </button>
      </div>
    </div>
  );
};

export default UploadPropertyMedia;