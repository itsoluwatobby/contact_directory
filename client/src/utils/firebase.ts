import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "contact-directory-a7fe3.firebaseapp.com",
  projectId: "contact-directory-a7fe3",
  storageBucket: "contact-directory-a7fe3.appspot.com",
  messagingSenderId: "1034236228879",
  appId: "1:1034236228879:web:6c3ac0689aab78f8087a7a",
  measurementId: "G-NM5DY0X7E1"
};

export const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage();