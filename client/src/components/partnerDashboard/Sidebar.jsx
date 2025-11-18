import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed top-[80px] left-0 h-[calc(100vh-80px)] w-[280px] flex flex-col px-6 py-10 border-r-2 bg-white z-40 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div
          className={`flex items-center gap-4 px-6 py-4 w-full rounded cursor-pointer ${
            isActive("/dashboard/partner")
              ? "bg-light text-green"
              : "text-darkGray hover:bg-light"
          }`}
          onClick={() => handleNavigation("/dashboard/partner")}
        >
          <img
            src={
              isActive("/dashboard/partner")
                ? "/assets/partnerDashboard/greenuser.svg"
                : "/assets/partnerDashboard/user.svg"
            }
            alt="user"
          />

          <h3>Dashboard</h3>

          <img
            src={
              isActive("/dashboard/partner")
                ? "/assets/account/greenArrow.svg"
                : "/assets/account/blueArrow.svg"
            }
            alt="arrow"
            className="ml-auto"
          />
        </div>

         <div
          className={`flex items-center gap-4 px-6 py-4 w-full rounded cursor-pointer ${
            isActive("/dashboard/property")
              ? "bg-light text-green"
              : "text-darkGray hover:bg-light"
          }`}
          onClick={() => handleNavigation("/dashboard/property")}
        >
          <img
            src={
              isActive("/dashboard/property")
                ? "/assets/partnerDashboard/greenuser.svg"
                : "/assets/partnerDashboard/user.svg"
            }
            alt="user"
          />

          <h3>My Property</h3>

          <img
            src={
              isActive("/dashboard/property")
                ? "/assets/account/greenArrow.svg"
                : "/assets/account/blueArrow.svg"
            }
            alt="arrow"
            className="ml-auto"
          />
        </div>


         <div
          className={`flex items-center gap-4 px-6 py-4 w-full rounded cursor-pointer ${
            isActive("/dashboard/bookings")
              ? "bg-light text-green"
              : "text-darkGray hover:bg-light"
          }`}
          onClick={() => handleNavigation("/dashboard/bookings")}
        >
          <img
            src={
              isActive("/dashboard/bookings")
                ? "/assets/partnerDashboard/greenuser.svg"
                : "/assets/partnerDashboard/user.svg"
            }
            alt="user"
          />

          <h3>My Bookings</h3>

          <img
            src={
              isActive("/dashboard/bookings")
                ? "/assets/account/greenArrow.svg"
                : "/assets/account/blueArrow.svg"
            }
            alt="arrow"
            className="ml-auto"
          />
        </div>





      </div>


      <div className="flex flex-col gap-4 mt-auto">
         <div
          className={`flex items-center gap-4 px-6 py-4 w-full rounded cursor-pointer`}
          onClick={() => handleNavigation("/help")}
        >
          <img
            src="/assets/partnerDashboard/user.svg"
            alt="user"
          />

          <h3>Visit the Help Centre</h3>
        </div>
   <div
          className={`flex items-center text-[#E94235] gap-4 px-6 py-4 w-full rounded cursor-pointer`}
          onClick={() => handleNavigation("/help")}
        >
          <img
            src="/assets/partnerDashboard/reduser.svg"
            alt="user"
          />

          <h3>Logout</h3>
        </div>


      </div>
    </div>
  );
};

export default Sidebar;
