import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";

const BookingTablePage = ({ properties, pagination, onPageChange }) => {
  const navigate = useNavigate();

  const formattedData = properties?.map((item) => ({
    id: item._id,
    propertyName: item.name,
    propertyType: item.type,
    minRentalIncome: "N/A", 
    salesTarget: "N/A",   
    status: item.isActive ? "Active" : "Inactive", 
    kycStatus: item.kycVerified,
  })) || [];

  const handleViewProperty = (rowData) => {
    navigate(
      `/dashboard/partner/view-property/${rowData.id || rowData.propertyName}`
    );
  };

  return (
    <div className="my-4">
      <div className="rounded-xl border-2 border-[#DFE0E480]">
        <DataTable
          data={formattedData}
          onViewProperty={handleViewProperty}
          pageCount={pagination?.totalPages}
          pageIndex={pagination?.page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default BookingTablePage;