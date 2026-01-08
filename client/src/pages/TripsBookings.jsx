import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboardLayout from "../components/account/UserDashboardLayout";
import { getMyBookings, cancelBooking } from "../services";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const BookingCard = ({ booking, actionLabel = 'Pay Now', actionVariant = 'primary', onCancel }) => {
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
    if (!cancelReason) {
      alert('Please select a cancellation reason');
      return;
    }
    if (onCancel && booking?._id) {
      onCancel(booking._id, cancelReason, cancelNote);
    }
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
        <img 
          src={
            booking?.property?.images?.[0] ||
            booking?.property?.image ||
            booking?.property?.coverImage ||
            "/assets/booking/room.png"
          } 
          alt="room" 
          className="w-[300px] aspect-square h-full object-cover" 
        />
        {/* <button className="absolute top-2 right-2 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow">
          <img src="/assets/account/likered.svg" alt="like" className="w-full h-full" />
        </button> */}
      </div>
      <div className="flex-1 p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">
              {booking?.property?.name || 'UDS Villa - Next to VFS, Walking to Connaught Place'}
            </h3>
            <div className="text-sm text-darkGray">
              {booking?.property?.address?.fullAddress ||
                booking?.property?.address ||
                'New Delhi'}
            </div>
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
        {/* <div className="flex items-center gap-1">
          <span className="text-yellow-500">
            <img src="/assets/booking/star.svg" className="w-4 h-4" />
          </span>
          <span className="font-semibold">
            {booking?.property?.rating
              ? booking.property.rating.toFixed(1)
              : '4.6'}
          </span>
          <span className="text-darkGray">/5</span>
        </div> */}
        {/* <a className="text-blue underline" href="#">
          {(booking?.property?.reviews && booking.property.reviews.length) || 63} Reviews
        </a> */}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-5 text-[13px] text-darkGray">
        {booking?.property?.amenities?.slice(0, 6).map((amenity, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <img src="/assets/booking/meal.svg" className="w-4 h-4" />
            <span>{typeof amenity === 'string' ? amenity : 'Amenity'}</span>
          </div>
        ))}
        {booking?.property?.amenities?.length > 6 && (
          <a className="text-blue underline" href="#">
            +{booking.property.amenities.length - 6} Amenities
          </a>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
      <div className="flex flex-col gap-2">
        {booking?.status === 'pending' && (
          <div className="bg-green text-white px-3 py-2 rounded-md text-sm">Payment Pending</div>
        )}
        <div className="text-green text-sm">
          {booking?.checkInDate &&
            booking?.checkOutDate &&
            `${new Date(booking.checkInDate).toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })} - ${new Date(booking.checkOutDate).toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })}`}
        </div>
        
 <div className="text-darkGray text-sm">Booking ID: {booking?.bookingId || booking?._id?.slice(-8)}</div>
      </div>

      <div className="flex flex-col items-end gap-2 justify-between">
        <div>
          <div className="flex items-end gap-3">
            <div className="text-2xl md:text-3xl font-bold">
              ₹{(booking?.totalAmount || 0).toLocaleString('en-IN')}
            </div>
          </div>
   
        </div>
        {actionVariant === 'primary' ? (
          <button 
            onClick={() => booking?.status === 'pending' && navigate(`/checkout`, { state: { bookingId: booking._id } })}
            className="text-green border border-green min-w-40 px-5 py-2 rounded-md"
          >
            {actionLabel}
          </button>
        ) : (
          <button 
            onClick={() => setShowCancelModal(true)}
            className="border border-red-400 text-red-500 min-w-40 px-5 py-2 rounded-md"
          >
            {actionLabel}
          </button>
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
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuth) {
      alert("Do Sign in")
      navigate('/');
      return;
    }
    fetchBookings();
  }, [isAuth, navigate]);

  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMyBookings({ page: 1, limit: 100 });
      if (response.data?.success) {
        const rawBookings = response.data.data.bookings || [];

        // Normalize API response to UI-friendly shape
        const allBookings = rawBookings.map((booking) => {
          const property = booking.property || booking.propertyId || {};
          const checkInDate = booking.checkInDate || booking.checkIn;
          const checkOutDate = booking.checkOutDate || booking.checkOut;
          const totalAmount =
            booking.totalAmount || booking.priceBreakdown?.total || 0;

          return {
            ...booking,
            property,
            checkInDate,
            checkOutDate,
            totalAmount,
            bookingId: booking.bookingId || booking._id,
          };
        });

        setBookings(allBookings);

        const now = new Date();
        const upcoming = allBookings.filter((booking) => {
          const checkIn = booking.checkInDate
            ? new Date(booking.checkInDate)
            : null;
          return checkIn && checkIn >= now;
        });
        const past = allBookings.filter((booking) => {
          const checkIn = booking.checkInDate
            ? new Date(booking.checkInDate)
            : null;
          return checkIn && checkIn < now;
        });

        setUpcomingBookings(upcoming);
        setPastBookings(past);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.response?.data?.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, reason, note) => {
    try {
      await cancelBooking(bookingId);
      fetchBookings();
    } catch (err) {
      console.error("Error canceling booking:", err);
      alert(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const filteredUpcoming = upcomingBookings.filter(booking => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = booking.property?.name || '';
    const address =
      booking.property?.address?.fullAddress ||
      (typeof booking.property?.address === 'string'
        ? booking.property.address
        : '');
    const id = booking.bookingId || '';
    return (
      name.toLowerCase().includes(query) ||
      address.toLowerCase().includes(query) ||
      id.toLowerCase().includes(query)
    );
  });

  const filteredPast = pastBookings.filter(booking => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = booking.property?.name || '';
    const address =
      booking.property?.address?.fullAddress ||
      (typeof booking.property?.address === 'string'
        ? booking.property.address
        : '');
    const id = booking.bookingId || '';
    return (
      name.toLowerCase().includes(query) ||
      address.toLowerCase().includes(query) ||
      id.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <UserDashboardLayout>
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout>
      <div className="flex-1">
        <div className="border rounded-2xl p-4">
          <h1 className="text-2xl font-bold">Trips and bookings</h1>
          <p className="text-darkGray">Save money on your next adventure with Us</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center flex-1 border rounded-xl px-3 py-3 text-darkGray">
              <img src="/assets/account/search-normal.svg" className="w-5 h-5 mr-2" />
              <input 
                className="w-full outline-none" 
                placeholder="Search My Booking"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="border rounded-xl px-4 py-3">Apply Filter</button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="mt-4">
          <h2 className="font-semibold mb-3">My Upcoming Booking</h2>
          {filteredUpcoming.length === 0 ? (
            <p className="text-gray-500">No upcoming bookings</p>
          ) : (
            <div className="space-y-4">
              {filteredUpcoming.map((booking) => (
                <BookingCard 
                  key={booking._id} 
                  booking={booking}
                  actionLabel={booking.status === 'pending' ? "Pay Now" : "View Details"}
                  actionVariant="primary"
                  onCancel={handleCancelBooking}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-3">My Bookings</h2>
          {filteredPast.length === 0 ? (
            <p className="text-gray-500">No past bookings</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPast.map((booking) => (
                <div key={booking._id} className="rounded-2xl border overflow-hidden">
                  <div className="relative">
                    <img 
                      src={booking.property?.images?.[0] || booking.property?.image || "/assets/booking/room.png"} 
                      className="w-full h-40 object-cover" 
                      alt={booking.property?.name}
                    />
                    <div className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded-md ${
                      booking.status === 'confirmed' ? 'bg-green' : 
                      booking.status === 'cancelled' ? 'bg-red-500' : 
                      'bg-yellow-500'
                    }`}>
                      {booking.status || 'Booking Pending'}
                    </div>
                    <button className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                      <img src="/assets/account/3dot.svg" alt="" className="w-full h-full" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">
                      {booking.property?.name || 'Property Name'}
                    </h3>
                    <div className="text-xs text-darkGray mt-1">
                      {booking.property?.address?.fullAddress ||
                        booking.property?.address ||
                        'Location'}
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <div className="text-xs text-darkGray">
                        {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default TripsBookings;

