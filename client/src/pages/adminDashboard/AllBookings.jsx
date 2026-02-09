import Sidebar from '../../components/admin/Sidebar'
import React, { useEffect, useState } from 'react'
import AllBookingsComponent from '../../components/admin/AllBookings'

const AllBookings = () => {
  // const [bookings, setBookings] = useState([])
  // const [pagination, setPagination] = useState({})

  // useEffect(() => {
  //   const adminAllBookings = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/admin/bookings?page=1&limit=10`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       }
  //     )
  //     const jsonResponse = await response.json()

  //     if (jsonResponse.success && jsonResponse.data) {
  //       setBookings(jsonResponse.data.bookings)
  //       setPagination(jsonResponse.data.pagination)
  //     }

  //     console.log("Admin Bookings Data:", jsonResponse)
  //   }

  //   adminAllBookings()
  // }, [])

  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar />

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <AllBookingsComponent />
      </div>
    </div>
  )
}

export default AllBookings
