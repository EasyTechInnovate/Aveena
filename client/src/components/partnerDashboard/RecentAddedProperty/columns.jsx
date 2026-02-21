import React from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { Badge } from "../../ui/badge"
import { MoreVertical, Eye, Upload } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"

const columnHelper = createColumnHelper()

export const columns = [
  columnHelper.accessor("name", {
    header: "Property Name",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),

  columnHelper.accessor("type", {
    header: "Property Type",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),

  columnHelper.accessor("minRentalIncome", {
    header: "Min. Rental Income",
    cell: () => "N/A", 
  }),

  columnHelper.accessor("salesTarget", {
    header: "Sales Target",
    cell: () => "N/A",
  }),

  columnHelper.accessor("isActive", {
    header: "Status",
    cell: info => {
      const isActive = info.getValue()
      const value = isActive ? "Active" : "Inactive"
      
      // Define styles based on status
      let styles = "bg-gray-100 text-gray-800"
      if (value === "Active" || value === "Approved") {
        styles = "bg-green-100 text-green-700 hover:bg-green-100 border-transparent"
      } else if (value === "Pending") {
        styles = "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-transparent"
      } else if (value === "Rejected") {
        styles = "bg-red-100 text-red-700 hover:bg-red-100 border-transparent"
      }

      return (
        <Badge className={`capitalize ${styles}`} variant="outline">
          {value}
        </Badge>
      )
    },
  }),

  columnHelper.accessor("kycVerified", {
    header: "KYC Status",
    cell: (info) => {
      const status = info.getValue() || "N/A"
      
      let styles = "bg-gray-100 text-gray-800" // Default/N/A
      
      if (status === "verified" || status === "approved") {
        styles = "bg-green-100 text-green-700 hover:bg-green-100 border-transparent"
      } else if (status === "pending") {
        styles = "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-transparent"
      } else if (status === "rejected") {
        styles = "bg-red-100 text-red-700 hover:bg-red-100 border-transparent"
      }

      if (status === "N/A") return <span>N/A</span>

      return (
        <Badge className={`capitalize ${styles}`} variant="outline">
          {status}
        </Badge>
      )
    },
  }),

  columnHelper.accessor("action", {
    header: "",
    cell: ({ row }) => {
      const rowData = row.original
      const isActive = rowData.isActive

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
                console.log("View property:", rowData)
              }}
              className="cursor-pointer py-3 text-[15px]"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Property
            </DropdownMenuItem>
            
            {(isActive) && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    console.log("Upload KYC Details:", rowData)
                  }}
                  className="cursor-pointer py-3 text-[15px]"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload KYC Details
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
]