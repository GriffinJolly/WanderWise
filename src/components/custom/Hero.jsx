import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex">
      {/* Left side content */}
      <div className='w-2/3 my-44 items-center mx-28'>
        <h1 className='font-extrabold text-[30px] text-left'>
          Where's your dream destination?<br></br>
        </h1>
        <div className="flex my-10 w-full rounded-lg overflow-hidden">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Place, India"
              color='white'
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            /> 
            <Link to = "/create-trip">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-16"
                          
            >
              Get Started
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right side box */}
      <div className="w-3/3 bg-gray-100 flex my-24  h-auto">
        <div className=" rounded-lg">
          <div className="map-container">
      
    </div>
          <img src="/map.jpg" alt="" />
            
          </div>
        <div my-24></div>
        </div>
        
      </div>

  )
}

export default Hero