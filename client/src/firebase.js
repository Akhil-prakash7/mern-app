// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-e4a19.firebaseapp.com",
  projectId: "mern-real-e4a19",
  storageBucket: "mern-real-e4a19.appspot.com",
  messagingSenderId: "14805464714",
  appId: "1:14805464714:web:e305a942906750fe5edf73"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);