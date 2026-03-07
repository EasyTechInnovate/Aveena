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
  Trash2,
  ChevronLeft,
  ChevronRight,
  Edit,
  Check,
} from "lucide-react";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

const getStatusColor = (status) => {
  switch (status) {
    case "On Hold":
      return "bg-yellow-200 text-yellow-900";
    case "In Progress":
      return "bg-orange-200 text-orange-900";
    case "Resolved":
      return "bg-green-200 text-green-900";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [allTickets, setAllTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 15;

  // GET /help-center?page=:page&limit=:limit&status=open
  const fetchHelpTickets = async (page = 1, search = "") => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: itemsPerPage, ...(search && { search }) });
    const url = `${import.meta.env.VITE_API_URL}/help-center?${params.toString()}`;
    console.log("[GET] Fetch Help Center Tickets:", url);
    try {
      const response = await fetch(url, { headers: authHeaders() });
      const json = await response.json();
      console.log("[GET] Fetch Help Center Tickets Response:", json);
      if (json.success && json.data) {
        setAllTickets(json.data.tickets || json.data || []);
        setTotalPages(json.data.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error("[GET] Fetch Help Center Tickets Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpTickets(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && typeof page === "number") {
      setCurrentPage(page);
    }
  };

  // PATCH /help-center/:ticketId/status
  const handleStatusChange = async (ticketId, newStatus) => {
    const url = `${import.meta.env.VITE_API_URL}/help-center/${ticketId}/status`;
    console.log("[PATCH] Update Ticket Status:", url, { status: newStatus });
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await response.json();
      console.log("[PATCH] Update Ticket Status Response:", json);
      fetchHelpTickets(currentPage, searchTerm);
    } catch (err) {
      console.error("[PATCH] Update Ticket Status Error:", err);
    }
  };

  const handleMarkAsResolved = (ticketId) => handleStatusChange(ticketId, "resolved");
  const handleMarkAsApproved = (ticketId) => handleStatusChange(ticketId, "closed");

  const handleEdit = (ticketId) => {
    navigate(`/dashboard/admin/help/ticket/${(ticketId || "").replace("#", "")}`);
  };

  // Get menu items based on ticket status
  const getMenuItems = (ticket) => {
    const id = ticket._id || ticket.id;
    const status = (ticket.status || "").toLowerCase();
    const items = [];

    if (status !== "resolved" && status !== "closed") {
      items.push({
        label: "Mark as Resolved",
        icon: Check,
        onClick: () => handleMarkAsResolved(id),
        className: "cursor-pointer py-2 text-sm text-gray-700",
      });
    } else {
      items.push({
        label: "Mark as Closed",
        icon: Check,
        onClick: () => handleMarkAsApproved(id),
        className: "cursor-pointer py-2 text-sm text-gray-700",
      });
    }

    items.push({
      label: "View / Edit",
      icon: Edit,
      onClick: () => handleEdit(id),
      className: "cursor-pointer py-2 text-sm text-gray-700",
    });

    return items;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>

          <div className="flex gap-3 items-center">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Ticket"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green w-64"
              />
            </div>

            {/* Filters Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Filters
              <ChevronDown size={18} />
            </button>

            {/* Three Dots Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem className="cursor-pointer py-2 text-sm text-gray-700">
                  Options
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Ticket Id
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Customer Name
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Subject
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Created Date
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Last Update
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-10">Loading...</TableCell>
                </TableRow>
              ) : allTickets.length > 0 ? (
                allTickets.map((ticket, index) => {
                  const ticketId = ticket.ticketId || ticket._id || ticket.id || `#${index + 1}`;
                  const displayId = ticketId.startsWith("#") ? ticketId : `#${ticketId}`;
                  const customerName = ticket.user?.name || ticket.user?.firstName || ticket.customerName || ticket.customer || "—";
                  const subject = ticket.subject || ticket.title || "—";
                  const status = ticket.status || "open";
                  const createdAt = ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
                  const updatedAt = ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
                  return (
                    <TableRow
                      key={ticket._id || index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/dashboard/admin/help/ticket/${ticket._id || ticketId}`)}
                    >
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap">{displayId}</TableCell>
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap">{customerName}</TableCell>
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap">{subject}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, " ")}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap">{createdAt}</TableCell>
                      <TableCell className="text-sm text-gray-700 whitespace-nowrap">{updatedAt}</TableCell>
                      <TableCell className="whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                              <MoreVertical size={18} className="text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {getMenuItems(ticket).map((item, idx) => {
                              const IconComponent = item.icon;
                              return (
                                <DropdownMenuItem
                                  key={idx}
                                  variant={item.variant}
                                  onClick={(e) => { e.stopPropagation(); item.onClick(); }}
                                  className={item.className}
                                >
                                  <IconComponent className="mr-2 h-4 w-4" />
                                  {item.label}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">No tickets found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>

            {pages.map((page, index) =>
              page === "..." ? (
                <span key={index} className="text-gray-500 px-2">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
                    currentPage === page
                      ? "bg-green text-white border-green"
                      : "border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
