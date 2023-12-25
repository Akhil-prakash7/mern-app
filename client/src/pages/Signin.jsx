import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
   try {
    setLoading(true)
    const res = await fetch('/api/auth/signin',
    {
        method:'POST',
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success ==false){
        setError(data.message);
        setLoading(false);
        return;
    }
    setLoading(false)
    setError(null)
    navigate('/')
  
   } catch (error) {
    setLoading(false)
    setError(error.message)
   }
}

  console.log(formData)
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
          value={formData.password}
        />
        <button 
          disabled={loading}
          className='bg-green-300 p-3 rounded-lg hover:bg-green-800 hover:text-white font-semibold disabled:opacity-70'
        >{loading?'Loading...':'Sign In'}
          
        </button>
      </form>
      
      <div className='flex mt-5'>
        <p>Dont have an Account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700 ml-2'>SignUp</span>
        </Link>
        
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};

export default SignIn;
