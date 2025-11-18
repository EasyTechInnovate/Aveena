import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import TicketDetailComponent from '../../components/admin/TicketDetail'

const TicketDetail = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>
      <div className='w-full bg-[#F8FAFC] min-h-screen'>
        <TicketDetailComponent/>
      </div>
    </div>
  )
}

export default TicketDetail

