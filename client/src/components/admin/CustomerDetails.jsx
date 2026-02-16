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
  // Safe data extraction
  const firstName = customer?.firstName || "";
  const lastName = customer?.lastName || "";
  const email = customer?.email || "tim.jennings@example.com";
  
  const phoneNumber = customer?.phone
    ? `${customer.phone.countryCode} ${customer.phone.number}`
    : "+91 123 436 5647";

  const address = customer?.address
    ? `${customer.address.fullAddress} ${customer.address.city}, ${customer.address.state}, ${customer.address.zipCode}`
    : "3517 W. Gray St. Utica, Pennsylvania 57867";

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  const fullName = `${firstName} ${lastName}`.trim() || "Leslie Alexander";

  // Configuration for Personal Info fields to keep JSX clean
  const personalInfoFields = [
    { label: "First Name", value: firstName, colSpan: 1 },
    { label: "Last Name", value: lastName, colSpan: 1 },
    { label: "Phone Number", value: phoneNumber, colSpan: 1 },
    { label: "Email Address", value: email, colSpan: 1 },
    { label: "Address", value: address, colSpan: 2 },
  ];

  const fetchBookings = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/property-owners/65d8f9a2b1c3d4e5f6789012`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )

    const jsonResponse = await response.json();
    console.log(jsonResponse)
  } 

  useEffect(() => {
    fetchBookings();
  },[])

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
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Payment Type</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4">Payment Category</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-left py-3 px-4 w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Table rows will go here when data is available */}
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    No bookings found
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDetails;