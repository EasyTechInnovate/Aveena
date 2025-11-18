import React, { useState } from 'react'
import { Upload, X, GripVertical } from 'lucide-react'

const PropertyPhotos = ({ propertyId, onCancel, onSave }) => {
  const [uploadedPhotos, setUploadedPhotos] = useState([
    { id: 1, url: '/assets/property/photo1.jpg' },
    { id: 2, url: '/assets/property/photo2.jpg' },
    { id: 3, url: '/assets/property/photo3.jpg' },
    { id: 4, url: '/assets/property/photo4.jpg' },
  ])

  const handleFileUpload = (e) => {
    const files = e.target.files
    // Handle file upload logic here
    console.log('Files selected:', files)
  }

  const handleDeletePhoto = (photoId) => {
    setUploadedPhotos((prev) => prev.filter((photo) => photo.id !== photoId))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Upload at least 5 photos of your property
        </h1>
        <p className="text-gray-600 text-sm">
          The more you can upload the more likely you are get Booking. you can add more later.
        </p>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <div className="border border-gray-300 rounded-lg p-8 text-center bg-gray-50">
          <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center">
              <Upload size={32} className="text-black" />
            </div>
            <div className="space-y-2">
              <p className="text-black font-medium">
                Drag and Drop Or
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="px-6 py-2.5 border-2 border-gray-300 rounded-lg font-medium cursor-pointer transition-colors inline-block">
                  Upload Photo
                </span>
              </label>
            </div>
            <p className="text-gray-900 text-sm mt-2">
              JPG, JPEG or PNG, Max 47 MB each
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Photos Display */}
      {uploadedPhotos.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-4">
            {uploadedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group"
              >
                {/* Image */}
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Photo {photo.id}</span>
                </div>

                {/* Controls */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-white rounded shadow-sm hover:bg-gray-50">
                    <GripVertical size={16} className="text-gray-600" />
                  </button>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default PropertyPhotos

