import React from "react"
import { DataTable } from "./data-table"

const data = [
  {
    id: 1,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Pending",
    kycStatus: "N/A",
  },
  {
    id: 2,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Approved",
    kycStatus: "Pending",
  },
  {
    id: 3,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Rejected",
    kycStatus: "N/A",
  },
  {
    id: 4,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Approved",
    kycStatus: "Pending",
    action:''
  },
]

const BookingTablePage = () => {
  return (
    <div className="my-4">
      <div className="rounded-xl border-2 border-[#DFE0E480]">
        <DataTable data={data} />
      </div>
    </div>
  )
}

export default BookingTablePage
