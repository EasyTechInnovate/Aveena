import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import TeamManagementComponent from '../../components/admin/TeamManagement'

const TeamManagement = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <TeamManagementComponent/>
      </div>
    </div>
  )
}

export default TeamManagement

