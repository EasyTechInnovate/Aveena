import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Bed, Users } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import Sidebar from "../../components/partnerDashboard/Sidebar";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/property-owner/bookings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const jsonResponse = await response.json();
        console.log("Property Owner Booking Data:", jsonResponse);

        if (jsonResponse.success) {
          setBooking(jsonResponse.data.booking);
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    if (id) fetchBooking();
  }, [id]);

  if (!booking) {
    return <div className="p-10 text-center text-gray-500">Loading booking details...</div>;
  }

  const customerName = `${booking.userId?.firstName || ""} ${booking.userId?.lastName || ""}`;
  const contact = booking.userId?.phone?.number || "N/A";

  const propertyName = booking.propertyId?.name || "N/A";
  const location = booking.propertyId?.address?.fullAddress || "N/A";

  const checkIn = new Date(booking.checkIn).toLocaleDateString("en-IN", { dateStyle: "medium" });
  const checkOut = new Date(booking.checkOut).toLocaleDateString("en-IN", { dateStyle: "medium" });

  const rooms = booking.noOfRooms || 1;
  const guests = `${booking.guests?.adults || 0} Adults, ${booking.guests?.children || 0} Children`;

  const rentalCharges = booking.priceBreakdown?.base || 0;
  const gst = booking.priceBreakdown?.taxes || 0;
  const promoDiscount = booking.priceBreakdown?.discount || 0;
  const totalPayment = booking.priceBreakdown?.total || 0;
  const advancedPaid = -1;
  const restOfPayment = -1;

  const paymentStatus = booking.status === "pending" ? "Pending" : "Confirmed";

  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-[80px] max-w-7xl w-full p-6 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-600">
            <a href="/dashboard/bookings" className="text-green hover:underline">
              My Bookings
            </a>{" "}
            <span className="text-gray-400">&gt;</span>{" "}
            <span className="text-gray-800 font-medium">#{booking._id}</span>
          </div>
          <button
            onClick={() => navigate("/dashboard/bookings")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Cancel Booking
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-8">Booking Details</h1>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green flex items-center justify-center text-white font-semibold text-xl">
                  {getInitials(customerName)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{customerName}</h3>
                  <p className="text-gray-600 text-sm">{contact}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{propertyName}</h3>
                <p className="text-gray-600">{location}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-gray-600 text-sm">Check-in</p>
                    <p className="font-medium text-gray-800">{checkIn}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-8">
                  <Badge className="bg-green text-white rounded-full px-3 py-1 text-xs">
                    For {booking.nights} Night{booking.nights > 1 ? "s" : ""}
                  </Badge>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-gray-600 text-sm">Check-out</p>
                    <p className="font-medium text-gray-800">{checkOut}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Bed className="h-5 w-5 text-gray-600" />
                  <p>
                    <span className="font-semibold">No. of Rooms:</span> {rooms}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-600" />
                  <p>
                    <span className="font-semibold">Guests:</span> {guests}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Payment Activity</h3>
              <Badge className="bg-green text-white rounded-full px-3 py-1 text-xs font-medium">
                {paymentStatus}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between py-3 border-b">
                <span>Rental Charges</span>
                <span>₹{rentalCharges.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span>GST</span>
                <span>₹{gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span>Promo Discount</span>
                <span className="text-red-600">-₹{promoDiscount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span>Advanced Paid</span>
                <span>₹{advancedPaid.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span>Rest Of Payment</span>
                <span>₹{restOfPayment.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between pt-4 mt-2 border-t-2">
                <span className="font-semibold">Total Payment</span>
                <span className="font-semibold text-lg">
                  ₹{totalPayment.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="font-semibold text-gray-800 mb-4">Any special requests?</h3>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <p className="text-gray-700">N/A</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;