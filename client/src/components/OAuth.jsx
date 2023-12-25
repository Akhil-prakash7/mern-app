import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const oAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async()=>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider)
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signinSuccess(data))
            navigate('/')
            
        } catch (error) {
            console.log('could not continue with google',error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className=' bg-lime-300 py-3 rounded-lg hover:opacity-80'>SIGN IN WITH GOOGLE</button>
  )
}

export default oAuth