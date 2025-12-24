import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // adjust the path if needed

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user: authUser } = useAuth(); // from context

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

  // Generate user data from auth context
  const getUserData = () => {
    if (!authUser) {
      return {
        name: "User",
        phone: "",
        initials: "U",
        profilePicture: null,
      };
    }

    // Generate full name
    const firstName = authUser.firstName || "";
    const lastName = authUser.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim() || authUser.email || "User";

    // Generate initials
    let initials = "U";
    if (firstName && lastName) {
      initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      initials = firstName.charAt(0).toUpperCase();
    } else if (authUser.email) {
      initials = authUser.email.charAt(0).toUpperCase();
    }

    // Format phone number
    let phoneDisplay = "";
    if (authUser.phone?.countryCode && authUser.phone?.number) {
      phoneDisplay = `${authUser.phone.countryCode} ${authUser.phone.number}`;
    } else if (authUser.phone?.number) {
      phoneDisplay = authUser.phone.number;
    }

    return {
      name: fullName,
      phone: phoneDisplay,
      initials: initials,
      profilePicture: authUser.profilePicture || null,
    };
  };

  const user = getUserData();

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center font-semibold hover:opacity-90 overflow-hidden"
      >
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <span style={{ display: user.profilePicture ? 'none' : 'flex' }} className="w-full h-full items-center justify-center">
          {user.initials}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden z-50">
          {/* User Info */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center font-semibold overflow-hidden relative flex-shrink-0">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.target.style.display = 'none';
                    const fallback = e.target.parentElement.querySelector('.initials-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <span 
                className={`initials-fallback ${user.profilePicture ? 'absolute inset-0' : ''}`}
                style={{ display: user.profilePicture ? 'none' : 'flex' }}
              >
                {user.initials}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-center flex-1">
              <h4 className="font-semibold text-gray-900 leading-tight text-center">
                {user.name}
              </h4>
              {user.phone && (
                <p className="text-sm text-gray-500 text-center">{user.phone}</p>
              )}
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
                navigate("/trips-bookings");
                setOpen(false);
              }}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer px-4 py-3"
            >
              My Bookings
            </li>
            {/* <li
              onClick={() => {
                navigate("/collections");
                setOpen(false);
              }}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer px-4 py-3"
            >
              Collections
            </li> */}
            {/* <li
              onClick={() => {
                navigate("/wishlist");
                setOpen(false);
              }}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer px-4 py-3"
            >
              Wishlist
            </li> */}
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
                logout();
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
