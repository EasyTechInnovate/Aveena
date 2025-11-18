import React from 'react'

const Visa = () => {
  return (
    <div className="h-screen relative pt-20">
      <img src="/assets/visa-bg.png" alt="tour bg" className="h-screen" />

      <div className="bg-black/40 w-full flex pb-40 text-center h-full absolute top-0 left-0">
        <div className="max-w-7xl mx-auto mt-auto">
          <h1 className="text-5xl font-bold text-white mb-4">
            Hassle-Free Visa <br />
            Coming Soon
          </h1>
          <h5 className="text-white font-normal">
            We’re preparing to launch our dedicated Visa Service to make your international travel <br />smoother than ever. Whether it’s for tourism, business, or study, our expert team will guide <br />you through the process—step by step.
          </h5>
          <button className="py-2 px-16 text-md cursor-pointer bg-darkGreen text-white mt-8 rounded">Explore More</button>
        </div>
      </div>
    </div>
  )
}

export default Visa