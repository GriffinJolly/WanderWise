import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3  shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.png' width={70} height={70}/>
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search destinations in India..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
            style={{ backgroundColor: 'rgb(17, 24, 39)' }}
          />
          {/* Simple Search SVG Icon */}
          <svg 
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
      </div>
      <div>
        <Button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">Sign In</Button>
      </div>
      
    </div>
    
    
  )
}

export default Header