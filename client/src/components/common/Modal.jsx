import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black/60 flex items-center justify-center px-4 py-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
