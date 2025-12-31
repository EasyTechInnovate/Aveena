import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-green text-white overflow-hidden flex items-center justify-center relative focus:outline-none"
      >
        {/* Centered Logo Image */}
        {user.profilePicture && (
          <img
            src={user.profilePicture}
            alt="User Logo"
            className="w-full h-full object-cover mx-auto"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback =
                e.currentTarget.parentElement.querySelector(
                  ".initials-fallback"
                );
              if (fallback) fallback.style.display = "flex";
            }}
          />
        )}

        {/* Initials Fallback */}
        <span
          className="initials-fallback absolute inset-0 flex items-center justify-center font-semibold text-white"
          style={{ display: user.profilePicture ? "none" : "flex" }}
        >
          {initials}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b">
            <p className="font-medium text-darkGray">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            <Link
              to="/account"
              className="px-4 py-2 hover:bg-gray-100 text-sm"
              onClick={() => setOpen(false)}
            >
              My Account
            </Link>

            <Link
              to="/trips-bookings"
              className="px-4 py-2 hover:bg-gray-100 text-sm"
              onClick={() => setOpen(false)}
            >
              My Trips
            </Link>

            <button
              onClick={() => {
                logout();
                setOpen(false);
                navigate("/");
              }}
              className="px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
