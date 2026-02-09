import Sidebar from '../../components/admin/Sidebar'
import React, { useEffect, useState } from 'react'
import AnalyticsComponent from '../../components/admin/Analytics'

const Analytics = () => {
  const [bookingStatus, setBookingStatus] = useState({})
  const [customerWeekly, setCustomerWeekly] = useState([])
  const [propertyDistribution, setPropertyDistribution] = useState([])
  const [revenueWeekly, setRevenueWeekly] = useState([])

  useEffect(() => {
    const adminAnalytics = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/statistics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      const jsonResponse = await response.json()

      if (jsonResponse.success && jsonResponse.data) {
        setBookingStatus(jsonResponse.data.bookingStatus)
        setCustomerWeekly(jsonResponse.data.customerWeekly)
        setPropertyDistribution(jsonResponse.data.propertyDistribution)
        setRevenueWeekly(jsonResponse.data.revenueWeekly)
      }

      console.log("Admin Analytics Data:", jsonResponse)
    }

    adminAnalytics()
  }, [])

  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar />

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <AnalyticsComponent
          bookingStatus={bookingStatus}
          customerWeekly={customerWeekly}
          propertyDistribution={propertyDistribution}
          revenueWeekly={revenueWeekly}
        />
      </div>
    </div>
  )
}

export default Analytics
