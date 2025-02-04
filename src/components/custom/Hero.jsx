import React from 'react'

function Hero() {
  return (
    <div>
    <div className='flex items-center mx-28 gap-9'>
        <h1 className='font-extrabold text-[30px] text-left'>
            <span className='text-[#0A21C0]'>WanderWise:</span><br></br>Your Intelligent Guide to India</h1></div>
            <br>
            </br>
            <h1 className="text-3xl font-bold">Where's your dream destination?</h1>
            <div className="flex items-center mx-28 relative aspect-[16/9] w-full rounded-lg overflow-hidden">
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15009832.813464182!2d78.4185!3d20.5937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1635835145745!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 p-2">+</div>
            <div className="absolute right-0 top-0 p-2">+</div>
            <div className="absolute left-0 bottom-0 p-2">+</div>
            <div className="absolute right-0 bottom-0 p-2">+</div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-400">
            SCROLL TO EXPLORE
          </div> */}
          
          <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Place,India"
            color='white'
            // value={destination}
            // onChange={(e) => setDestination(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <button
            // onClick={handleGetStarted}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Started
          </button>
        </div>
        </div>
        </div>
  )
}

export default Hero