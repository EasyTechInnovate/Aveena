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

export const createColumns = (onViewProperty) => [
  columnHelper.accessor("propertyName", {
    header: "Property Name",
  }),

  columnHelper.accessor("propertyType", {
    header: "Property Type",
  }),

  columnHelper.accessor("minRentalIncome", {
    header: "Min. Rental Income",
  }),

  columnHelper.accessor("salesTarget", {
    header: "Sales Target",
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: info => {
      const value = info.getValue()
      let variant = "outline"

      if (value === "Approved") variant = "success"
      else if (value === "Pending") variant = "warning"
      else if (value === "Rejected") variant = "destructive"

      return <Badge variant={variant}>{value}</Badge>
    },
  }),

  columnHelper.accessor("kycStatus", {
    header: "KYC Status",
    cell: info => {
      const value = info.getValue()
      let variant = "outline"

      if (value === "Pending") variant = "warning"
      else if (value === "N/A") variant = "secondary"
      else if (value === "Verified") variant = "success"

      return <Badge variant={variant}>{value}</Badge>
    },
  }),

  columnHelper.accessor("action", {
    header: "",
    cell: ({ row }) => {
      const rowData = row.original
      const status = rowData.status

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
                if (onViewProperty) {
                  onViewProperty(rowData);
                }
              }}
              className="cursor-pointer py-3 text-[15px]"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Property
            </DropdownMenuItem>
            {status === "Approved" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    console.log("Upload KYC Details:", rowData)
                    // Navigate to KYC upload page or open modal
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
