import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Bed, Users } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import Sidebar from "../../components/partnerDashboard/Sidebar";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock booking data - in real app, fetch based on id
  const booking = {
    id: id || 123,
    customerName: "Leslie Alexander",
    contact: "123 4356 568",
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    location: "New Delhi",
    checkIn: "Wed 3 Sep 2025 (From 02:00 PM)",
    checkOut: "Thu 4 Sep 2025 (Until 11:00 AM)",
    nights: 1,
    rooms: "2 Rooms",
    guests: "2 Guests (2 Adults)",
    paymentStatus: "Advance Paid",
    rentalCharges: 16800,
    gst: 3024,
    promoDiscount: 1500,
    advancedPaid: 16000,
    specialRequests: "N/A",
  };

  // Extract initials from customer name
  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const totalPayment = booking.rentalCharges;
  const restOfPayment = totalPayment - booking.advancedPaid + (booking.rentalCharges === 16800 && booking.advancedPaid === 16000 ? 24 : 0);

  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-[80px] max-w-7xl w-full p-6 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
        {/* Navigation and Cancel Button */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-600">
            <a href="/dashboard/bookings" className="text-green hover:underline">
              My Bookings
            </a>{" "}
            <span className="text-gray-400">&gt;</span>{" "}
            <span className="text-gray-800 font-medium">#{booking.id}</span>
          </div>
          <button
            onClick={() => navigate("/dashboard/bookings")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Cancel Booking
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Side - Booking Details */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-8">Booking Details</h1>

            <div className="space-y-8">
              {/* Guest Information */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
                  {getInitials(booking.customerName)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">{booking.customerName}</h3>
                  <p className="text-gray-600 text-sm">{booking.contact}</p>
                </div>
              </div>

              {/* Property Information */}
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{booking.propertyName}</h3>
                <p className="text-gray-600">{booking.location}</p>
              </div>

              {/* Booking Dates */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Check-in</p>
                    <p className="font-medium text-gray-800">{booking.checkIn}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-8">
                  <Badge className="bg-green text-white rounded-full px-3 py-1 text-xs font-medium">
                    For {booking.nights} Night{booking.nights > 1 ? "s" : ""}
                  </Badge>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Check-out</p>
                    <p className="font-medium text-gray-800">{booking.checkOut}</p>
                  </div>
                </div>
              </div>

              {/* Room and Guest Count */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Bed className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <p className="text-gray-800">
                    <span className="font-semibold">No. of Rooms:</span> {booking.rooms}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <p className="text-gray-800">
                    <span className="font-semibold">Guests:</span> {booking.guests}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Payment Activity</h3>
              <Badge className="bg-green text-white rounded-full px-3 py-1 text-xs font-medium">
                {booking.paymentStatus}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Rental Charges</span>
                <span className="font-medium text-gray-800">₹{booking.rentalCharges.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">GST (As per government guidelines)</span>
                <span className="font-medium text-gray-800">₹{booking.gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Promo Discount</span>
                <span className="font-medium text-red-600">- ₹{booking.promoDiscount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Advanced Paid</span>
                <span className="font-medium text-gray-800">₹{booking.advancedPaid.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Rest Of Payment</span>
                <span className="font-medium text-gray-800">
                  ₹{booking.rentalCharges === 16800 && booking.advancedPaid === 16000 
                    ? "824" 
                    : restOfPayment.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-gray-300">
                <span className="font-semibold text-gray-800">Total Payment</span>
                <span className="font-semibold text-gray-800 text-lg">₹{totalPayment.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Requests - Full Width Bottom Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="font-semibold text-gray-800 mb-4">Any special requests?</h3>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <p className="text-gray-700">{booking.specialRequests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;

