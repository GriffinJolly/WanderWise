import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3  shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.png' width={70} height={70}/>
      <div>
        <Button>Sign In</Button>
      </div>
      
      </div>
    
  )
}

export default Header