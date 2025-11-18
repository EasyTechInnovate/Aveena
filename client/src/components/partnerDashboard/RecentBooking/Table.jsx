import React from "react"
import { DataTable } from "./data-table"

const data = [
  {
    id: 123,
    customername: "Kathryn Murphy",
    Checkindate: "Wed 3 Sep 2025",
    Checkoutdate: "Thu 4 Sep 2025",
    rooms: 2,
    guests: 2,
    paymentStatus: "Advance Paid",
  },
  {
    id: 124,
    customername: "Kathryn Murphy",
    Checkindate: "Wed 3 Sep 2025",
    Checkoutdate: "Thu 4 Sep 2025",
    rooms: 2,
    guests: 2,
    paymentStatus: "Pending",
  },
  {
    id: 125,
    customername: "Kathryn Murphy",
    Checkindate: "Wed 3 Sep 2025",
    Checkoutdate: "Thu 4 Sep 2025",
    rooms: 2,
    guests: 2,
    paymentStatus: "Advance Paid",
    action:":"
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
