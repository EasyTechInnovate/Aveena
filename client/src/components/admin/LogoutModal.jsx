import React from 'react'
import { LogOut } from 'lucide-react'

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red Door Icon - Large and Prominent */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            <LogOut size={48} className="text-red-500" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title - Bold Dark Gray */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-3">
          Are you logging out?
        </h2>

        {/* Description - Lighter Gray */}
        <p className="text-sm text-gray-600 text-center mb-8 leading-relaxed">
          Are you sure you want to log out? You'll need to sign in again to access your dashboard
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Yes, Please logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal

