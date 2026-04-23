// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Hf6xkklWPG2XqG-YckXe7kBAebFWevw",
  authDomain: "hunger-aaded.firebaseapp.com",
  projectId: "hunger-aaded",
  storageBucket: "hunger-aaded.firebasestorage.app",
  messagingSenderId: "1093433768153",
  appId: "1:1093433768153:web:11ec3aa8d2738e9af3e6c8",
  measurementId: "G-0NDR09CRJN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);