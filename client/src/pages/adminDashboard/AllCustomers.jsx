import Sidebar from '../../components/admin/Sidebar'
import React, { useEffect, useState } from 'react'
import AllCustomersComponent from '../../components/admin/AllCustomers'

const AllCustomers = () => {
  // const [customers, setCustomers] = useState([])
  // const [pagination, setPagination] = useState({})

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/admin/customers?page=1&limit=10`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       }
  //     )
  //     const jsonResponse = await response.json()

  //     if (jsonResponse.success && jsonResponse.data) {
  //       setCustomers(jsonResponse.data.customers)
  //       setPagination(jsonResponse.data.pagination)
  //     }

  //     console.log("Admin Customers Data:", jsonResponse)
  //   }

  //   fetchCustomers()
  // }, [])

  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar />

      <div className='w-full p-4 bg-[#F8FAFC]'>
        <AllCustomersComponent />
      </div>
    </div>
  )
}

export default AllCustomers
