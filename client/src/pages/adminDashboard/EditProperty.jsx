import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import ManagePropertySidebar from '../../components/admin/ManagePropertySidebar'
import PropertyOwnerInformation from '../../components/admin/PropertyOwnerInformation'
import PropertyPhotos from '../../components/admin/PropertyPhotos'
import PropertyAmenities from '../../components/admin/PropertyAmenities'
import PropertyPrice from '../../components/admin/PropertyPrice'
import PropertyFAQs from '../../components/admin/PropertyFAQs'

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json',
})

const EditProperty = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeSection, setActiveSection] = useState(searchParams.get('section') || 'owner-info')
  const [propertyData, setPropertyData] = useState(null)
  const [ownerData, setOwnerData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch property via admin API (returns ownerId), then fetch owner using ownerId
  useEffect(() => {
    const fetchPropertyAndOwner = async () => {
      if (!id) return
      setLoading(true)
      try {
        // GET /admin/properties/:id - returns property with ownerId
        const propertyRes = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/properties/${id}`,
          { headers: authHeaders() }
        )
        const propertyJson = await propertyRes.json()

        if (!propertyJson.success || !propertyJson.data) {
          setLoading(false)
          return
        }

        const property = propertyJson.data.property || propertyJson.data
        setPropertyData({ ...property, details: propertyJson.data.details })

        // Property API returns ownerId - use it to fetch owner info
        const ownerId = property.ownerId?._id ?? property.ownerId
        if (ownerId) {
          const ownerRes = await fetch(
            `${import.meta.env.VITE_API_URL}/admin/property-owners/${ownerId}`,
            { headers: authHeaders() }
          )
          const ownerJson = await ownerRes.json()
          if (ownerJson.success && ownerJson.data) {
            setOwnerData(ownerJson.data)
          }
        }
      } catch (error) {
        console.error('Error fetching property/owner:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPropertyAndOwner()
  }, [id])

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
            ownerId={ownerData?._id ?? propertyData?.ownerId?._id ?? propertyData?.ownerId}
            ownerData={ownerData}
            propertyData={propertyData}
            loading={loading}
            onCancel={handleCancel}
            onContinue={handleContinue}
          />
        )
      case 'photos':
        return (
          <PropertyPhotos
            propertyId={id}
            propertyData={propertyData}
            loading={loading}
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
            propertyData={propertyData}
            loading={loading}
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
            ownerId={ownerData?._id ?? propertyData?.ownerId?._id ?? propertyData?.ownerId}
            ownerData={ownerData}
            propertyData={propertyData}
            loading={loading}
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
        <div className="shrink-0">
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

