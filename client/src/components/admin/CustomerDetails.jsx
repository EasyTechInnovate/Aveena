import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const CustomerDetails = ({ customer, onClose }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  // Safe data extraction
  const firstName = customer?.firstName || "";
  const lastName = customer?.lastName || "";
  const email = customer?.email || "";
  
  const phoneNumber = customer?.phone
    ? `${customer.phone.countryCode} ${customer.phone.number}`
    : "";

  const address = customer?.address
    ? [customer.address.fullAddress, customer.address.city, customer.address.state, customer.address.zipCode]
        .filter(Boolean)
        .join(", ")
    : "";

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  const fullName = `${firstName} ${lastName}`.trim();

  const personalInfoFields = [
    { label: "First Name", value: firstName, colSpan: 1 },
    { label: "Last Name", value: lastName, colSpan: 1 },
    { label: "Phone Number", value: phoneNumber, colSpan: 1 },
    { label: "Email Address", value: email, colSpan: 1 },
    { label: "Address", value: address, colSpan: 2 },
  ];

  useEffect(() => {
    if (!customer?.email) return;
    const fetchBookings = async () => {
      setBookingsLoading(true);
      try {
        // Search admin bookings by customer name/email to get their bookings
        const params = new URLSearchParams({ page: 1, limit: 20, search: customer.email });
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/bookings?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const json = await response.json();
        if (json.success && json.data?.bookings) {
          setBookings(json.data.bookings);
        }
      } catch (err) {
        console.error("CustomerDetails: failed to fetch bookings", err);
      } finally {
        setBookingsLoading(false);
      }
    };
    fetchBookings();
  }, [customer?.email]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      
      {/* Header Section */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-white text-xl font-semibold">{initials}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 leading-tight">
              {fullName}
            </h1>
            <p className="text-gray-600 text-sm mt-1">{email}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Back
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Personal Information Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {personalInfoFields.map((field, index) => (
              <div key={index} className={field.colSpan === 2 ? "col-span-2" : ""}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 cursor-not-allowed"
                />
              </div>
            ))}
          </div>
        </div>

        {/* All Bookings Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">All Bookings</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Booking Id</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Place Name</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Check in Date</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Check out Date</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Guests</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Status</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookingsLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-400">
                      Loading bookings...
                    </TableCell>
                  </TableRow>
                ) : bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                      No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => {
                    const placeName = booking.propertyId?.name ?? "—";
                    const checkIn = booking.checkIn
                      ? new Date(booking.checkIn).toLocaleDateString("en-IN", { dateStyle: "medium" })
                      : "—";
                    const checkOut = booking.checkOut
                      ? new Date(booking.checkOut).toLocaleDateString("en-IN", { dateStyle: "medium" })
                      : "—";
                    const guests =
                      typeof booking.guests === "object" && booking.guests
                        ? `${booking.guests.adults ?? 0} Adults, ${booking.guests.childrens ?? booking.guests.children ?? 0} Children`
                        : booking.guests ?? "—";
                    const total = booking.priceBreakdown?.total
                      ? `₹${booking.priceBreakdown.total.toLocaleString("en-IN")}`
                      : "—";
                    return (
                      <TableRow key={booking._id} className="border-b border-gray-100">
                        <TableCell className="py-3 px-4 text-sm font-mono text-gray-600">
                          #{booking._id?.slice(-6).toUpperCase()}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-sm text-gray-700">{placeName}</TableCell>
                        <TableCell className="py-3 px-4 text-sm text-gray-700">{checkIn}</TableCell>
                        <TableCell className="py-3 px-4 text-sm text-gray-700">{checkOut}</TableCell>
                        <TableCell className="py-3 px-4 text-sm text-gray-700">{guests}</TableCell>
                        <TableCell className="py-3 px-4">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status ?? "—"}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 px-4 text-sm font-medium text-gray-800">{total}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDetails;