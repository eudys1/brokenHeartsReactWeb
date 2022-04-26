// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlF6va5glY-6SHa9JJwxlSK1ofm9ywJJY",
  authDomain: "broken-hearts-7f3ce.firebaseapp.com",
  projectId: "broken-hearts-7f3ce",
  storageBucket: "broken-hearts-7f3ce.appspot.com",
  messagingSenderId: "18006640181",
  appId: "1:18006640181:web:8b5a24f43953ecc3c7137c"
};

// Initialize Firebase
const firebaseInit = initializeApp(firebaseConfig);
const storage = getStorage(firebaseInit);

export {firebaseInit, storage};
// export default storage;