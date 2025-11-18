import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "../../ui/badge";
import { MoreVertical, Eye, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const columnHelper = createColumnHelper();

export const createColumns = (onViewDetails) => [
  columnHelper.accessor("customerName", {
    header: "Customer Name",
  }),

  columnHelper.accessor("checkIn", {
    header: "Check-in Date",
  }),

  columnHelper.accessor("checkOut", {
    header: "Check-out Date",
  }),

  columnHelper.accessor("rooms", {
    header: "No. of Rooms",
  }),

  columnHelper.accessor("guests", {
    header: "Guests",
  }),

  columnHelper.accessor("paymentStatus", {
    header: "Payment Status",
    cell: (info) => {
      const value = info.getValue();
      let variant = "outline";

      if (value === "Advance Paid") variant = "success";
      else if (value === "Pending") variant = "warning";
      else if (value === "Rejected") variant = "destructive";

      return <Badge variant={variant}>{value}</Badge>;
    },
  }),

  columnHelper.accessor("action", {
    header: "",
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
              aria-label="Open actions menu"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 py-2">
            <DropdownMenuItem
              onClick={() => {
                console.log("Cancel booking:", rowData);
                // Add your cancel booking action here
              }}
              className="cursor-pointer py-3 text-[15px]"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Booking
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (onViewDetails) {
                  onViewDetails(rowData);
                }
              }}
              className="cursor-pointer py-3 text-[15px]"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];

