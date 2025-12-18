import React, { useState } from "react";
import UserSidebar from "./UserSidebar";

const UserDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 pt-20 mt-6">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 p-3 border rounded-xl text-darkGray hover:bg-light transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="font-semibold">Menu</span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white z-50 overflow-y-auto md:hidden shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg">Account Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-light rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <UserSidebar onNavigate={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto mt-6 pt-0 md:pt-20 px-4 sm:px-6">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <UserSidebar />
        </div>
        {/* Content - Shows first on mobile */}
        <div className="order-first md:order-0 flex-1">
          {children}
        </div>
      </div>
    </>
  );
};

export default UserDashboardLayout;
