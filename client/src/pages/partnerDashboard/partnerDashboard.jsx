import RecentBooking from '../../components/partnerDashboard/RecentBooking/RecentBooking'
import Overview from '../../components/partnerDashboard/dashboard/Overview'
import Sidebar from '../../components/partnerDashboard/Sidebar'
import React from 'react'
import RecentAddedProperty from '../../components/partnerDashboard/RecentAddedProperty/RecentAddedProperty'

const partnerDashboard = () => {
  return (
    <div className='w-full flex justify-between relative'>
<Sidebar/>

<div className='ml-[280px] mt-[80px] max-w-7xl w-full p-4 bg-[#F8FAFC] min-h-[calc(100vh-80px)]'>
  <Overview/>
  <RecentBooking/>
  <RecentAddedProperty/>
 
</div>

    </div>
  )
}

export default partnerDashboard