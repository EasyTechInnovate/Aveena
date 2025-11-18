import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import OfferComponent from '../../components/admin/Offer'

const Offer = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <OfferComponent/>
      </div>
    </div>
  )
}

export default Offer

