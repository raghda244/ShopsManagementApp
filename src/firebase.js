// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv5s9W3UAuOv2a8jp_HTnp6nyi8E2qT6w",
  authDomain: "shops-app-4dcee.firebaseapp.com",
  projectId: "shops-app-4dcee",
  storageBucket: "shops-app-4dcee.appspot.com",
  messagingSenderId: "76332051380",
  appId: "1:76332051380:web:a775213395bcae2af1e0e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export  const fireStore = getFirestore(app);  