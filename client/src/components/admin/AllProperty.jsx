import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Search,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Check,
} from "lucide-react";

const AllProperty = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  // Fetch properties with backend pagination + search
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const params = new URLSearchParams({
          page: pagination.page,
          limit: 10,
          ...(searchTerm && { search: searchTerm }),
        });

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/properties?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const jsonResponse = await response.json();

        if (jsonResponse.success && jsonResponse.data) {
          setProperties(jsonResponse.data.properties);
          setPagination(jsonResponse.data.pagination);
        }

        console.log("Admin Properties Data:", jsonResponse);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [searchTerm, pagination.page]);

  // 👇 ADDED: Function to handle the Toggle Switch API
  const handleToggleActive = async (propertyId) => {
    // 1. Optimistic Update: Flip the switch instantly on the UI for a snappy feel
    setProperties((prev) =>
      prev.map((p) =>
        p._id === propertyId ? { ...p, isActive: !p.isActive } : p
      )
    );

    try {
      // 2. Fire the API
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/properties/toggle-active`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ propertyId: propertyId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // 3. If it fails, revert the switch back to its original state
        setProperties((prev) =>
          prev.map((p) =>
            p._id === propertyId ? { ...p, isActive: !p.isActive } : p
          )
        );
        alert(data.message || "Failed to toggle property status.");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      // Revert on network error
      setProperties((prev) =>
        prev.map((p) =>
          p._id === propertyId ? { ...p, isActive: !p.isActive } : p
        )
      );
      alert("A network error occurred while toggling the status.");
    }
  };

  const handleMarkAsVerified = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setShowApprovalModal(true);
  };

  const handleApprovalConfirm = () => {
    setShowApprovalModal(false);
    setSelectedPropertyId(null);
  };

  const handleApprovalCancel = () => {
    setShowApprovalModal(false);
    setSelectedPropertyId(null);
  };

  const handleEdit = (propertyId) => {
    navigate(`/dashboard/admin/property/edit/${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      console.log("Delete property:", propertyId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Property</h1>

          <div className="flex gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Property"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm">
              Filters
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property Name</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead>Min. Rental Income</TableHead>
                <TableHead>Sales Target</TableHead>
                <TableHead>Total Bookings</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">KYC Status</TableHead>
                {/* 👇 ADDED: New Column Header for the Toggle Switch */}
                <TableHead className="text-center">Live</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {properties.length > 0 ? (
                properties.map((property) => (
                  <TableRow
                    key={property._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <TableCell>{property.name || "N/A"}</TableCell>
                    <TableCell>{property.type || "N/A"}</TableCell>
                    <TableCell>₹ {property.minimumRentalIncome || "N/A"}</TableCell>
                    <TableCell>₹ {property.saleTarget || "N/A"}</TableCell>
                    <TableCell>{property.totalBookings ?? "N/A"}</TableCell>

                    {/* Status */}
                    <TableCell className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          property.isActive
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {property.isActive ? "Approved" : "Pending"}
                      </span>
                    </TableCell>

                    {/* KYC */}
                    <TableCell className="text-center">
                      <span className="px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-800">
                        {property.kycStatus || "N/A"}
                      </span>
                    </TableCell>

                    {/* 👇 ADDED: The Toggle Switch Cell 👇 */}
                    <TableCell className="text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(property._id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                          property.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span className="sr-only">Toggle active status</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            property.isActive ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <MoreVertical size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleMarkAsVerified(property._id)}
                          >
                            Mark as Verified
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(property._id)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(property._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No properties found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t">
          <button
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            disabled={pagination.page === 1}
            className="w-10 h-10 flex justify-center items-center border rounded-full disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            disabled={pagination.page === pagination.totalPages}
            className="w-10 h-10 flex justify-center items-center border rounded-full disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green flex items-center justify-center">
                <Check size={40} className="text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-center mb-4">
              Property Approved!
            </h2>

            <p className="text-center text-gray-600 mb-8 text-sm">
              Property has been approved. Please proceed with KYC verification.
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleApprovalCancel}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleApprovalConfirm}
                className="flex-1 bg-green text-white py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProperty;