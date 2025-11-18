import React, { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import ManagePropertySidebar from '../../components/admin/ManagePropertySidebar'
import PropertyOwnerInformation from '../../components/admin/PropertyOwnerInformation'
import PropertyPhotos from '../../components/admin/PropertyPhotos'
import PropertyAmenities from '../../components/admin/PropertyAmenities'
import PropertyPrice from '../../components/admin/PropertyPrice'
import PropertyFAQs from '../../components/admin/PropertyFAQs'

const EditProperty = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeSection, setActiveSection] = useState(searchParams.get('section') || 'owner-info')

  const handleCancel = () => {
    navigate('/dashboard/admin/property')
  }

  const handleContinue = () => {
    setActiveSection('photos')
    setSearchParams({ section: 'photos' })
  }

  const handleSave = () => {
    // Navigate to amenities section after saving photos
    setActiveSection('amenities')
    setSearchParams({ section: 'amenities' })
  }

  const handleAmenitiesContinue = () => {
    setActiveSection('price')
    setSearchParams({ section: 'price' })
  }

  const handlePriceContinue = () => {
    setActiveSection('faqs')
    setSearchParams({ section: 'faqs' })
  }

  const handleFAQsContinue = () => {
    // TODO: Handle final submission or navigate to completion
    console.log('Complete property setup')
    navigate('/dashboard/admin/property')
  }

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
    setSearchParams({ section: sectionId })
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'owner-info':
        return (
          <PropertyOwnerInformation
            propertyId={id}
            onCancel={handleCancel}
            onContinue={handleContinue}
          />
        )
      case 'photos':
        return (
          <PropertyPhotos
            propertyId={id}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        )
      case 'amenities':
        return (
          <PropertyAmenities
            propertyId={id}
            onCancel={handleCancel}
            onContinue={handleAmenitiesContinue}
          />
        )
      case 'price':
        return (
          <PropertyPrice
            propertyId={id}
            onCancel={handleCancel}
            onContinue={handlePriceContinue}
          />
        )
      case 'faqs':
        return (
          <PropertyFAQs
            propertyId={id}
            onCancel={handleCancel}
            onContinue={handleFAQsContinue}
          />
        )
      default:
        return (
          <PropertyOwnerInformation
            propertyId={id}
            onCancel={handleCancel}
            onContinue={handleContinue}
          />
        )
    }
  }

  return (
    <div className="w-full flex mt-20 justify-between relative">
      <Sidebar />

      <div className="flex w-full bg-[#F8FAFC] p-6 gap-6">
        {/* Manage Property Navigation - Left side of content area */}
        <div className="flex-shrink-0">
          <ManagePropertySidebar 
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>

        {/* Content Area - Right side */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default EditProperty

