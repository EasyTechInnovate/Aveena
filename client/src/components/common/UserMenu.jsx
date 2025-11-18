import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // adjust the path if needed

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth(); // from context

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Example user data (you can later fetch this from backend or context)
  const user = {
    name: "Leslie Alexander",
    phone: "123 4356 568",
    initials: "LA",
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center font-semibold hover:opacity-90"
      >
        {user.initials}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden z-50">
          {/* User Info */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center font-semibold">
              {user.initials}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 leading-tight">
                {user.name}
              </h4>
              <p className="text-sm text-gray-500">{user.phone}</p>
            </div>
          </div>

          {/* Menu Links */}
          <ul className="text-sm text-darkBlue">
            <li
              onClick={() => {
                navigate("/account");
                setOpen(false);
              }}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer px-4 py-3"
            >
              Account Settings
            </li>
            <li
              onClick={() => {
                navigate("/bookings");
                setOpen(false);
              }}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer px-4 py-3"
            >
              My Bookings
            </li>
            <li
              onClick={() => {
                navigate("/collections");
                setOpen(false);
              }}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer px-4 py-3"
            >
              Collections
            </li>
            <li
              onClick={() => {
                navigate("/wishlist");
                setOpen(false);
              }}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer px-4 py-3"
            >
              Wishlist
            </li>
            <li
              onClick={() => {
                navigate("/support");
                setOpen(false);
              }}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer px-4 py-3"
            >
              Need help?
            </li>
            <li
              onClick={() => {
                logout(); // now properly logs out user
                setOpen(false);
              }}
              className="text-red-500 px-4 py-3 hover:bg-gray-50 cursor-pointer font-medium"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
