import React from "react"
import { DataTable } from "./data-table"

const BookingTablePage = ({recentProperties}) => {
  return (
    <div className="my-4">
      <div className="rounded-xl border-2 border-[#DFE0E480]">
        <DataTable data={recentProperties} />
      </div>
    </div>
  )
}

export default BookingTablePage
