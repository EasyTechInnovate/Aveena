import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import SettingsComponent from '../../components/admin/Settings'

const Settings = () => {
  return (
    <div className='w-full flex mt-20 justify-between relative'>
      <Sidebar/>
      <div className='w-full p-4 bg-[#F8FAFC]'>
        <SettingsComponent />
      </div>
    </div>
  )
}

export default Settings

