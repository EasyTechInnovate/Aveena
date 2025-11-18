import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EditPropertyOwnerComponent, { KYCVerification, PropertyDetailsAndBookings } from '../../components/admin/EditPropertyOwner'

const EditPropertyOwner = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const ownerName = 'Leslie Alexander' // This should come from API based on id

  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-6 bg-[#F8FAFC]'>
        {/* Breadcrumb - Outside the white card */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span 
              className="text-green cursor-pointer hover:underline"
              onClick={() => navigate('/dashboard/admin/property-owners')}
            >
              All Property
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">{ownerName}</span>
          </div>
        </div>
        
        <EditPropertyOwnerComponent ownerId={id} />
        <KYCVerification />
        <PropertyDetailsAndBookings />
      </div>
    </div>
  )
}

export default EditPropertyOwner

