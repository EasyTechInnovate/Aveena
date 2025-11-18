import React from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { Badge } from "../../ui/badge"
import { MoreVertical, Eye, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"

const columnHelper = createColumnHelper()

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),

  columnHelper.accessor("customername", {
    header: "Customer Name",
  }),

  columnHelper.accessor("Checkindate", {
    header: "Check- in Date",
  }),

  columnHelper.accessor("Checkoutdate", {
    header: "Check- Out Date",
  }),

  columnHelper.accessor("rooms", {
    header: "No. of Rooms",
  }),

  columnHelper.accessor("guests", {
    header: "Guests",
  }),

  columnHelper.accessor("paymentStatus", {
    header: "Payment Status",
  }),
  columnHelper.accessor("action", {
    header: "",
    cell: ({ row }) => {
      const rowData = row.original

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
                console.log("Cancel booking:", rowData)
                // wire to cancel flow
              }}
              className="cursor-pointer py-3 text-[15px]"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Booking
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                console.log("View details:", rowData)
                // open details drawer/modal
              }}
              className="cursor-pointer py-3 text-[15px]"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  })
]
