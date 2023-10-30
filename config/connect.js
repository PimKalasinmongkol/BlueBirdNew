// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW5i3DpQK3H9j7VekSldeFFlxcMOGVMGU",
  authDomain: "bluebird-4a74c.firebaseapp.com",
  projectId: "bluebird-4a74c",
  storageBucket: "bluebird-4a74c.appspot.com",
  messagingSenderId: "104720392783",
  appId: "1:104720392783:web:d7ec52db888724e7d9403a",
  measurementId: "G-59S04EBX7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;