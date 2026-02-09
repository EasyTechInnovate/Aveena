import React from "react"
import { DataTable } from "./data-table"

const BookingTablePage = ({recentBookings}) => {
  return (
    <div className="my-4">
      <div className="rounded-xl border-2 border-[#DFE0E480]">
        <DataTable data={recentBookings} />
      </div>
    </div>
  )
}

export default BookingTablePage
