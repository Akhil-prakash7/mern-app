import React,{useEffect, useRef, useState} from 'react'
import {getStorage, ref, uploadBytesResumable,getDownloadURL, uploadBytes } from 'firebase/storage'
import { useSelector,useDispatch } from 'react-redux'
import { app } from '../firebase'
import { signOutUserSuccess,signOutUserFailure,signOutUserStart,updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice'


const Profile = () => {
    const [fileUploadError, setFileUploadError] = useState(false);
    const [filePerc, setFilePerc] = useState(0);
    const [formData, setFormData] = useState({});
    const {currentUser,loading,error} = useSelector(state=>state.user)
    const imgRef = useRef(null)
    const [file,setFile] = useState(undefined)
    const dispatch = useDispatch()
    console.log(file)
    console.log(formData);
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
    const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
    
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
    
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
    
            
            dispatch(updateUserSuccess(data));
    
            // If the image URL has changed, update it in the UI
            if (formData.avatar !== currentUser.avatar) {
                imgRef.current.src = formData.avatar;
            }
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };
    const handleDeleteUser = async()=>{
        try {
           
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method:'DELETE',
            });
            const data = res.json();
            if(data.success === false){
                dispatch(deleteUserFailure(data.message))
            }
           
            dispatch(deleteUserSuccess(data))
            
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }
    const handleSignOut = async () => {
        try {
          dispatch(signOutUserStart());
          const res = await fetch('/api/auth/signout');
          const data = await res.json();
          if (data.success === false) {
            dispatch(signOutUserFailure(data.message));
            return;
          }
          dispatch(signOutUserSuccess());
        } catch (error) {
          dispatch(signOutUserFailure(error.message));
        }
      };
      
  return (
    <div className='max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input onChange={(e)=>setFile(e.target.files[0])} type="file"  ref={imgRef} hidden accept='image/*'/>
            <img onClick={()=>imgRef.current.click()} className='rounded-full object-cover h-24 w-24 self-center' src={formData?.avatar || currentUser?.avatar} alt="" />
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
            <input type="text" placeholder='username'className='p-3 rounded-lg'id='username'defaultValue={currentUser.username} onChange={handleChange}/>
            <input type="email" placeholder='email'className='p-3 rounded-lg'id='email' defaultValue={currentUser.email}onChange={handleChange}/>
            <input type="password" placeholder='password'className='p-3 rounded-lg'id='password'onChange={handleChange}/>
            <button disabled={loading} className='bg-green-300 rounded-lg p-3 hover:bg-green-700'>{loading?"Loading.." :'Update'}</button>
        </form>
        <div className='flex justify-between mt-5'>
            <span onClick={handleDeleteUser} className='text-red-700 font-semibold'>Delete Account</span>
            <span onClick={handleSignOut} className='text-red-700 font-semibold'>Logout</span>
        </div>
        <p className='text-sm text-red-700 mt-5'>{error ? error : ''}</p>
    </div>
  )
}

export default Profile