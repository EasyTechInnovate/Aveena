import React from 'react'

const CtaJoin = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between relative items-end max-w-7xl mx-auto my-16 rounded-3xl'>
<div className="flex-1 h-full text-white px-14 pt-16 pb-2 relative z-1 w-full">
    <h1 className='text-3xl font-bold'>
        Be a Avenaa franchisee
    </h1>
    <p className='pt-2 font-normal leading-tight mb-2'>
        We increase occupancy, lower your marketing costs, and help <br /> provide fabulous stays to your guests.
    </p>
    <button className='py-2 px-4 bg-white text-cyprus my-4 rounded-md cursor-pointer font-semibold'>
        Join Our Family
    </button>
</div>
<div className="flex-1 relative z-1">
<img src="/assets/avenaa-office.png" alt="avenaa-office" className='relative w-full h-full md:object-cover bottom-0'/>
</div>


<div className="w-full bg-cyprus h-full md:h-50 absolute rounded-3xl z-0">
</div>

    </div>
  )
}

export default CtaJoin  