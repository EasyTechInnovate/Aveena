import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import DashboardComponent from '../../components/admin/Dashboard'

const Dashboard = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <DashboardComponent/>
      </div>
    </div>
  )
}

export default Dashboard