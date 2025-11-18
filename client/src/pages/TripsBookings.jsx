import React, { useState, useEffect, useRef } from "react";
import UserSidebar from "../components/account/UserSidebar";

const BookingCard = ({ actionLabel = 'Pay Now', actionVariant = 'primary' }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelNote, setCancelNote] = useState('');
  const menuRef = useRef(null);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleMenuAction = (action) => {
    if (action === 'cancel') {
      setShowCancelModal(true);
    } else {
      console.log(`Selected action: ${action}`);
    }
    setShowMenu(false);
  };

  const handleCancelConfirm = () => {
    console.log('Booking cancelled:', { reason: cancelReason, note: cancelNote });
    setShowCancelModal(false);
    setCancelReason('');
    setCancelNote('');
  };

  const handleCancelClose = () => {
    setShowCancelModal(false);
    setCancelReason('');
    setCancelNote('');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="rounded-2xl border flex gap-4 overflow-hidden">
      <div className="relative">
        <img src="/assets/booking/room.png" alt="room" className="w-[300px] h-full object-cover" />
        <button className="absolute top-2 right-2 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow">
          <img src="/assets/account/likered.svg" alt="like" className="w-full h-full" />
        </button>
      </div>
      <div className="flex-1 p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">UDS Villa - Next to VFS, Walking to Connaught Place</h3>
            <div className="text-sm text-darkGray">New Delhi</div>
          </div>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={handleMenuClick}
              className="text-darkGray px-2"
            >
              <img src="/assets/account/3dot.svg" alt="" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white border rounded-xl z-10 min-w-60 shadow-lg">
                <div className="py-2">
                  <button 
                    onClick={() => handleMenuAction('cancel')}
                    className="w-full text-left px-4 py-2 border-b font-semibold border-gray-200 outline-none text-darkBlue text-sm"
                  >
                    Cancel Booking
                  </button>
                  <button 
                    onClick={() => handleMenuAction('contact')}
                    className="w-full text-left px-4 py-2 border-b font-semibold border-gray-200 outline-none text-darkBlue text-sm"
                  >
                    Contact Customer Service
                  </button>
                  <button 
                    onClick={() => handleMenuAction('update')}
                    className="w-full text-left px-4 py-2 border-b font-semibold border-gray-200 outline-none text-darkBlue text-sm"
                  >
                    Update Dates
                  </button>
                  <button 
                    onClick={() => handleMenuAction('view')}
                    className="w-full text-left px-4 py-2 font-semibold  outline-none text-darkBlue text-sm"
                  >
                    View Booking Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      <div className="mt-2 flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500"><img src="/assets/booking/star.svg" className="w-4 h-4" /></span>
          <span className="font-semibold">4.6</span>
          <span className="text-darkGray">/5</span>
        </div>
        <a className="text-blue underline" href="#">63 Reviews</a>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-5 text-[13px] text-darkGray">
        <div className="flex items-center gap-2"><img src="/assets/booking/meal.svg" className="w-4 h-4" /><span>Breakfast included</span></div>
        <div className="flex items-center gap-2"><img src="/assets/booking/pool.svg" className="w-4 h-4" /><span>Private Pool</span></div>
        <div className="flex items-center gap-2"><img src="/assets/booking/lawn.svg" className="w-4 h-4" /><span>Lawn</span></div>
        <div className="flex items-center gap-2"><img src="/assets/booking/wifi.svg" className="w-4 h-4" /><span>WiFi</span></div>
        <div className="flex items-center gap-2"><img src="/assets/booking/bar.svg" className="w-4 h-4" /><span>Bar</span></div>
        <div className="flex items-center gap-2"><img src="/assets/booking/dining.svg" className="w-4 h-4" /><span>Alfresco Dining</span></div>
        <a className="text-blue underline" href="#">+21 Amenities</a>
      </div>

 <div className="mt-3 flex items-center justify-between">
 <div className="flex flex-col gap-2">
        <div className="bg-green text-white px-3 py-2 rounded-md text-sm">We have 5 left at 21% off at</div>
        <div className="text-green text-sm">Fully refundable</div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-end gap-3">
            <div className="text-2xl md:text-3xl font-bold">₹6,688</div>
            <div className="text-darkGray line-through">₹7200</div>
          </div>
          <div className="text-darkGray text-sm">₹12,471 Total includes taxes & fees</div>
        </div>
        {actionVariant === 'primary' ? (
          <button className="text-green border border-green min-w-40 px-5 py-2 rounded-md">{actionLabel}</button>
        ) : (
          <button className="border border-red-400 text-red-500 min-w-40 px-5 py-2 rounded-md">{actionLabel}</button>
        )}
      </div>
 </div>
    </div>

    {/* Cancel Confirmation Modal */}
    {showCancelModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex">
            {/* Left Section - Cancellation Details */}
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-bold mb-4">Are You Sure You want to cancel Booking</h2>
              <p className="text-darkGray text-sm mb-4">Please review the Details below before confirmation of cancellation</p>
              <p className="text-darkGray text-sm mb-6">
                This property offers transfers from the airport. Guests must contact the property with arrival details before travel, using the contact information on the booking confirmation. To make arrangements for check-in please contact the property at least 24 hours before arrival using the information on the booking confirmation.
              </p>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Reason Foe Cancellation</h3>
                    <label className="block text-xs text-darkGray mb-2">Select Reason</label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none"
                >
                  <option value="">Select Reason</option>
                  <option value="change-plans">Change of plans</option>
                  <option value="found-better">Found better option</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <textarea
                  value={cancelNote}
                  onChange={(e) => setCancelNote(e.target.value)}
                  placeholder="Write here......."
                  className="w-full border rounded-xl px-4 py-3 h-32 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCancelClose}
                  className="border border-gray-300 text-darkGray px-4 py-3 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCancelConfirm}
                  className="border border-red-500 text-red-500 px-4 py-3 rounded-md"
                >
                  Confirm Cancel
                </button>
              </div>
            </div>

            {/* Right Section - Booking Summary */}
            <div className="w-[360px] p-6">
              <div className="rounded-xl p-4 border">
                <div className="flex gap-3 mb-4">
                  <img src="/assets/booking/room.png" className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-semibold text-sm">UDS Villa - Next to VFS, Walking to Connaught Place</h3>
                    <div className="text-xs text-darkGray">New Delhi</div>
                  </div>
                </div>

                <div className="mb-4 border-b pb-4">
                  <div className="text-xs font-normal mb-2">Booking Period</div>
                  <div className="flex items-center gap-2 text-sm">
                    <img src="/assets/date.svg" className="w-4 h-4" />
                    <div>
                      <div className="font-semibold">Wed 3 Sep 2025 - Tue 9 Sep 2025</div>
                      <div className="text-xs text-darkGray">(From 02:00 PM TO 9:00 PM)</div>
                    </div>
                  </div>
                </div>

                <div className="mb-0">
                  <div className="text-xs font-semibold mb-2">Price Details</div>
                  <div className="text-sm">
                    <div className="flex justify-between py-3">
                      <span>Base Price</span>
                      <span>₹16,800</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span>Total Discount</span>
                      <span>₹-16,800</span>
                    </div>
                    <div className="flex justify-between py-3  border-t border-gray-200">
                      <span>Price After Discount</span>
                      <span>₹-16,800</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span>GST <span className="text-xs text-darkGray">(As per government guidelines)</span></span>
                      <span>₹3,024</span>
                    </div>
                  </div>
                </div>

                <div className="-m-4 mt-0 rounded-b-xl bg-[#0075E314] p-3">
                  <div className="px-4 flex justify-between items-center">
                    <span className="font-semibold">Refund Amount</span>
                    <span className="font-bold text-lg">₹19,824</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

const TripsBookings = () => {
  return (
    <div className="flex gap-4 max-w-7xl mx-auto mt-6 pt-20">
      <UserSidebar />
      <div className="flex-1">
        <div className="border rounded-2xl p-4">
          <h1 className="text-2xl font-bold">Trips and bookings</h1>
          <p className="text-darkGray">Save money on your next adventure with Us</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center flex-1 border rounded-xl px-3 py-3 text-darkGray">
              <img src="/assets/account/search-normal.svg" className="w-5 h-5 mr-2" />
              <input className="w-full outline-none" placeholder="Search My Booking" />
            </div>
            <button className="border rounded-xl px-4 py-3">Apply Filter</button>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold mb-3">My Upcoming Booking</h2>
          <div className="space-y-4">
            <BookingCard actionLabel="Pay Now" actionVariant="primary" />
            <BookingCard actionLabel="Cancel Booking" actionVariant="danger" />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-3">My Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border overflow-hidden">
              <div className="relative">
                <img src="/assets/booking/room.png" className="w-full h-40 object-cover" />
                <div className="absolute top-3 left-3 bg-green text-white text-xs px-2 py-1 rounded-md">Booking Pending</div>
                <button className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                  <img src="/assets/account/3dot.svg" alt="" className="w-full h-full" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm">UDS Villa - Next to VFS, Walking to Connaught Place</h3>
                <div className="text-xs text-darkGray mt-1">New Delhi</div>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="text-xs text-darkGray">Hosted By</div>
                  <div className="text-xs text-darkGray">Property Owner Name</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border overflow-hidden">
              <div className="relative">
                <img src="/assets/booking/room.png" className="w-full h-40 object-cover" />
                <div className="absolute top-3 left-3 bg-green text-white text-xs px-2 py-1 rounded-md">Booking Pending</div>
                <button className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                  <img src="/assets/account/3dot.svg" alt="" className="w-full h-full" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm">UDS Villa - Next to VFS, Walking to Connaught Place</h3>
                <div className="text-xs text-darkGray mt-1">New Delhi</div>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="text-xs text-darkGray">Hosted By</div>
                  <div className="text-xs text-darkGray">Property Owner Name</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border overflow-hidden">
              <div className="relative">
                <img src="/assets/booking/room.png" className="w-full h-40 object-cover" />
                <div className="absolute top-3 left-3 bg-green text-white text-xs px-2 py-1 rounded-md">Booking Pending</div>
                <button className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                  <img src="/assets/account/3dot.svg" alt="" className="w-full h-full" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm">UDS Villa - Next to VFS, Walking to Connaught Place</h3>
                <div className="text-xs text-darkGray mt-1">New Delhi</div>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="text-xs text-darkGray">Hosted By</div>
                  <div className="text-xs text-darkGray">Property Owner Name</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripsBookings;

