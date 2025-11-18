import React from "react"
import { useNavigate } from "react-router-dom"
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
  },
  {
    id: 5,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Rejected",
    kycStatus: "N/A",
  },
  {
    id: 6,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Approved",
    kycStatus: "Pending",
  },
  {
    id: 7,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Rejected",
    kycStatus: "N/A",
  },
  {
    id: 8,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Approved",
    kycStatus: "Pending",
  },
  {
    id: 9,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Rejected",
    kycStatus: "N/A",
  },
  {
    id: 10,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Approved",
    kycStatus: "Pending",
  },
  {
    id: 11,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Rejected",
    kycStatus: "N/A",
  },
  {
    id: 12,
    propertyName: "UDS Villa - Next to VFS, Walking to Connaught Place",
    propertyType: "Villa",
    minRentalIncome: "₹50,000",
    salesTarget: "₹19,824",
    status: "Approved",
    kycStatus: "Pending",
  },
]

const BookingTablePage = () => {
  const navigate = useNavigate();

  const handleViewProperty = (rowData) => {
    navigate(`/dashboard/partner/view-property/${rowData.id || rowData.propertyName}`);
  };

  return (
    <div className="my-4">
      <div className="rounded-xl border-2 border-[#DFE0E480]">
        <DataTable data={data} onViewProperty={handleViewProperty} />
      </div>
    </div>
  )
}

export default BookingTablePage
