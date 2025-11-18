import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import HelpCenterComponent from '../../components/admin/HelpCenter'

const HelpCenter = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <HelpCenterComponent/>
      </div>
    </div>
  )
}

export default HelpCenter

