import React from 'react'

function Hero() {
  return (
    <div>
    <div className='flex items-center mx-28 gap-9'>
        <h1 className='font-extrabold text-[30px] text-left'>
            <span className='text-[#0A21C0]'>WanderWise:</span><br></br>Your Intelligent Guide to India</h1></div>
            <br>
            </br><div className="flex items-center mx-28 gap-9 relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-900">
          <iframe
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
          </div>
        </div>
        </div>
  )
}

export default Hero