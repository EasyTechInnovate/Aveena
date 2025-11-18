import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import AllBookingsComponent from '../../components/admin/AllBookings'

const AllBookings = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <AllBookingsComponent/>
      </div>
    </div>
  )
}

export default AllBookings




