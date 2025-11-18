import Sidebar from '../../components/admin/Sidebar'
import React from 'react'
import ProfileComponent from '../../components/admin/Profile'

const Profile = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>

      <div className='w-full bg-[#F8FAFC]'>
        <ProfileComponent/>
      </div>
    </div>
  )
}

export default Profile

