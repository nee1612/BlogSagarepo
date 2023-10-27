import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyDNeoQFETmNRb2c7Xv1y0i01i2KYfJXVi4",
//   authDomain: "blog-c36b3.firebaseapp.com",
//   projectId: "blog-c36b3",
//   storageBucket: "blog-c36b3.appspot.com",
//   messagingSenderId: "693657615219",
//   appId: "1:693657615219:web:489befe513b0aae992a306",
//   measurementId: "G-TF6BW414D5"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyDXVFyV9fDH9NqpIUG_3I4dvTMHXQzSB8M",
//   authDomain: "final-abede.firebaseapp.com",
//   projectId: "final-abede",
//   storageBucket: "final-abede.appspot.com",
//   messagingSenderId: "203896002776",
//   appId: "1:203896002776:web:ff1eb0580339e3417cdfad"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDZIdMlzJvfkcUGydEjYmZ_2B-6_ukJGcg",
//   authDomain: "blog2-31fc8.firebaseapp.com",
//   projectId: "blog2-31fc8",
//   storageBucket: "blog2-31fc8.appspot.com",
//   messagingSenderId: "556994651400",
//   appId: "1:556994651400:web:07f455c39ad0012c90b8bd",
//   measurementId: "G-GW8XHWSY42",
// };
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_CONFIG_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`
};

const Register = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const blogData = getFirestore();
export const userData = getFirestore(Register);
export const db = getFirestore();

export const getCurrentUser = () => {
  const currentUser = auth.currentUser;
  return currentUser;
};
