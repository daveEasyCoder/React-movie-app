import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar px-5 py-4 '>
        <div className='flex items-center justify-between text-white'>
            <div className='text-md font-bold'>
               <Link to={'/'}>My App</Link>
            </div>
            <div className='flex items-center gap-3'>
                <div>
                   <Link to={'/'}>Home</Link>
                </div>
                <div>
                   <Link to="/Favorites">Favorites</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar