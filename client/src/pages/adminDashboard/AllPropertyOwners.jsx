import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import AllPropertyOwnersComponent from '../../components/admin/AllPropertyOwners'

const AllPropertyOwners = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <AllPropertyOwnersComponent/>
      </div>
    </div>
  )
}

export default AllPropertyOwners

