import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="flex-1 flex flex-col gap-6 max-w-xs">
        <div className="p-6 rounded-2xl border flex flex-col gap-2">
          <h2 className="font-semibold">Manage account</h2>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/account') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/account')}
          >
            <h3 className="mr-auto">Personal details</h3>
            <img 
              src={isActive('/account') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/security') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/security')}
          >
            <h3 className="mr-auto">Security settings</h3>
            <img 
              src={isActive('/security') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/identity-verification') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/identity-verification')}
          >
            <h3 className="mr-auto">Identity verification</h3>
            <img 
              src={isActive('/identity-verification') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl border flex flex-col gap-2">
          <h2 className="font-semibold">Help and support</h2>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/customer-support') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/customer-support')}
          >
            <h3 className="mr-auto">Customer Support</h3>
            <img 
              src={isActive('/customer-support') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/help-centre') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/help-centre')}
          >
            <h3 className="mr-auto">Visit the Help Centre</h3>
            <img 
              src={isActive('/help-centre') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/feedback') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/feedback')}
          >
            <h3 className="mr-auto">Share your feedback</h3>
            <img 
              src={isActive('/feedback') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>
          
          
          
        </div>

      <div className="p-6 rounded-2xl border flex flex-col gap-2">
          <h2 className="font-semibold">Payment info</h2>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/rewards-wallet') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/rewards-wallet')}
          >
            <h3 className="mr-auto">Rewards & Wallet</h3>
            <img 
              src={isActive('/rewards-wallet') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/payment-methods') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/payment-methods')}
          >
            <h3 className="mr-auto">Payment methods</h3>
            <img 
              src={isActive('/payment-methods') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>

         
        </div>

      <div className="p-6 rounded-2xl border flex flex-col gap-2">
          <h2 className="font-semibold">Travel activity</h2>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/trips-bookings') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/trips-bookings')}
          >
            <h3 className="mr-auto">Trips and bookings</h3>
            <img 
              src={isActive('/trips-bookings') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/saved-lists') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/saved-lists')}
          >
            <h3 className="mr-auto">Saved lists</h3>
            <img 
              src={isActive('/saved-lists') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>

          <div 
            className={`flex p-4 w-full rounded cursor-pointer ${
              isActive('/my-reviews') 
                ? 'bg-light text-green' 
                : 'text-darkGray hover:bg-light'
            }`}
            onClick={() => handleNavigation('/my-reviews')}
          >
            <h3 className="mr-auto">My reviews</h3>
            <img 
              src={isActive('/my-reviews') ? "/assets/account/greenArrow.svg" : "/assets/account/blueArrow.svg"} 
              alt="" 
            />
          </div>
        </div>


      </div>
    </>
  );
};

export default UserSidebar;
