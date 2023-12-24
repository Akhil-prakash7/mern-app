import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form className='flex flex-col gap-4'>
            <input type="text" placeholder='username' 
            className='border p-3 rounded-lg' id='username'/>
            <input type="email" placeholder='email' 
            className='border p-3 rounded-lg' id='email'/>
            <input type="password" placeholder='password' 
            className='border p-3 rounded-lg' id='password'/>
            <button  className='bg-green-300 p-3 rounded-lg hover:bg-green-800 hover:text-white font-semibold disabled:opacity-70' >Sign Up</button>
        </form>
        <div className='flex mt-5'>
            <p>Have an Account?</p>
            <Link to='/sign-in'>
            <span className='text-blue-700 ml-2'>SignIn</span>
            </Link>
        </div>
    </div>
  )
}

export default SignUp