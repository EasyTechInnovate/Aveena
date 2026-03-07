import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EditPropertyOwnerComponent, { KYCVerification, PropertyDetailsAndBookings } from '../../components/admin/EditPropertyOwner'

const EditPropertyOwner = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full p-6 bg-[#F8FAFC]'>
        {/* Breadcrumb */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span
              className="text-green cursor-pointer hover:underline"
              onClick={() => navigate('/dashboard/admin/property-owners')}
            >
              Property Owners
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Edit Owner</span>
          </div>
        </div>

        <EditPropertyOwnerComponent ownerId={id} />
        <KYCVerification ownerId={id} />
        <PropertyDetailsAndBookings ownerId={id} />
      </div>
    </div>
  )
}

export default EditPropertyOwner

