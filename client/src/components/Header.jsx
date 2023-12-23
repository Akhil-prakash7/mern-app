import React from 'react'
import { Link } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
const Header = () => {
  return (
    <>
    <div className='text-sm sm:text-2xl bg-slate-200 shadow-md py-4 flex flex-wrap justify-between items-center'>
        <div className='px-2'>
            <Link to='/'>
                <span className='font-bold text-blue-600'>Dream</span>
                <span className='font-bold text-green-700'>Dwell</span>
            </Link>
       
        </div>
        <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
            <input type="text" placeholder='Search'  className='bg-transparent focus:outline-none w-24 sm:w-64 '/>
            <FaSearch className='text-slate-500' />
        </form>
        
        <div className='flex gap-4 px-3 text-base font-bold text-slate-700 '>
            <Link to='/'>
            <p className='hover:text-blue-500 hidden sm:inline'>Home</p>
            </Link>
            <Link to='/about'>
            <p className='hover:text-blue-500 hidden sm:inline'>About</p>
            </Link>
            <Link to='profile'>
            <p className='hover:text-blue-500 hidden sm:inline'>Profile</p>
            </Link>
            <Link to='sign-in'>
            <p className='hover:text-blue-500'>Signin</p>
            </Link>
            
            
        </div>
    </div>

    </>
    
  )
}

export default Header