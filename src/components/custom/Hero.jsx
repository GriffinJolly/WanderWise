import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Search } from 'lucide-react'

function Hero() {
  const [destination, setDestination] = useState('')

  return (
    // Changed background gradient to use the new light colors
    <div className="flex w-screen min-h-screen bg-gradient-to-br from-[#E4E0E1] to-[#D6C0B3]">
      {/* Left side content */}
      <div className='w-full md:w-2/3 flex flex-col justify-center px-4 md:px-28 space-y-8'>
        <div className="space-y-4 px-4">
          <h1 className='text-4xl md:text-5xl font-bold text-[#493628] leading-tight'>
            <span className='text-[#AB886D]'>Discover</span> Your 
            <br />Next Indian Adventure
          </h1>
          <p className='text-lg md:text-xl text-[#493628]/80'>
            Explore hidden gems, cultural wonders, and breathtaking landscapes across India
          </p>
        </div>

        <div className="flex items-center space-x-4 px-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Place, India"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-[#AB886D] 
                         bg-white text-[#493628] placeholder-[#AB886D]/60 
                         rounded-xl focus:border-[#493628] focus:ring-[#493628]
                         transition duration-300 ease-in-out"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#AB886D]" />
          </div>
          
          <Link to="/create-trip" className="transform transition duration-300 hover:scale-105">
            <button
              className="flex items-center space-x-2 px-6 py-3 
                         bg-[#493628] text-[#E4E0E1] rounded-xl 
                         hover:bg-[#AB886D] focus:outline-none 
                         focus:ring-2 focus:ring-[#AB886D] 
                         shadow-lg hover:shadow-xl 
                         transition duration-300 ease-in-out"
            >
              <MapPin size={20} />
              <span>Plan Your Trip</span>
            </button>
          </Link>
        </div>

        {/* Quick travel stats */}
        <div className="flex space-x-8 text-[#493628] px-4">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-[#AB886D]">500+</span>
            <span>Destinations</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-[#AB886D]">1L+</span>
            <span>Hotels</span>
          </div>
        </div>
      </div>

      {/* Right side map preview */}
      <div className="hidden md:flex w-1/3 items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden 
                        transform transition duration-500 hover:scale-105 
                        flex flex-col items-center">
          <img 
            src="/map.jpg" 
            alt="India Travel Map" 
            className="w-full h-[500px] object-cover"
          />
          <div className="p-4 bg-[#E4E0E1] text-center w-full">
            <h3 className="text-xl font-semibold text-[#493628]">
              Explore India's Diversity
            </h3>
            <p className="text-sm text-[#493628]/80">
              From Himalayan peaks to tropical beaches
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero