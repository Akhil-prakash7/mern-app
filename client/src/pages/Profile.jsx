import React,{useEffect, useRef, useState} from 'react'
import {getStorage, ref, uploadBytesResumable,getDownloadURL, uploadBytes } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { app } from '../firebase'


const Profile = () => {
    const [fileUploadError, setFileUploadError] = useState(false);
    const [filePerc, setFilePerc] = useState(0);
    const [formData, setFormData] = useState({});
    const {currentUser} = useSelector(state=>state.user)
    const imgRef = useRef(null)
    const [file,setFile] = useState(undefined)
    console.log(file)
    useEffect(()=>{
        handleFileUpload(file)
    },[file]);
    const handleFileUpload = (file) => {
        if (!file || !(file instanceof File) || !file.name) {
            console.error('Invalid file:', file);
            // Handle the error or return accordingly
            return;
        }
    
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                console.error('Error during file upload:', error);
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            avatar: downloadURL,
                        }));
                    })
                    .catch((downloadURLError) => {
                        console.error('Error getting download URL:', downloadURLError);
                        setFileUploadError(true);
                    });
            }
        );
    };
    
      
  return (
    <div className='max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input onChange={(e)=>setFile(e.target.files[0])} type="file"  ref={imgRef} hidden accept='image/*'/>
            <img onClick={()=>imgRef.current.click()} className='rounded-full object-cover h-24 w-24 self-center' src={formData.avatar || currentUser.avatar} alt="" />
            <p className='text-sm self-center'>
                {fileUploadError ?
                (<span className='text-red-500'>Error image Upload</span>) :
                filePerc >0 && filePerc<100 ? (
                    <span className='text-slate-700'>{`uploading.. ${filePerc} %`}</span>) 
                    :filePerc===100 ? (
                        <span className='text-green-700'>Succesfully uploaded</span>
                    ):(
                        ""
                    )
                
                }
            </p>
            <input type="text" placeholder='username'className='p-3 rounded-lg'id='username'/>
            <input type="email" placeholder='email'className='p-3 rounded-lg'id='email'/>
            <input type="password" placeholder='password'className='p-3 rounded-lg'id='password'/>
            <button className='bg-green-300 rounded-lg p-3 hover:bg-green-700'>Update</button>
        </form>
        <div className='flex justify-between mt-5'>
            <span className='text-red-700 font-semibold'>Delete Account</span>
            <span className='text-red-700 font-semibold'>Logout</span>
        </div>
    </div>
  )
}

export default Profile