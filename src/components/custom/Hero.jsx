import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';

function Hero() {
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handlePlanTrip = () => {
    if (destination.trim() === '') {
      alert("Please enter a location!"); // Prevent empty location
      return;
    }
    navigate('/create-trip', { state: { destination } });
  };

  return (
    <div className="flex w-screen min-h-screen bg-gradient-to-br from-[#E4E0E1] to-[#D6C0B3]">
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
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-[#AB886D] 
                         bg-white text-[#493628] placeholder-[#AB886D]/60 
                         rounded-xl focus:border-[#493628] focus:ring-[#493628]
                         transition duration-300 ease-in-out"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#AB886D]" />
          </div>
          
          <button 
            onClick={handlePlanTrip}
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
        </div>
      </div>
    </div>
  );
}

export default Hero;
