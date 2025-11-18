import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import AnalyticsComponent from '../../components/admin/Analytics'

const Analytics = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <AnalyticsComponent/>
      </div>
    </div>
  )
}

export default Analytics

