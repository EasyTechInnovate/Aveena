import React from 'react'
import Table from './Table'

const RecentAddedProperty = () => {
  return (
      <div className='border-2 border-[#DFE0E480] bg-white p-4 rounded-2xl my-6'>
    
    <div className="flex justify-between items-center">
        <h1 className='font-semibold text-xl'>Recent Added Property</h1>
        <button className='bg-green px-6 py-2 rounded-lg text-white'>
            View All
        </button>
    </div>
    
    <Table/>
    
        </div>
  )
}

export default RecentAddedProperty