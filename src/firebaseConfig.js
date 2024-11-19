// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJrw6GV6LYMZWjX6d-Vkc-sMNktVMKbRA",
  authDomain: "vue-retail-aa21c.firebaseapp.com",
  projectId: "vue-retail-aa21c",
  storageBucket: "vue-retail-aa21c.firebasestorage.app",
  messagingSenderId: "1064652672915",
  appId: "1:1064652672915:web:e14fd5ba2dd729d1b96266",
  measurementId: "G-012Y0F5D75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {db};