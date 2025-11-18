import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import AllCustomersComponent from '../../components/admin/AllCustomers'

const AllCustomers = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <AllCustomersComponent/>
      </div>
    </div>
  )
}

export default AllCustomers

