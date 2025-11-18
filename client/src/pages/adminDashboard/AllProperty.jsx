import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import AllPropertyComponent from '../../components/admin/AllProperty'

const AllProperty = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <AllPropertyComponent/>
      </div>
    </div>
  )
}

export default AllProperty

