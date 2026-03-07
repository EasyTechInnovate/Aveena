import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import PendingKYCVerificationComponent from '../../components/admin/PendingKYCVerification'

const PendingKYCVerification = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar />
      <div className='w-full p-4 bg-[#F8FAFC]'>
        <PendingKYCVerificationComponent />
      </div>
    </div>
  )
}

export default PendingKYCVerification
