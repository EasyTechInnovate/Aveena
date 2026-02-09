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
  columnHelper.accessor("_id", {
    header: "ID",
    cell: (info) => <span className="font-medium">#{info.getValue().slice(-6)}</span>,
  }),

  columnHelper.accessor("customer", {
    header: "Customer Name",
    cell: (info) => {
      const { firstName, lastName } = info.getValue() || {};
      return <span className="font-medium">{firstName} {lastName}</span>;
    },
  }),

  columnHelper.accessor("checkIn", {
    header: "Check-in Date",
    cell: (info) => {
      const date = new Date(info.getValue());
      return <span>{date.toLocaleDateString("en-GB", { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>;
    },
  }),

  columnHelper.accessor("checkOut", {
    header: "Check-out Date",
    cell: (info) => {
      const date = new Date(info.getValue());
      return <span>{date.toLocaleDateString("en-GB", { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>;
    },
  }),

  columnHelper.accessor("noOfRooms", {
    header: "No. of Rooms",
    cell: (info) => <span>{info.getValue() || 0} Rooms</span>,
  }),

  columnHelper.accessor("guests", {
    header: "Guests",
    cell: (info) => {
      const { adults, childrens } = info.getValue() || { adults: 0, childrens: 0 };
      return <span>{adults} Adults, {childrens} Children</span>;
    },
  }),

  columnHelper.accessor("status", {
    header: "Payment Status",
    cell: (info) => {
      const status = info.getValue();
      let variant = "outline";
      let className = "";

      if (status === "confirmed") {
        variant = "success";
        className = "bg-green-500 text-white hover:bg-green-600 border-transparent";
      } else if (status === "pending") {
        variant = "warning";
        className = "bg-yellow-500 text-white hover:bg-yellow-600 border-transparent";
      }

      return (
        <Badge variant={variant} className={className}>
          {status === "confirmed" ? "Advance Paid" : status}
        </Badge>
      );
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 py-2">
            <DropdownMenuItem
              onClick={() => {
                console.log("Cancel booking:", rowData);
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